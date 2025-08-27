import admin from "firebase-admin";
import { readFileSync } from "fs";
import Token from "./models/Token.js";

// Parse the JSON string from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Send to ALL users (via topic)
export async function sendToAll(title, body) {
  await admin.messaging().send({
    topic: "all-users",
    notification: { title, body },
    data: {type: 'ALLUSER'}
  });
}

// Send to ONE user (via token)
export async function sendToUser(userId, title, body, data) {
  const user = await Token.findOne({ userId });
  
  if (user) {
    await admin.messaging().send({
      token: user.token,
      notification: { title, body },
      data: data || {}
    });
    return true
  } else {
    return false
  }
}

// ✅ Subscribe a user’s token to "all-users" topic
export async function subscribeToAll(token) {
  return admin.messaging().subscribeToTopic(token, "all-users");
}

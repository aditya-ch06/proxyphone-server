// routes/notification.js
import express from "express";
import Token from "../models/Token.js";
import Notification from "../models/Notification.js";
import { sendToAll, sendToUser, subscribeToAll  } from "../firebase.js";

const router = express.Router();

/**
 * @route POST /api/notifications/send-to-all
 * @desc Send a push notification to ALL users (topic: "all-users")
 * @body { title: string, body: string }
 */
router.post("/send-to-all", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }

  try {
    const response = await sendToAll(title, body);
    res.json({ success: true, response });
  } catch (err) {
    console.error("Error sending to all:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route POST /api/notifications/send-to-user
 * @desc Send a push notification to ONE user by userId
 * @body { userId: string, title: string, body: string }
 */
router.post("/send-to-user", async (req, res) => {
  const { userId, title, body, data } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).json({ error: "userId, title, and body are required" });
  }

  try {
    // Save to DB
    const notif = new Notification({ userId, title, body, data });
    await notif.save();

    const response = await sendToUser(userId, title, body, data);
    if (!response) {
        return res.status(404).json({ error: "User not found or no token" });
    }
    // console.log('response', response)
    res.json({ success: true, response });
  } catch (err) {
    console.error("Error sending to user:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route POST /api/notifications/register-token
 * @desc Save user token to DB and subscribe it to "all-users" topic
 * @body { userId: string, token: string }
 */
router.post("/register-token", async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ error: "userId and token are required" });
  }

  try {
    // await Token.deleteOne({ token });
    // 1. Save or update token in DB
    await Token.findOneAndUpdate(
      { userId },
      { token },
      { upsert: true, new: true }
    );

    // 2. Subscribe token to all-users topic
    const response = await subscribeToAll(token);

    res.json({
      success: true,
      message: "Token saved & subscribed to all-users topic",
      response,
    });
  } catch (err) {
    console.error("Register token error:", err);
    res.status(500).json({ error: err.message });
  }
});

// routes/notification.js
router.get("/list", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// routes/notification.js
router.get("/list/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// router.post("/mark-as-read/:id", async (req, res) => {
//   try {
//     await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to mark as read" });
//   }
// });

// ✅ Get unread notifications
router.get("/unread/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId, isRead: false }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unread notifications" });
  }
});

// ✅ Mark notification as read
router.patch("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

// ✅ Mark all as read for a user
router.patch("/mark-all-read/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark all notifications as read" });
  }
});

router.post("/delete-fcm-token", async (req, res) => {
  try {
    const { userId, token } = req.body;
    if (!userId || !token) {
      return res.status(400).json({ error: "userId and token required" });
    }

    await Token.deleteOne({ userId, token });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting token:", err);
    res.status(500).json({ error: "Server error" });
  }
});



export default router;

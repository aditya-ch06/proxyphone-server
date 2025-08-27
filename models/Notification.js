// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // who received it
  title: { type: String, required: true },
  body: { type: String, required: true },
  data: { type: Object },                    // optional extra data (e.g., links)
  isRead: { type: Boolean, default: false }, // for in-app notifications
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);

// models/Token.js
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  token: { type: String, required: true },
});

export default mongoose.model("Token", tokenSchema);

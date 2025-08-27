// models/Subscription.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, unique: true },
  keys: {
    p256dh: String,
    auth: String,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

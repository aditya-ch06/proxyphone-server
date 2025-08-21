// server/index.js

import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
// import webpush from 'web-push';
import authRoutes from './routes/auth.js';
import seriesRoutes from './routes/series.js';
import productsRoutes from './routes/products.js';
import profilRoutes from './routes/profil.js';
import promoRoutes from './routes/promos.js';
import productDetailRoutes from './routes/productDetail.js'
import transactionsRoutes from './routes/transactions.js'
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("👉 Incoming request:", req.method, req.url);
  next();
});

app.use('/api', authRoutes);
app.use('/api', seriesRoutes);
app.use('/api', productsRoutes);
app.use('/api', productDetailRoutes);
app.use('/api', profilRoutes);
app.use('/api', promoRoutes);
app.use('/api', transactionsRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is working");
});

// let subscriptions = [];

// const vapidKeys = {
//   publicKey: 'BLfOtWKp1V5_WKRNj58WYwP1RcGeFRpXV8gNv77b5jmPLz8IXHezrrPcm_4gtHixfGdifQauC_s-cO9Z3xEMMxI',
//   privateKey: 'u1dgPORBT74bFkUqsK7ymsrJ8LPJg0kPPpqK1Uoif-s',
// };

// webpush.setVapidDetails('mailto:knightxenith@gmail.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

// app.post('/api/subscribe', (req, res) => {
//   const subscription = req.body;
//   subscriptions.push(subscription);
//   res.status(201).json({ message: 'Subscribed successfully.' });
// });

// old
// app.post('/api/notify', async (req, res) => {
//   const payload = req.body;
//   const notifyAll = subscriptions.map(sub =>
//     webpush.sendNotification(sub, JSON.stringify(payload)).catch(err => {
//       console.error('Push failed:', err);
//     })
//   );
//   await Promise.all(notifyAll);
//   res.json({ message: 'Notifications sent.' });
// });

// app.post('/api/notify', async (req, res) => {
//   const payload = req.body;

//   try {
//     const results = await Promise.allSettled(
//       subscriptions.map(sub =>
//         webpush.sendNotification(sub, JSON.stringify(payload))
//       )
//     );

//     const failed = results.filter(r => r.status === "rejected");
//     if (failed.length) {
//       console.error("Some push notifications failed", failed);
//     }

//     res.json({ message: 'Notifications attempted.' });
//   } catch (err) {
//     console.error("Push error:", err);
//     res.status(500).json({ error: "Failed to send push notifications" });
//   }
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
export default app; // export app instead of app.listen()


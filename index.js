// server/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import webpush from 'web-push';
import authRoutes from './routes/auth.js';
import seriesRoutes from './routes/series.js';
import productsRoutes from './routes/products.js';
import profilRoutes from './routes/profil.js';
import promoRoutes from './routes/promos.js';
import productDetailRoutes from './routes/productDetail.js';
import transactionsRoutes from './routes/transactions.js';
import transDetailRoutes from './routes/transDetail.js';
import brandsRoutes from './routes/brands.js';
import historyPoinRoutes from './routes/historyPoin.js';
import notificationRoutes from './routes/notification.js'; 
import mongoose from 'mongoose';
// import Subscription from './models/Subscription.js';
// import Token from './models/Token.js'

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

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
app.use('/api', transDetailRoutes);
app.use('/api', brandsRoutes);
app.use('/api', historyPoinRoutes);
app.use('/api/notification', notificationRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is working");
});


// app.get('/front/subscriptions', async (req, res) => {
//   try {
//     const subscriptions = await Subscription.find().lean();

//     let html = `
//       <html>
//         <head>
//           <title>Subscriptions</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; }
//             pre { background: #f4f4f4; padding: 10px; border-radius: 6px; }
//           </style>
//         </head>
//         <body>
//           <h1>Push Subscriptions</h1>
//           ${
//             subscriptions.length === 0
//               ? '<p>No subscriptions found.</p>'
//               : subscriptions
//                   .map(
//                     (sub, i) =>
//                       `<h3>Subscription ${i + 1}</h3><pre>${JSON.stringify(
//                         sub,
//                         null,
//                         2
//                       )}</pre>`
//                   )
//                   .join('')
//           }
//         </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (error) {
//     console.error('Error fetching subscriptions:', error);
//     res.status(500).send('<p>Failed to fetch subscriptions</p>');
//   }
// });

export default app; // export app instead of app.listen()


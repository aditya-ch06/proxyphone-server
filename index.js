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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', seriesRoutes);
app.use('/api', productsRoutes);
app.use('/api', profilRoutes);
app.use('/api', promoRoutes)

let subscriptions = [];

const vapidKeys = {
  publicKey: 'BLfOtWKp1V5_WKRNj58WYwP1RcGeFRpXV8gNv77b5jmPLz8IXHezrrPcm_4gtHixfGdifQauC_s-cO9Z3xEMMxI',
  privateKey: 'u1dgPORBT74bFkUqsK7ymsrJ8LPJg0kPPpqK1Uoif-s',
};

webpush.setVapidDetails('mailto:knightxenith@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscribed successfully.' });
});

app.post('/api/notify', async (req, res) => {
  const payload = req.body;
  const notifyAll = subscriptions.map(sub =>
    webpush.sendNotification(sub, JSON.stringify(payload)).catch(err => {
      console.error('Push failed:', err);
    })
  );
  await Promise.all(notifyAll);
  res.json({ message: 'Notifications sent.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

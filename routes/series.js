// routes/series.js

import express from 'express';
import fetch from 'node-fetch'; 

const router = express.Router();
const LIVE_URL = 'https://proxy.penatechno.id/api/crm/series';

router.get('/series', async (req, res) => {  
  try {
    const response = await fetch(LIVE_URL, {
      method: 'GET',
    });

    const data = await response.json();
    // console.log('data', data);
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


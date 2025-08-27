// routes/products.js

import express from 'express';
import fetch from 'node-fetch'; 

const router = express.Router();
const LIVE_URL = 'https://proxy.penatechno.id/api/crm/products'; 

router.get('/products', async (req, res) => {  
  console.log('req.query', req.query)
  // Extract query parameters from request
  const { serieId } = req.query;
  let url = LIVE_URL
  if(serieId) {
    url = `${url}/${serieId}`
  }

  try {
    const response = await fetch(url, {
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


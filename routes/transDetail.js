// routes/transactions.js

import express from 'express';
import fetch from 'node-fetch'; 
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
const LIVE_URL = 'https://proxy.penatechno.id/api/crm/customer';

router.get('/transaction', authenticateToken, async (req, res) => {  
  console.log('req.query', req.query)
  // Extract query parameters from request
  const { userId, noTrans } = req.query;
  let url = LIVE_URL
  if(userId) {
    url = `${url}/transaction/${noTrans}`
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


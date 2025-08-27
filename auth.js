// routes/auth.js

import express from 'express';
import fetch from 'node-fetch'; 
import FormData from 'form-data';
import multer from 'multer';
import generateJWT from '../middleware/generateJWT.js';
// import jwt from 'jsonwebtoken';

const router = express.Router();
const upload = multer(); // No disk storage; in-memory parsing


const LIVE_AUTH_URL = 'https://proxy.penatechno.id/api/crm/login';

router.post('/login', upload.none(), async (req, res) => {
  console.log('req.body', req.body)
  // const { email, password } = req.body;
  const formData = new FormData();
    formData.append('userCode', req.body.userCode);
    formData.append('password', req.body.password);

  try {
    const response = await fetch(LIVE_AUTH_URL, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(), // set correct Content-Type (multipart/form-data)
    });

    const data = await response.json();
    console.log('data', data);
    if (!data.success) {
      return res.status(response.status).json({ message: data.message || 'Login failed' });
    }
    const result = { 
      success: data.success, 
      result: generateJWT(data)
    }
    res.json(result);
  } catch (error) {
    console.error('Login proxy error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


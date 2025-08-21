// server/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  console.log('token', token)
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('user', user)
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
}

export default authenticateToken;

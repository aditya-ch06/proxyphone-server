import jwt from 'jsonwebtoken';

function generateJWT(data) {
  
  const payload = {
    userId: data.user.Id,
    userCode: data.user.UserCode,
    userName: data.user.UserName,
  };

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token
}

export default generateJWT;

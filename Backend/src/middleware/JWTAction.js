import jwt from 'jsonwebtoken';

// Hàm tạo JWT
const createJWT = (payload) => {
  const key = process.env.JWT_SECRET;
  try {
    return jwt.sign({ payload }, key);
  } catch (error) {
    console.error('Error creating JWT:', error);
    throw error;
  }
};

// Hàm xác minh JWT
const verifyJWT = (token) => {
  const key = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, key);
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

const checkUserJWT = (req, res, next) => {

   
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      EC: -1,
      EM: 'Not authenticated the user',
    });
  }

  const decoded = verifyJWT(token);
  console.log(decoded)

  if (decoded) {
    next();
  } else {
    return res.status(401).json({
      EC: -1,
      EM: 'Not authenticated the user',
    });
  }
};

export { createJWT, verifyJWT, checkUserJWT };

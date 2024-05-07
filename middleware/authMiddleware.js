const jwt = require('jsonwebtoken');
const User = require('../models/User');


const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not provided' });
    }
    
    const decodedToken = jwt.verify(token, 'sabari');
    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const user = await User.findById(decodedToken.userId);
    console.log(user)
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

  module.exports = {verifyToken, isAdmin };
  
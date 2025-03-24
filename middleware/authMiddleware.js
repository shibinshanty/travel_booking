const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided!' });
  }

  const token = authHeader.split(' ')[1]; // Format: Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with env in production
    req.user = decoded; // Now req.user contains id and email
    next(); // Proceed to actual route
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token!' });
  }
};



const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is admin
  } else {
    res.status(403).json({ message: 'Access denied! Admins only.' });
  }
};


module.exports = {verifyToken,verifyAdmin}

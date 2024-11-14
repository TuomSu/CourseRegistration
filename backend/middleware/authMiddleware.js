const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Tokenia ei löytynyt' });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Virheellinen token' });
    req.adminId = decoded.id;
    next();
  });
};

module.exports = verifyAdmin;

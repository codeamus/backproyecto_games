const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../secretKey');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function validateLoginCredentials(req, res, next) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Se requiere email y password' });
  }

  next();
}

module.exports = {
  authenticateToken,
  validateLoginCredentials
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.validate = {
  password: (password) => password.match(/[\w\d\S]{6,}/),
  email: (email) => email.match(/^[^\s@]+@[^\s@]+\.([^\s@]{2,})$/),
  username: (username) => username.match(/\w{4,32}/),
};

module.exports.password = {
  encrypt: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  verify: async (password, hashedPassword) => bcrypt.compare(password, hashedPassword),
};

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json({
      message: 'Missing authorization header',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({
      message: 'No token provided',
    });
    return;
  }

  jwt.verify(token, process.env.TOKENSECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: 'Unauthorized',
      });
      return;
    }
    req.userId = decoded.Id;
    next();
  });
};

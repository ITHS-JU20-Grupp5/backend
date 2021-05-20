const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.validate = {
  password: (password) => password.match(/^[\w\d\S]{6,}$/),
  email: (email) => email.match(/^[^\s@]+@[^\s@]+\.([^\s@]{2,})$/),
  username: (username) => username.match(/^\w{4,32}$/),
};

module.exports.password = {
  encrypt: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  verify: async (password, hashedPassword) => bcrypt.compare(password, hashedPassword),
};

function verifyAuthHeader(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json({
      message: 'Missing authorization header',
    });
    return null;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({
      message: 'No token provided',
    });
    return null;
  }

  return jwt.verify(token, process.env.TOKENSECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: 'Unauthorized',
      });
      return null;
    }
    req.user = decoded;
    return req.user.Roles;
  });
}

module.exports.verifyUser = (req, res, next) => {
  const roles = verifyAuthHeader(req, res);
  if (!roles.includes('USER')) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }
  next();
};

module.exports.verifyAdmin = (req, res, next) => {
  const roles = verifyAuthHeader(req, res);
  if (!roles.includes('ADMIN')) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }
  next();
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * deprecated
 * Need to refactor this into database constraints
 */
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
    return [];
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({
      message: 'No token provided',
    });
    return [];
  }

  return jwt.verify(token, process.env.TOKENSECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: 'Unauthorized',
      });
      return [];
    }
    req.user = decoded;
    return req.user.roles;
  });
}

module.exports.verifyUser = (req, res, next) => {
  const roles = verifyAuthHeader(req, res);
  if (roles.length === 0) {
    return;
  }
  let authorized = false;
  roles.forEach((role) => {
    if (role.role === 'User') {
      authorized = true;
    }
  });
  if (!authorized) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }
  next();
};

module.exports.verifyAdmin = (req, res, next) => {
  const roles = verifyAuthHeader(req, res);
  if (roles.length === 0) {
    return;
  }
  let authorized = false;
  roles.forEach((role) => {
    if (role.role === 'Admin') {
      authorized = true;
    }
  });
  if (!authorized) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }
  next();
};

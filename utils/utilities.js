const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = require.main.require('./controllers/user.controller');

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
      res.sendStatus(401);
      return null;
    }
    return decoded;
  });
}

module.exports.verifyUser = (req, res, next) => {
  const { username } = verifyAuthHeader(req, res);

  if (!username) {
    res.sendStatus(401);
    return;
  }

  let authorized = false;

  UserController.findOne({ username })
    .then((user) => {
      user.roles.forEach((role) => {
        if (role.role === 'User') {
          authorized = true;
        }
      });
      if (!authorized) {
        res.sendStatus(401);
        return;
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
      }
    });
};

module.exports.verifyAdmin = (req, res, next) => {
  const { username } = verifyAuthHeader(req, res);

  if (!username) {
    res.sendStatus(401);
    return;
  }

  let authorized = false;

  UserController.findOne({ username })
    .then((user) => {
      user.roles.forEach((role) => {
        if (role.role === 'Admin') {
          authorized = true;
        }
      });
      if (!authorized) {
        res.sendStatus(401);
        return;
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
      }
    });
};

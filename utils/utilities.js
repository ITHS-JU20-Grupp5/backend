const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.validate = {
  password: (password) => {
    return password.match(/[\w\d\S]{6,}/);
  },
  email: (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.([^\s@]{2,})$/);
  },
  username: (username) => {
    return username.match(/\w{4,32}/);
  }
}

module.exports.password = {
  encrypt: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  verify: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports.verifyToken = (req, res, next) => {
  let authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({
      message: 'Missing authorization header'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.TOKENSECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    req.userId = decoded.Id;
    next();
  })
}

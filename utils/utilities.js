const bcrypt = require('bcrypt');

module.exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports.isNotAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
}

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

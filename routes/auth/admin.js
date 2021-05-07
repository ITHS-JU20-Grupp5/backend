const utils = require.main.require('./utils/utilities');

module.exports = function (app) {
  app.get('/test/admin', utils.isAuthenticated, (req, res) => {
    res.json({
      msg: `Welcome ${req.user.Username}`
    });
  });
}

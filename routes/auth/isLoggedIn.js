const {
  verifyToken
} = require.main.require('./utils/utilities');

module.exports = function (app) {
  app.get('/auth', verifyToken, (req, res) => {
    res.json({
      ok: true
    });
  });
}

const { verifyToken } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.get('/auth', verifyToken, (req, res) => {
    res.json({
      ok: true,
    });
  });
};

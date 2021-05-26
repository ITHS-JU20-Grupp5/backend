const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.get('/auth/admin', verifyAdmin, (req, res) => {
    res.json();
  });
};

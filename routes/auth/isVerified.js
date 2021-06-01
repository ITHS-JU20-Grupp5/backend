const { verifyUser } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.get('/auth/user', verifyUser, (req, res) => {
    res.sendStatus(200);
  });
};

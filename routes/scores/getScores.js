const { verifyUser } = require.main.require('./utils/utilities');
const ScoreController = require.main.require('./controllers/score.controller');

module.exports = (app) => {
  app.get('/scores', verifyUser, (req, res) => {
    ScoreController.findAll({ userId: req.user.id })
      .then((scores) => {
        if (!scores) {
          res.status(404).json({
            error: 'No scores found',
          });
          return;
        }
        res.json(scores);
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
      });
  });
};

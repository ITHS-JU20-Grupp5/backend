const { verifyUser } = require.main.require('./utils/utilities');
const ScoreController = require.main.require('./controllers/score.controller');

module.exports = (app) => {
  app.get('/highscore', verifyUser, (req, res) => {
    ScoreController.findAll({ userId: req.user.id })
      .then((scores) => {
        if (!scores) {
          res.status(404).json({
            error: 'No scores found',
          });
          return;
        }
        const sortedScores = scores.sort((a, b) => {
          if (a.score > b.score) return 1;
          if (a.score < b.score) return -1;
          return 0;
        });
        res.json({
          score: sortedScores[sortedScores.length - 1],
        });
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

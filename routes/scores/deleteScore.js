const ScoreController = require.main.require('./controllers/score.controller');
const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.delete('/scores/:id', verifyAdmin, (req, res) => {
    ScoreController.delete({ where: { id: req.params.id } })
      .then((id) => {
        res.json({ id });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.message,
        });
      });
  });
};

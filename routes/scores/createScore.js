const ScoreController = require.main.require('./controllers/score.controller');
const UserController = require.main.require('./controllers/user.controller');
const CategoryController = require.main.require('./controllers/category.controller');
const { verifyUser } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.post('/scores', verifyUser, (req, res) => {
    const { score, category } = req.body;
    ScoreController.create({ score }).then((newScore) => {
      CategoryController.findOne({
        category,
      }).then((foundCategory) => {
        CategoryController.addScore(foundCategory.id, newScore.id).then((categoryScore) => {
          if (!categoryScore) {
            res.status(400).json({
              error: 'Could not add score',
            });
            return;
          }
          UserController.addScore(req.user.id, newScore.id).then((userScore) => {
            if (!userScore) {
              res.status(400).json({
                error: 'Could not add score',
              });
              return;
            }
            res.status(201).json({
              newScore,
            });
          });
        });
      });
    });
  });
};

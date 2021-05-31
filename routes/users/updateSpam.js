const UserController = require.main.require('./controllers/user.controller');
// const { verifyUser } = require.main.require('./utils/utilities');
module.exports = (app) => {
  app.get('/user/emails', (req, res) => {
    UserController.updateSpam(req.query.email)
      .then(() => {
        res.redirect('https://generalknowledge-quiz.herokuapp.com/quiz');
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

const VerificationController = require.main.require('./controllers/verification.controller');
const UserController = require.main.require('./controllers/user.controller');
const RoleController = require.main.require('./controllers/role.controller');

module.exports = (app) => {
  app.get('/auth/verify/:UUID', (req, res) => {
    VerificationController.findOne(req.params.UUID)
      .then(async (verification) => {
        if (!verification) {
          res.status(400).json({
            error: 'Verification value not found',
          });
          return;
        }
        const user = await verification.getUser();
        // find user role
        RoleController.findOrCreate({ role: 'User' })
          .then(([role]) => {
            UserController.addRole(user.id, role.id)
              .then(async () => {
                await verification.destroy();
                res.redirect('https://generalknowledge-quiz.herokuapp.com/quiz');
              })
              .catch((err) => {
                if (err) {
                  res.status(400).json({
                    error: err.message,
                  });
                }
              }); // removes verification role from DB
          })
          .catch((err) => {
            if (err) {
              res.status(400).json({
                error: err.message,
              });
            }
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

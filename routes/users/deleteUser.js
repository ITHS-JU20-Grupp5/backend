const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.delete('/users/:id', (req, res) => {
    db.run('delete from users where Id = ?', req.params.id, function (err) {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      if (this.changes > 0) {
        db.run('delete from user_roles where UserId = ?', req.params.id, (juncErr) => {
          if (juncErr) {
            res.status(400).json({
              error: juncErr.message,
            });
            return;
          }
          res.json({
            id: req.params.id,
          });
        });
      } else {
        res.status(400).json({
          error: 'Invalid User ID',
        });
      }
    });
  });
};

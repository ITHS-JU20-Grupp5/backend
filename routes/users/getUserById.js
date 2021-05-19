const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.get('/users/:id', (req, res) => {
    db.get('select * from users where Id = ?', req.params.id, (err, row) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      res.json({
        user: {
          id: row.Id,
          username: row.Username,
          name: row.Name,
          email: row.Email,
        },
      });
    });
  });
};

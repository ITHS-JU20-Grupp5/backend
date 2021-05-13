const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.delete('/scores/:id', (req, res) => {
    db.run('delete from scores where Id = ?', req.params.id, (err) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      db.run('delete from user_scores where ScoreId = ?', req.params.id, (juncErr) => {
        if (juncErr) {
          res.json({
            ok: false,
            error: juncErr.message,
          });
          return;
        }
        res.json({
          ok: true,
        });
      });
    });
  });
};

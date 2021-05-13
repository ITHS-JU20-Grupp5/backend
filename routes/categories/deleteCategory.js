const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.delete('/categories/:id', (req, res) => {
    db.run('delete from categories where Id = ?', req.params.id, (err) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      db.run('delete from category_questions where CategoryId = ?', req.params.id, (juncErr) => {
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

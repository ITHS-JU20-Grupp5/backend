const db = require.main.require('./utils/database');
const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.delete('/categories/:id', verifyAdmin, (req, res) => {
    db.run('delete from categories where Id = ?', req.params.id, (err) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      db.run('delete from category_questions where CategoryId = ?', req.params.id, (juncErr) => {
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
    });
  });
};

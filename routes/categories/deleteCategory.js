const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.delete('/categories/:id', (req, res) => {
    db.run('delete from categories where Id = ?', req.params.id, function (err) {
      if (err) {
        res.status(400).json({
          eroor: err.message,
        });
        return;
      }
      res.json({
        ok: this.canges > 0,
      });
    });
  });
};

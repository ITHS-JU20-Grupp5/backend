const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.delete('/answers/:id', function (req, res) {
    db.run('delete from answers where Id = ?', req.params.id, function (err) {
      if (err) {
        res.json({
          ok: false,
          error: err.message
        });
        return;
      }
      res.json({
        ok: true
      });
    });
  });
}

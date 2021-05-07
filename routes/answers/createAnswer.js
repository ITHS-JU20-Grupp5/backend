const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.post('/answers', function (req, res) {
    const correct = (req.body.correct ? true : false);
    db.run('insert into answers (Answer, Correct) values (?, ?)', [req.body.answer, correct], function (err) {
      if (err) {
        res.json({
          ok: false,
          error: err.message
        });
      }
      res.json({
        ok: true,
        id: this.lastID
      })
    })
  })
}

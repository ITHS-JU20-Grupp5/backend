const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.get('/answers', function (req, res) {
    db.all('select * from answers', [], function (err, answers) {
      if (err) {
        res.json({
          ok: false,
          error: err.message
        })
      }
      res.json({
        ok: true,
        answers
      })
    })
  })
}

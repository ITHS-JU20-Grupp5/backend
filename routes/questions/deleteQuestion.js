const db = require.main.require('./utils/database');
module.exports = function (app) {
    app.delete('/questions/:id', (req, res) => {
        db.run('delete from questions where Id = ?', req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.message,
                });
                return;
            }
            res.json({
                ok: this.changes > 0,
            });
        });
    });
}
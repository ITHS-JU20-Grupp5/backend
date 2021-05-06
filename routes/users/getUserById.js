const db = require.main.require('./database');

module.exports = function(app) {
    app.get('/users/:id', (req, res) => {
        db.get('select * from users where Id = ?', req.params.id, function (err, row) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                ok: true,
                user: row
            });
        });
    });
}
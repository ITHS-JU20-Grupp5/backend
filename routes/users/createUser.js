const db = require.main.require('./database');

module.exports = function(app) {
    app.post('/users', (req, res) => {
        let user = [req.body.username, req.body.name, req.body.email, req.body.password];
        db.get('select * from users where Username = ?', req.body.username, function (err, row) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            if (row) {
                res.json({
                    ok: false,
                    message: "That username already exists"
                });
                return;
            }
            db.run('insert into users (Username, Name, Email, Password) values (?, ?, ?, ?)', user, function (err) {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    ok: true,
                    id: this.lastID
                });
            });
        })
    });
}
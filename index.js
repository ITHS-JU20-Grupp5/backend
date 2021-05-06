const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const db = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World!' });
});

app.get('/users', (req, res) => {
    db.all('select * from users', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            ok: true,
            users: rows
        });
    });
});

app.get('/users/:id', (req, res) => {
    db.all('select * from users where Id = ?', req.params.id, (err, row) => {
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

/*
 * Use with following body
 * {
 *  "username": "",
 *  "name": "",
 *  "email": "",
 *  "password": "",
 * }
 */
app.post('/users', (req, res) => {
    let user = [req.body.username, req.body.name, req.body.email, req.body.password];
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
});

app.delete('/users/:id', (req, res) => {
    db.run('delete from users where Id = ?', req.params.id, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            ok: (this.changes > 0 ? true : false)
        });
    });
});

/*
 * Use with following body
 * {
 *  "password": "",
 * }
 */
app.patch('/users/:id', (req, res) => {
    db.run('update users set password = ? where Id = ?', [req.body.password, req.params.id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            ok: (this.changes > 0 ? true : false)
        })
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
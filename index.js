const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.json({ msg: process.env.HELLO_MESSAGE })
})

app.get('/:name', (req, res) => {
    res.json({ msg: `Hello ${req.params.name}` });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
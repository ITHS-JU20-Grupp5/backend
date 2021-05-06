const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

function recursiveRoutes(folder) {
    fs.readdirSync(folder).forEach(function(file) {

        let fullName = path.join(folder, file);
        let stat = fs.lstatSync(fullName);

        if (stat.isDirectory()) {
            recursiveRoutes(fullName);
        } else if (file.toLowerCase().indexOf('.js')) {
            require('./' + fullName)(app);
            console.log('Loaded ' + file);
        }
    });
}

recursiveRoutes('routes');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
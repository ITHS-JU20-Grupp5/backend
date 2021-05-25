const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require('fs');
const path = require('path');

const db = require('./utils/sequelize');
const RoleController = require('./controllers/role.controller');

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

function recursiveRoutes(folder) {
  fs.readdirSync(folder).forEach((file) => {
    const fullName = path.join(folder, file);
    const stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      recursiveRoutes(fullName);
    } else if (file.toLowerCase().indexOf('.js')) {
      require(`./${fullName}`)(app);
      console.log(`Loaded ${file}`);
    }
  });
}
const options = {
  // force: true,
};
db.sequelize.sync(options).then(async () => {
  await RoleController.findOrCreate({ role: 'Unverified' });
  await RoleController.findOrCreate({ role: 'User' });
  await RoleController.findOrCreate({ role: 'Admin' });

  recursiveRoutes('routes');

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
});

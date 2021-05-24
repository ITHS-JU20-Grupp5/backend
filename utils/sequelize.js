const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBURL,
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

fs.readdirSync('./models').forEach((file) => {
  if (file.toLowerCase().indexOf('.js')) {
    db[file.split('.')[0]] = require(`../models/${file}`)(sequelize, DataTypes);
  }
});

fs.readdirSync('./associations').forEach((file) => {
  if (file.toLowerCase().indexOf('.js')) {
    require(`../associations/${file}`)(db);
  }
});

module.exports = db;

const db = require('../utils/sequelize');

const Role = db.role;

module.exports.create = (role) =>
  Role.create(role)
    .then((newRole) => newRole)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findOrCreate = async (values) =>
  Role.findOrCreate({
    where: { role: values.role },
    defaults: {
      role: values.role,
    },
  })
    .then((role) => role)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = (where = {}) =>
  Role.findAll({ where })
    .then((roles) => roles)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findById = (id) =>
  Role.findByPk(id)
    .then((user) => user)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.delete = (options) =>
  Role.destroy(options)
    .then((res) => res)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

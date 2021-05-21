const db = require('../utils/sequelize');

const User = db.user;
const Role = db.role;

module.exports.create = (role) =>
  Role.create(role)
    .then((newRole) => newRole)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = () =>
  Role.findAll({
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id', 'username'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((roles) => roles)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findById = (id) =>
  Role.findByPk(id, {
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id', 'username'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((user) => user)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

const db = require('../utils/sequelize');

const User = db.user;
const Role = db.role;

module.exports.create = (user) =>
  User.create(user)
    .then((newUser) => newUser)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = () =>
  User.findAll({
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'role'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((users) => users)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findById = (id) =>
  User.findByPk(id, {
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'role'],
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

module.exports.addRole = (userId, roleId) =>
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log('No user was found');
        return null;
      }
      return Role.findByPk(roleId).then((role) => {
        if (!role) {
          console.log('No role was found');
          return null;
        }
        user.addRole(role);
        console.log(`Added role: ${role.role} to user: ${user.username}`);
        return user;
      });
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

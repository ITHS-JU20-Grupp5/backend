const db = require('../utils/sequelize');

const User = db.user;
const Role = db.role;
const Score = db.score;

module.exports.create = (user) =>
  User.create(user)
    .then((newUser) => newUser)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = (where = {}) =>
  User.findAll({
    where,
    include: [
      {
        model: Role,
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

module.exports.addScore = (userId, scoreId) =>
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log('No user was found');
        return null;
      }
      return Score.findByPk(scoreId).then((score) => {
        if (!score) {
          console.log('No score was found');
          return null;
        }
        user.addScore(score);
        console.log(`Added score: ${score.score} to user: ${user.username}`);
        return user;
      });
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.delete = (options) =>
  User.destroy(options)
    .then((res) => res)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

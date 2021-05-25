const db = require('../utils/sequelize');

const { password } = require.main.require('./utils/utilities');

const User = db.user;
const Role = db.role;
const Score = db.score;
const Verification = db.verification;

module.exports.create = (user) =>
  User.create(user)
    .then((newUser) => newUser)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findOrCreate = async (values) =>
  User.findOrCreate({
    where: { username: values.username, email: values.email },
    defaults: {
      username: values.username,
      name: values.name,
      email: values.email,
      password: await password.encrypt(values.password),
    },
  })
    .then((category) => category)
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
        as: 'roles',
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
      },
    ],
  })
    .then((user) => user)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findOne = (where = {}) =>
  User.findAll({ where, include: [{ model: Role, as: 'roles' }] })
    .then((users) => {
      if (!users) {
        console.log('No user was found');
        return null;
      }
      return users[0];
    })
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

module.exports.addVerification = (userId, verificationId) =>
    User.findByPk(userId)
        .then((user) => {
            if (!user) {
                console.log('No user was found');
                return null;
            }
            return Verification.findByPk(verificationId).then((verification) => {
                if (!verification) {
                    console.log('No verification was found');
                    return null;
                }
                user.addVerification(verification);
                console.log(`Added verification: ${verification.key} to user: ${user.username}`);
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

module.exports.update = (values) =>
  User.update(
    {
      name: values.name,
      password: values.password,
    },
    {
      where: {
        id: values.id,
      },
      returning: true,
    }
  )
    .then((updatedUser) => updatedUser)
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

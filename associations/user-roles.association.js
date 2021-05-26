module.exports = (db) => {
  db.user.belongsToMany(db.role, {
    through: 'user_roles',
    as: 'roles',
    foreignKey: 'userId',
  });
  db.role.belongsToMany(db.user, {
    through: 'user_roles',
    as: 'users',
    foreignKey: 'roleId',
  });
};

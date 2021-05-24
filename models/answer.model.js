module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Answer;
};

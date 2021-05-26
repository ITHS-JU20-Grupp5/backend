module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('score', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Score;
};

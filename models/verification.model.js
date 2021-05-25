module.exports = (sequelize, DataTypes, Sequelize) => {
    const Verification = sequelize.define('verification', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        key: {
            type: DataTypes.UUID, //instead of BOOL; unique string each time
            defaultValue: Sequelize.UUIDV4, //generates new unique ID each time
        },
    });

    return Verification;
};

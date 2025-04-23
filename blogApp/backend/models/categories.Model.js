const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");


const categoryModle = sequelize.define("category",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { categoryModle }
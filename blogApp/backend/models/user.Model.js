const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const userModel = sequelize.define("user",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


userModel.associate = models => {
    userModel.hasMany(models.postModel, { foreignKey: "userId" });
    userModel.hasMany(models.commentModel, { foreignKey: "userId" });
    userModel.hasMany(models.likeModel , { foreignKey: "userId"});
  };

module.exports = { userModel }

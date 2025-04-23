const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const { categoryModle } = require("./categories.Model");
const { userModel } = require("./user.Model");

const postModel = sequelize.define("post",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descriptions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: categoryModle,
            key: "id"
        },
        onDelete: "SET NULL"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key: "id"
        },
        onDelete: "CASCADE"
    }
})


postModel.associate = (model) =>{
    postModel.belongsTo(model.userModel, {foreignKey: "userId"});
    postModel.hasMany(model.commentModel, {foreignKey: "blogId"})
    postModel.hasMany(model.likeModel, { foreignKey: "blogId"})
}


module.exports = { postModel }
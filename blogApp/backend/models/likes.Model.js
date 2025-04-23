const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const { postModel } = require("./post.Model");
const { userModel } = require("./user.Model");



const likeModel = sequelize.define("Likes",{
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
   },
   blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: postModel,
        key: "id"
    },
    onDelete: "CASCADE"
   },
   userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: userModel,
        key: "id"
    }
   }
})






likeModel.associate = (model)=>{
    likeModel.belongsTo(model.postModel, { foreignKey: "blogId"});
    likeModel.belongsTo(model.userModel, {foreignKey: "userId"})
}

module.exports = { likeModel }



const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const { userModel } = require("./user.Model");
const { postModel } = require("./post.Model");
const { categoryModle } = require("./categories.Model");
const { likeModle, likeModel } = require("./likes.Model")

const commentModel = sequelize.define("comment",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key: "id"
        },
        onDelete: "CASCADE"
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
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

commentModel.associate =(model)=>{
    commentModel.belongsTo(model.userModel, {foreignKey: "userId"});
    commentModel.belongsTo(model.postModel, {foreignKey: "blogId"})
}


userModel.sync().then(()=>{
    console.log("user model sync successfully")
     
    return categoryModle.sync()
}).then(()=>{
    console.log("categories model synced successfully") 

    return postModel.sync()
}).then(()=>{
    console.log("post Model synced successfully")

    return commentModel.sync()
}).then(()=>{
    console.log("comment model synced successfuly")

    return likeModel.sync()

}).then(()=>{
    console.log("like model synced successfully")
}).catch((error)=>{
    console.log("error in syncing the data ",error)
})



module.exports = { commentModel }


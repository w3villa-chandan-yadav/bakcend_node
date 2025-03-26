const {DataTypes} = require('sequelize');
const sequelize = require("../config/databaseConnection");


const User = sequelize.define('User',{
    userId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    socketId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:"chandan"
    }
});

User.sync().then(()=>{
    console.log("User model synced with database")
}).catch((error)=>{
console.log('Error syncing User model:',error)
})

module.exports = User;
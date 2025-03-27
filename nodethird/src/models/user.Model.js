import { DataTypes } from "sequelize";
import sequelize from "../configs/databaseConnection.js";


const User = sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true, 
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    tableName:"users",
    timestamps:false
})



// User.sync({ force: true }).then(()=>{


User.sync().then(()=>{
    console.log('user table sync successfully')
}).catch((error)=>{
   console.log("error in syncing the user table")
})

export default User ;
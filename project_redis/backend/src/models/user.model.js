import { DataTypes,} from "sequelize"; 
import {v4 as uuidv4} from "uuid";
import sequelize from "../config/dbConnection.js";


const User = sequelize.define("User",{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type:DataTypes. STRING,
        allowNull: false,
        unique: true
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    uuid: {
        type:DataTypes.UUID,
        defaultValue: uuidv4(), 
        
    },
    phoneNumber: {
       type: DataTypes.STRING,
       allowNull: true
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    nextStep: {
       type: DataTypes.ENUM('1','2','3'),
       allowNull: false,
       defaultValue: '1'
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
//     hooks: {
//         beforeCreate: (user) => {
//           user.uuid = user.uuid || uuidv4();
//         }
// }
})

// User.sync().then(()=>{
//     console.log("user table is synced")
// }).catch((err)=>{
//    console.log("there is an error in syncing the user table")
// })

export default User ;
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConnection.js";
import User from "./user.model.js";




const EmailVerification = sequelize.define("EmailVerification",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: User,
        key: 'id'
      }
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: ()=>{
            const currentTime = new Date();
            currentTime.setMinutes(currentTime.getMinutes()+5);
            return currentTime
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})

export { EmailVerification }
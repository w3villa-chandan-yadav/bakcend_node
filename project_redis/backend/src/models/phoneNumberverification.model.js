import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
import User from "./user.model.js";



const PhoneVerification = sequelize.define("phoneverification",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: " CASCADE"
    },
    verificationCode: {
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    epxireAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: ()=>{
            const currentTime = new Date();
            currentTime.setMinutes(currentTime.getMinutes() + 5 );
            return currentTime
        }
    }
},{
    timestamps: false
})

export { PhoneVerification }
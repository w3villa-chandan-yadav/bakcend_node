import { DataTypes } from "sequelize";
import { v4 as uuid } from "uuid";
import sequelize from "../config/dbConnection.js";
import User from "./user.model.js";

const Games = sequelize.define("Games", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: uuid(),
    },
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isFuture(value) {  
                if (new Date(value).getTime() <= new Date().getTime()) {
                    throw new Error('createdAt must be a future date');
                }
            }
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,  
            key: 'id',
        },
        onDelete: 'SET NULL',
    }
}, {
    timestamps: false,  
});


// Games.sync({ force: true })  
//   .then(() => {
//     console.log("Games table is synced!");
//   })
//   .catch((err) => {
//     console.error("Error syncing the Games table:", err);
//   });

export default Games;

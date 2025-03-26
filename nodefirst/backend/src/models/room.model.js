const { DataTypes } = require('sequelize');
const sequelize = require("../config/databaseConnection");
const User = require('./user.model'); 

const Rooms = sequelize.define("Room", {
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING, 
        allowNull: false,
        references: {
            model: User,
            key: 'id' 
        }
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('owner', 'member'),
        allowNull: false,
        defaultValue: 'member',
    },
},
/*
{
tableName:"Room"
}*/
);



Rooms.sync().then(() => {
    console.log("Room model synced with database");
}).catch((error) => {
    console.log('Error syncing Room model:', error);
});

module.exports = Rooms;

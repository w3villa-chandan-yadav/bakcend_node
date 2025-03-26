const {Sequelize ,DataTypes} = require('sequelize');

const sequelize = new Sequelize('newChatApp','root','root',{
    host:'localhost',
    dialect:'mysql',
})

sequelize.authenticate().then(()=>{
    console.log('Database connected successfully');
}).catch((error)=>{
    console.log(`Unable to connect to the database`,error)
})


module.exports = sequelize ; 
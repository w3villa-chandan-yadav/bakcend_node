const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("TM","root","root",{
    host: "localhost",
    dialect: "mysql"
})


sequelize.authenticate().then(()=>{
    console.log("dataBase connected successfully")
}).catch((err)=>{
    console.log("error in dataBase connection",err)
})

module.exports = { sequelize }
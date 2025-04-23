const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blogApplication", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(()=>{
    console.log("Database connected successfully")
}).catch(()=>{
    console.log("Database connection error")
})

module.exports = { sequelize }
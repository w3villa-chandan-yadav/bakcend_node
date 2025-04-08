import { Sequelize } from "sequelize";

const sequelize = new Sequelize("testDataBase","root","root",{
    host:"localhost",
    dialect:"mysql"
})


sequelize.authenticate().then(()=>{
    console.log("database connected successfully");
}).catch(()=>{
    console.log("ther is an error in connecting the database")
})


export default sequelize
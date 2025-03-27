import {Sequelize} from "sequelize";

const sequelize = new Sequelize("testDataBase","root","root",{
    host:"localhost",
    dialect:"mysql"
})


sequelize.authenticate().then(()=>{
    console.log("database connected successfully")
}).catch((err)=>{
    console.log("error in data base connection")
})


export default sequelize ;
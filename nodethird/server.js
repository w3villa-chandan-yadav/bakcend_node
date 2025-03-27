import express from "express";
const app = express()
import dotenv from "dotenv";
import sequelize from "./src/configs/databaseConnection.js";
import userRoute from "./src/routes/user.route.js";

dotenv.config({
    path:`./src/utils/.env.${process.env.NODE_ENV || "development"}`
})

console.log(process.env.TEST_NAME);
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1",userRoute)

app.use((err,req,res,next)=>{
    console.log('error in backend');
    res.status(500).json({
        success:false,
        message:"Internal server error",
        message2: err.message,
    })
})



app.listen(PORT,()=>{
    console.log(`app is listing on ${PORT}`)
})
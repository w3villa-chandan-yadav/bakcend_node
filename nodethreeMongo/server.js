import express from "express";
const app = express()
import { configDotenv } from "dotenv";
configDotenv();
import { dbconnnect } from "./src/config/databaseConnection.js";
import route from "./src/routes/user.route.js";
dbconnnect();

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",route)

app.use((err,req,res)=>{
 
    try {
        res.json({
            success:false,
            meessage:"internal server error",
            realMessage:err.meessage
        })
    } catch (error) {
        console.log("something went wrong in the error handler")
    }
    
})

app.listen(PORT,()=>{
    console.log(`app is listing on the port no:${PORT}`)
})


export default app ;
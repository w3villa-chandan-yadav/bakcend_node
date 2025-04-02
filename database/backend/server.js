const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const route  = require("./src/routes/user.routes");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send("hello")
})

app.use("/api/v1",route)

app.use((err,req,res,next)=>{
    console.log("error",err);

    res.status(400).json({
        success: false,
        message:"internal server error"
    })
})


app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT} ....`)
})
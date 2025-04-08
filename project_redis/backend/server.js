import express from "express";
const app = express();
import { configDotenv } from "dotenv";
configDotenv();
import http from "http";
import {Server} from "socket.io"
import cors from "cors";
import cookieParser from "cookie-parser";
import client from "./src/config/redisConnection.js";
import userRoute from "./src/routes/user.route.js";
import { initiallizeGame } from "./src/controller/game.controller.js";
import gameRoute from "./src/routes/game.route.js";
const PORT = process.env.PORT || 4000 ;


const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(cors({
    origin:["*"],
    credentials:true
}));

io.on("connect",(socket)=>{
    console.log("a user has connected");

    socket.on("joinGame",async (gameUserData)=>{

        const {gameId , playerId} = gameUserData ;

        try {

            await initiallizeGame(gameId, playerId);
            
        } catch (error) {
            console.log("error in socket intiallizegame");
        }


        

    })
})


app.use("/api/v1/user",userRoute);
app.use("/api/v1/game",gameRoute)

app.use((err,req,res,next)=>{
    console.log(err.message)
    res.status(500).json({
        success:false,
        message:"Internal server error",
        data:[]
    })
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}.....`)
})


export default app
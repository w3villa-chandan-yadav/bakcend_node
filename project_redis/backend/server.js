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
import homePage from "./src/routes/home.routes.js";
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

const QUESTIONS = [
    { id: 1, question: 'What is 2 + 2?', answer: '4' },
    { id: 2, question: 'Capital of India?', answer: 'Delhi' },
    { id: 3, question: 'Water formula?', answer: 'H2O' },
  ];
  let currentQuestionIndex = 0;
  let activeGroups = []
 
 
  function startQuestionBroadCast(){
    setInterval(async()=>{
        const question = QUESTIONS[currentQuestionIndex] ;
        console.log("here in side startquestions")
        if(!question) return
        for(const group of activeGroups){
            console.log("this question is send" , question.question)
            io.to(group.socketRoomId).emit("question",{
                questionId: question.id,
                text : question.question
            })
            group.answer= []
        }
        setTimeout(()=> evaluteGroupAnswer(question.id),10000);
        currentQuestionIndex = (currentQuestionIndex+1) % QUESTIONS.length ;
    },   10000);
  }
  //Evalite question 
     async function evaluteGroupAnswer(questionId){
        for(const group of  activeGroups){
            const totalUser = group.users.length; 
            let totalCorrect = 0 ;
            for(const user of group.users){
                const key = `group:${group.id}: questions :${questionId}:user :${user.id} `
                const answerData =  await client.get(key);
                if(answerData ==="1") totalCorrect++ ;  
            }
            const  mean = totalCorrect / totalUser ;
            if(mean >= 1){
                    io.to(group.socketRoomId).emit("groupScore",{
                        result: "pass",
                        meanSocre : mean
                    })
            }else{
                io.to(group.socketRoomId).emit("groupScore",{
                    result: "fail",
                    meanScore: mean
                });
                group.eliminated = true ;
            }
        }
     } 


     startQuestionBroadCast()

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('joinGroup', async ({ groupName, username }, callback) => {
      let group = activeGroups.find(g => g.name === groupName);
      if (!group) {
        // const dbGroup = await db.Group.create({ name: groupName });
        group = {
            id: 345,
        //   id: dbGroup.id,
          name: groupName,
        //   socketRoomId: `group-${dbGroup.id}`,
        socketRoomId: `group-${345}`,
          users: [],
          answers: [],
        };
        activeGroups.push(group);
      }
    //   const dbUser = await db.User.create({ username, GroupId: group.id });
    //   const user = { id: dbUser.id, username, socketId: socket.id };
    const user = { id : 345 , username , socketId: socket.id}
      group.users.push(user);
      socket.join(group.socketRoomId);
      callback({ success: true, groupId: group.id, userId: user.id });
    });
    socket.on('answer', async ({ groupId, userId, questionId, answer }) => {
      const question = QUESTIONS.find(q => q.id === questionId);
      const correct = question.answer.toLowerCase() === answer.toLowerCase();
      const score = correct ? '1' : '0';
      console.log(score)
      await client.set(`group:${groupId}:question:${questionId}:user:${userId}`, score, { EX: 20 });
      socket.emit('answerFeedback', { correct });
    });
  });
  


app.use("/api/v1/user",userRoute);
app.use("/api/v1/game",gameRoute);
app.use("/api/v1/product",homePage);

// app.use("*",  (req,res,next)=>{
//     const foo = undefined ;
// //   console.log(foo.bar)
//    try {
//     console.log("hello")
//     throw new Error("chandan")
//    } catch (error) {
//     throw new Error("errorrr")
//    }
// })


app.use((err,req,res,next)=>{
    console.log(err.message)
    res.status(err?.statusCode || 400).json({
        success:false,
        message:  err.message || "Internal server error",
        data:[]
    })
})

server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}.....`)
})


export default app
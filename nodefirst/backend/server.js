const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config({
  path :`./configureEnv/.env${process.env.NODE_ENV || "development"  }`
})



const fs = require("fs");
// const http = require("http");
const https = require("https")
const {Server} = require("socket.io")
const User = require("./src/models/user.model");
const Room = require("./src/models/room.model");

console.log("this is environment",process.env.NAME)

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, (req, res) => {
  res.writeHead(200);
  res.end('Secure WebSocket server is running');
});

// const server = http.createServer(app);
app.use(cors({
    origin:"*", 
}))
const PORT = process.env.PORT || 4000;

const io = new Server(server,{
    cors:{
        origin:"*",
    }
})


const bannedWords = ["badword1", "badword2", "example"]; 

const containsInappropriateWords = (message) => {
    return bannedWords.some(word => message.toLowerCase().includes(word.toLowerCase()));
};

io.on('connection', (socket) => {
    console.log(`User connected:: ${socket.id}`);

    socket.on('register',async(userId)=>{
   
      try {
        
     

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid message');
      }

      const existingUser  = await User.findOne({where:{userId:userId}})

      if(existingUser){
        existingUser.socketId = socket.id;
        await existingUser.save();
        console.log(`User ${userId} reconnect with socket:Id:${socket.id}`)
      }else{
        await User.create({
          userId,
          socketId:socket.id
        })

        console.log(`New user ${userId} connected with socket Id : ${socket.id}`)
      }
    } catch (error) {
        console.log(`error in restering the user and`,error);
        socket.emit("error",`please provide a valid data to proceed`)
    }

    })

  
    socket.on('message', async(data) => {
      try {
        if (!data || typeof data !== 'string' || data.trim() === '') {
          throw new Error('Invalid message');
        }

        if(containsInappropriateWords(data)){
          console.log(`this message containe some badd work`);
          throw new Error("bad message")
        }
  
        console.log(`Received message: ${data}`);
        // socket.emit('data', `Message received: ${data}`);
        socket.broadcast.emit('data', `Message received: ${data}`);

      } catch (err) {
        console.error(`Error processing message: ${err.message}`);
        socket.emit('error', `Error: ${err.message}`);
      }
    });

  //   socket.on('createRoom', (roomName, password) => {
  //     if (io.sockets.adapter.rooms.has(roomName)) {
  //         socket.emit('error', 'Room already exists!');
  //         return;
  //     }
  //     socket.join(roomName);
  //     socket.emit('success', `Room '${roomName}' created and you have joined it.`);
  //     console.log(`Room '${roomName}' created by ${socket.id}`);
  // });
  // socket.on('joinRoom', (roomName, password) => {
  //     if (!io.sockets.adapter.rooms.has(roomName)) {
  //         socket.emit('error', `Room '${roomName}' does not exist.`);
  //         return;
  //     }
  //     socket.join(roomName);
  //     socket.emit('success', `You have successfully joined the room: ${roomName}`);
  //     console.log(`${socket.id} joined room: ${roomName}`);
  // });
  // socket.on('sendRoomMessage', (roomName, message) => {
  //     if (!io.sockets.adapter.rooms.has(roomName)) {
  //         socket.emit('error', `Room '${roomName}' does not exist.`);
  //         return;
  //     }
  //     io.to(roomName).emit('roomMessage', message);
  //     console.log(`Message sent to room ${roomName}: ${message}`);
  // });
  
  socket.on('createRoom', async (roomName) => {

    console.log(roomName)
    console.log("this is between")
    
    const isExistingRoom = await Room.findOne({where:{roomId:Number(roomName.roomId)}})

    console.log(isExistingRoom);

    const roomId = isExistingRoom.roomId;
  

    if (isExistingRoom) {
      console.log(isExistingRoom.get({plain:true}))
        socket.emit('error', 'Room already exists!');
        return;
    }

    const newRoom = await Room.create({
      roomId:roomName.roomId,
      userId:roomName.userId,
      password:roomName.password,
    })

    socket.join(roomName);
    socket.emit('success', `Room '${roomName}' created and you have joined it.`);
    console.log(`Room '${roomName}' created by ${socket.id}`);
});

socket.on('joinRoom',async (roomName, password) => {

  // const isExistingrooms = await Room.sequelize.transaction()

  const isExistingRoom = await Room.findOne({where:{roomId:roomName}})


    if (!isExistingRoom) {
        socket.emit('error', `Room '${roomName}' does not exist.`);
        return;
    }

    if (isExistingRoom.password !== password) {
        socket.emit('error', 'Incorrect roomId/password.');
        return;
    }

    socket.join(roomName);

    ///for deleting the room we have to leave that room 
    // socket.leave(roomName)
    socket.emit('success', `You have successfully joined the room: ${roomName}`);
    console.log(`${socket.id} joined room: ${roomName}`);
});

socket.on('sendRoomMessage', (roomName, message) => {
    if (!io.sockets.adapter.rooms.has(roomName)) {
        socket.emit('error', `Room '${roomName}' does not exist.`);
        return;
    }
    io.to(roomName).emit('roomMessage', message);
    console.log(`Message sent to room ${roomName}: ${message}`);
});
  
  socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${socket.id}. Reason: ${reason}`);
    });
    socket.on('error', (err) => {
      console.error('Socket error:', err);
      socket.emit('error', 'Something went wrong on the server!');
    });
  });


app.get("/",(req,res)=>{
    res.send("this is home route")
    return
})

server.listen(PORT,()=>{
    console.log(`server is listing on the port ${PORT}`)
})
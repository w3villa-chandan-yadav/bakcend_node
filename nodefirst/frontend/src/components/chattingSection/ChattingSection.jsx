import React, { useCallback, useEffect, useState } from 'react';
import { io } from "socket.io-client";


// export const socket = io("http://localhost:4000");

export const socket = io("wss://localhost:4000", {
    transports: ['websocket'], 
  });
const ChattingSection = () => {
    const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("")

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("message", text);
    console.log("message to emit --------", text);
    setChat((prev) => [...prev, { messages: text,by:"sender" }]);
    setText("");
  };
 const handleReceive = useCallback((messages) => {
    console.log(messages, "------message received");
    setChat((prev) => [...prev, { messages: messages,by:"reciver" }]);
  });


  const getConnnected = (userId)=>{
    socket.emit("register",userId)
  }


  useEffect (() => {
    console.log("useEffect");
    
    socket.on("data", handleReceive);

    return () => {
      socket.off("data", handleReceive);
      console.log("disconnected");
    };
  }, []); 
  return (
    <div className='chatContainer'>
        <input type='text' value={userId} 
        onChange={(e)=>setUserId(e.target.value)}
        onKeyDown={(e)=>e.key ==="Enter" && getConnnected(e.target.value)}/>
        <div className='chatSection'>

    {chat.map((text, index) => (
        <p  className={text.by} key={index}>{text?.messages}</p>
    ))}
    </div>
    <div className='messageInput'>

    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
      />
    <button onClick={handleSend}>Send Message</button>
      </div>
  </div>
  )
}

export default ChattingSection
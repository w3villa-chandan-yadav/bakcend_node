// import React, { useState } from 'react';
// import socket from '../scoket';

// function JoinGroup({ onJoin }) {
//   const [username, setUsername] = useState('');
//   const [groupName, setGroupName] = useState('');

//   const handleJoin = () => {
//     if (!username || !groupName) return;

//     socket.emit('joinGroup', { username, groupName }, (response) => {
//       if (response.success) {
//         onJoin({ userId: response.userId, groupId: response.groupId });
//       }
//     });
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Join Friend Room</h2>
//       <input
//         className="border p-2 m-2"
//         placeholder="Your Name"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         className="border p-2 m-2"
//         placeholder="Group Name"
//         value={groupName}
//         onChange={(e) => setGroupName(e.target.value)}
//       />
//       <button onClick={handleJoin} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Join Game
//       </button>
//     </div>
//   );
// }

// export default JoinGroup;



// src/components/JoinRoom.jsx
import React, { useState } from "react";
// import socket from "../utils/socket";
import socket from "../scoket";

const JoinRoom = ({ onJoin }) => {
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (!groupName || !username) return alert("Please fill all fields");

    socket.emit("joinGroup", { groupName, username }, (response) => {
      if (response.success) {
        localStorage.setItem("groupId", response.groupId);
        localStorage.setItem("userId", response.userId);
        onJoin(); // Trigger switch to QuizRoom
      } else {
        alert("Failed to join group");
      }
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Join a Friend Group</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={handleJoin}
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;

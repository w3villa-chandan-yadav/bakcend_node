// import React, { useEffect, useState } from 'react';
// import JoinGroup from './componet/JoinRoom';
// import GameRoom from './componet/GamesRoom';

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-2xl font-bold mb-4 text-center">Quantest Group Challenge</h1>
//       {!user ? <JoinGroup onJoin={setUser} /> : <GameRoom user={user} />}
//     </div>
//   );
// }

// export default App;
 
 
 
  
 
// src/App.jsx
import React, { useState } from "react";
import JoinRoom from "./componet/JoinRoom";
import QuizRoom from "./componet/QuizRoom";

const App = () => {
  const [joined, setJoined] = useState(false);
  
  // !!localStorage.getItem("groupId") && !!localStorage.getItem("userId")
  return (
    <div className="App">
      {joined ? <QuizRoom /> : <JoinRoom onJoin={() => setJoined(true)} />}
    </div>
  );
};

export default App;
























// import React, { useState } from "react";
// import "./App.css"; // For styling
// const SwipeableCard = ({ content, onSwipe }) => {
//   const [dragging, setDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [swipeDirection, setSwipeDirection] = useState(null);
//   const handleMouseDown = (e) => {
//     setDragging(true);
//     setSwipeDirection(null);
//   };
//   const handleMouseMove = (e) => {
//     if (!dragging) return;
//     setPosition({ x: e.clientX, y: e.clientY });
//   };
//   const handleMouseUp = (e) => {
//     if (!dragging) return;
//     setDragging(false);
//     // Check if it was a swipe (left or right)
//     if (position.x > 150) {
//       setSwipeDirection("right");
//       onSwipe("right");
//     } else if (position.x < -150) {
//       setSwipeDirection("left");
//       onSwipe("left");
//     } else {
//       setPosition({ x: 0, y: 0 });
//     }
//   };
//   // For touch support
//   const handleTouchStart = (e) => {
//     setDragging(true);
//     setSwipeDirection(null);
//   };
//   const handleTouchMove = (e) => {
//     if (!dragging) return;
//     setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
//   };
//   const handleTouchEnd = () => {
//     if (!dragging) return;
//     setDragging(false);
//     // Check if it was a swipe (left or right)
//     if (position.x > 150) {
//       setSwipeDirection("right");
//       onSwipe("right");
//     } else if (position.x < -150) {
//       setSwipeDirection("left");
//       onSwipe("left");
//     } else {
//       setPosition({ x: 0, y: 0 }); // Reset position if not swiped enough
//     }
//   };
//   return (
//     <div
//       className="card"
//       style={{
//         transform: `translateX(${position.x}px)`,
//         opacity: Math.max(0.5, 1 - Math.abs(position.x) / 300),
//         transition: dragging
//           ? "none"
//           : "transform 0.3s ease-out, opacity 0.3s ease-out",
//       }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {content}
//     </div>
//   );
// };
// const App = () => {
//   const [swipedCards, setSwipedCards] = useState([]);
//   const [index, setIndex] = useState(0);
//   const cards = ["Card 1", "Card 2", "Card 3", "Card 4"];
//   const handleSwipe = (direction) => {
//     setSwipedCards((prevSwipedCards) => [
//       ...prevSwipedCards,
//       { card: cards[index], direction },
//     ]);
//     if (index < cards.length - 1) {
//       setIndex(index + 1);
//     }
//   };
//   return (
//     <div className="app">
//       <h1>Swiper</h1>
//       {index < cards.length && (
//         <SwipeableCard content={cards[index]} onSwipe={handleSwipe} />
//       )}
//       <div>
//         <h2>Swipe History</h2>
//         <ul>
//           {swipedCards.map((swipedCard, idx) => (
//             <li key={idx}>
//               {swipedCard.card} - Swiped {swipedCard.direction}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default App;

import React, { useEffect, useState } from 'react';
import "./App.css"
import { Routes , Route} from "react-router-dom"
import HomePage from './components/homePage/HomePage';
import CreateRoom from './components/createRoom.js/CreateRoom';


const App = () => {
  
  

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/room' element={<CreateRoom/>} />
    </Routes>
   </>
  );
};

export default App;

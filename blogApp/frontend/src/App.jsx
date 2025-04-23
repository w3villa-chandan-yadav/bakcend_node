import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { UserDetailsProvider } from './useContext/Context'



const App = () => {
  return (
    <div className='relative bg-green-300 h-screen w-screen'>
    <UserDetailsProvider>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </UserDetailsProvider>


    </div>

 )
}

export default App
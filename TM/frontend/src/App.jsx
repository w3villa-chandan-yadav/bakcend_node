import React from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom'
import { FrontPage, HomePage } from './pages'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerificationPage from './pages/VerificationPage'
import { TaskContextProvider } from './contextApi/TaskContext'

const App = () => {

  // console.log(React.version)

  return (
    <TaskContextProvider>

    <Routes>
      
      <Route exact path='/' element ={<HomePage/>}>
      <Route index element= {<FrontPage/>}/>
      </Route>
      <Route path='/login' element={<SignUp/> }/>
      <Route path ="/signup" element= {<Login/>}/>
      <Route path= "/verification/:token" element= {<VerificationPage/>}/>
    </Routes>
    </TaskContextProvider>
  )
}

export default App



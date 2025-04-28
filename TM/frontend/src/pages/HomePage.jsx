import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Projects from '../components/Projects'
import { useSelector } from 'react-redux'
import {  useTaskContect } from '../contextApi/TaskContext'
import { GiCrossMark } from "react-icons/gi";



const HomePage = () => {
   const navigate = useNavigate()
  const { userDetails } = useSelector((state)=> state.user);
  const [isPopUp, setIsPopUp ] = useState(false)
  const { isGroup , setIsGruop  , tasks ,setTasks, recent, setRecent} = useTaskContect()
  const [task, setTask ] = useState("")
  const [groupName, setgroupName] = useState("")

  const [ newTeam, setNewTeam ] = useState(false)

  const [createGroup, setCreateGroup] = useState(false)
  

  const handleTaskCreation = ()=>{
    // console.log("----------------------------")
    try {
       setIsPopUp(true)
    } catch (error) {
       console.log("there is an error in taskCreation")
    }

  }
  console.log("user in home ", userDetails)

  const handleTaskMaking = async ()=>{
    
    const values = isGroup ? {
      task, groupId:3
    } : {
      task
    }

    try {
      const data = await fetch("http://localhost:4000/api/v1/task/create",{
        method: "POST",
        headers:{
          "Content-Type":"application/json",
          Authorization: userDetails?.token
        },
        body: JSON.stringify(values)
      })

      const result = await data.json();

      console.log(result.data[0])

      if(result.success){

        setRecent([...recent, result.data[0]])
        setTask("");
        setIsPopUp(false)
      }else{
        alert(result.message)
      }


    } catch (error) {
      console.log("error in the taskCreation handleTaskMasking ", error)
    }
  }

      const handleTypes = async ()=>{
        try {
            const data = await fetch("http://localhost:4000/api/v1/task/createGroup",{
              method: "POST",
              headers: {
                "Content-Type":"application/json",
                Authorization: userDetails.token
              },
              body: JSON.stringify({groupName: groupName})
            })

            const result = await data.json();

            if(!result.success){
              alert(result.message)
              return
            }
            alert("Group created successfully")

            setTasks([...tasks, ...result.data[0]])

        } catch (error) {
          console.log("error in handle types in the group or task creation")
        }
        
      }

  console.log(newTeam)

  useEffect(()=>{
     
    if(!userDetails){
      navigate("/login")
    }

  },[])

  return (
    <div className='w-screen relative overflow-hidden h-screen max-w-[1500px] flex'>
      <div  className='h-full bg-[#292a2c] w-[67px]'>
        <SideBar />
     </div>   
    
     <div className='h-screen  custom_width overflow-hidden flex'>
        <div className='flex-1/6 bg-[#1f2022]'>
            <Projects handleTaskCreation={handleTaskCreation}/>
        </div>
       <div className='flex-5/6'>
       <Outlet/>
       </div>
    </div> 

    {
      isPopUp &&(<>
        <div className="w-screen h-screen absolute grid place-items-center bg-black/80 z-50 px-4">
      {/* Close Button */}
      <GiCrossMark
        onClick={() => setIsPopUp(false)}
        className="absolute top-5 right-6 text-white text-3xl cursor-pointer hover:scale-110 transition duration-200"
      />
    
      {/* Card Container */}
      <div className="bg-[#1e1e1e] border border-white/20 shadow-xl rounded-lg p-6 w-full max-w-md space-y-4">
     {isGroup && <div className='mx-auto flex justify-center text-white  p-1 bg-[#121315] rounded-sm w-[90%] '>
        <button 
        //  ${userDetails?.tier === "normal" ? "pointer-events-none":""}
        onClick={()=>{
        setNewTeam(true)}}
        className={`${newTeam ? "bg-[#282c32] shadow-xs/40 shadow-gray-300" : ""} cursor-pointer flex-1 font-bold py-2 text-[12px] rounded-sm`}>
           New Group
        </button>
        <button
      onClick={()=>{
        setNewTeam(false)
       }}
        className={`${newTeam ? "" : "bg-[#282c32] shadow-xs/40 shadow-gray-300"} cursor-pointer flex-1 font-bold py-2  rounded-sm  text-[12px] `}>
           New task
        </button>
     </div>}
        {/* Textarea */}
       {newTeam ? <div>
        <label className="block mb-2 text-white font-medium">Your Task</label>
          <input
              type='text'
            value={groupName}
            onChange={(e) => setgroupName(e.target.value)}
            placeholder="Write your task here...."
            className="bg-white/10  w-full p-3 text-white/80 outline-none resize-none rounded-md border border-white/10 focus:ring-2 focus:ring-amber-400"
          />
       </div> :<div>
          <label className="block mb-2 text-white font-medium">Your Task</label>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Write your task here..."
            className="bg-white/10 h-[150px] w-full p-3 text-white/80 outline-none resize-none rounded-md border border-white/10 focus:ring-2 focus:ring-amber-400"
          />
        </div> }
    
        {/* Button */}
        <div>
      {  newTeam ?  <button
            onClick={() => handleTypes()}
            className="w-full py-3 bg-amber-400 text-black font-semibold rounded-md hover:bg-amber-500 transition duration-200"
          >
           Create Group
          </button>:
          <button
            onClick={() => handleTaskMaking()}
            className="w-full py-3 bg-amber-400 text-black font-semibold rounded-md hover:bg-amber-500 transition duration-200"
          >
          Create Task
          </button>}
        </div>
      </div>
    </div>
    
    </>)}
   
 
    </div>
  )
}


export default HomePage
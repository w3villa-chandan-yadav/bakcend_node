import { createContext, useContext, useState } from "react";

const TaskContect = createContext();


export const TaskContextProvider = ({children})=>{

    const [isGroup ,setIsGruop ] = useState(false);

    const [tasks, setTasks] = useState([])

    const [teamm, setTeamm] = useState([])

    const [recent, setRecent] = useState([]) 



    const value = { isGroup , setIsGruop, setTasks, tasks, teamm, setTeamm, setRecent, recent}

    return <TaskContect.Provider value={ value }>
        {children}
    </TaskContect.Provider>
}

export const useTaskContect = ()=>{
    return useContext(TaskContect)
};
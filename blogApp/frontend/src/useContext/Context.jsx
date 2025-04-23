import React,{ createContext, useContext, useState } from "react";


const UserDetails = createContext();


export const  UserDetailsProvider = ({children})=>{

    const [user, setUser] = useState(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")): undefined);
    
   const value ={ user, setUser}


    return <UserDetails.Provider value={value}>
        {children}
    </UserDetails.Provider>
}

export const useUserContext = ()=>{
    return useContext(UserDetails)
}
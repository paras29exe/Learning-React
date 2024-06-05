import React from "react";
import { createContext } from "react";

const UserContext = createContext()

const UserProvider = ({children}) =>{
    const [user,setUser] = React.useState(null);
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserProvider, UserContext}
import React, { useContext } from 'react'
import {UserContext} from '../context/UserContextProvider'

function Profile() {
    const {user} = useContext(UserContext)

    if (!user || user.username=="") return <div>Please Login</div>

    return <div> Welcome {user.username}</div>
    
}

export default Profile

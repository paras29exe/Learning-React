import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/Auth"
import { logout } from '../../store/AuthSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await authService.appwriteLogout()
            dispatch(logout())
        }catch{
            console.error("Logoutbtn error :: error", error)
        }
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handleLogout}
    >Logout</button>
  )
}

export default LogoutBtn

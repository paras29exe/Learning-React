import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/Auth'
import { login, logout } from './store/AuthSlice'
import { Header, Footer } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {

    async function getUserInfo() {
      const user = await authService.getCurrentUser()
      try {
        if (user) {
          dispatch(login(user))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        console.log("Error Getting user :: error", error);
      }
      setLoading(false)
    }
    getUserInfo()
  }, [])


  return (
    <>
      <h1>Blog App with Appwrite</h1>
      <Header />
      <main>
        
      </main>
      <Footer />
    </>
  )
}

export default App

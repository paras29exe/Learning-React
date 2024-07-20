import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authSliceLogin } from '../store/AuthSlice'
import { useDispatch } from 'react-redux'
import { Loader, Button, Input, Logo } from './index'
import authService from '../appwrite/Auth'
import { useForm } from 'react-hook-form'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

  }, [loading])



  const login = async (data) => {
    setLoading(true)
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()

        if (userData) {
          dispatch(authSliceLogin(userData)) // check line no. 3
          navigate("/")
          setLoading(false)
        }
      }
    } catch (error) {
      setError("Wrong Credentials! Please check Email or Password", error.message)
      setLoading(false)
    }
  }
  return (
      <div className='flex items-center justify-center'>
        <div className='mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg'>
          <div className="mb-4 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">Login to your account</h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline text-blue-800"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className='mt-6'>
            <div className='space-y-5'>
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              {loading ? <Loader /> : <Button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-200"
                btnText="Login"
              />}
            </div>
          </form>
        </div>
      </div>
  )

}

export default Login

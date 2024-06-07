import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container className='flex justify-between items-center'>
        <nav className='flex'>
          <div className="mr-4">
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => {
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.path)}>
                    {item.name}
                  </button>
                </li>
              ) : null;
            })}
            { authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

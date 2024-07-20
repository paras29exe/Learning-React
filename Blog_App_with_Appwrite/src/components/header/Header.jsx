import React from 'react';
import { Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faFileAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: faHome,
      active: true
    },
    {
      name: "Login",
      path: "/login",
      icon: faSignInAlt,
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      icon: faUserPlus,
      active: !authStatus,
    },
    {
      name: "My Posts",
      path: "/my-posts",
      icon: faFileAlt,
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      icon: faPlus,
      active: authStatus,
    },
  ];

  return (
    <header className='sticky top-0 z-10 py-2 shadow bg-navbar'>
      <div className='container mx-auto'>
        <nav className='flex justify-between items-center px-4'>
          <div className="mr-4">
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex items-center gap-x-3'>
            {navItems.map((item) => {
              if (item.active) {
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-x-2 px-4 py-2 transition duration-500 ${isActive ? "bg-blue-100 text-blue-700" : "text-white"} hover:bg-blue-100 hover:text-blue-700 rounded-full`
                      }
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      {item.name}
                    </NavLink>
                  </li>
                );
              } else return null;
            })}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
import React, { useEffect } from 'react'
import NavbarMain from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
      const hash = location.hash;
      if (hash) {
          const element = document.querySelector(hash);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
      }
  }, [location]);

  return (
    <>
      <NavbarMain />
      <Outlet />
    </>
  )
}

export default Layout
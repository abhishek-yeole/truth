import React from 'react'
import NavbarMain from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <NavbarMain />
      <Outlet />
    </>
  )
}

export default Layout
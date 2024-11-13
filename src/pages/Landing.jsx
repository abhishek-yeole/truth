import React from 'react'
import { useTheme } from "next-themes";

const Landing = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <p>Hello World !</p>
    </div>
    
  )
}

export default Landing
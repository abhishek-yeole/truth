import React from 'react'
import { Outlet } from 'react-router-dom'
import TruthLogo from '../assets/truth-dark.svg';
import { Switch } from '@nextui-org/react';
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";
import { useTheme } from "next-themes";

const Auth = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className='nav flex justify-around items-center align-middle w-full h-16 rounded-b-full bg-gray-200 dark:bg-neutral-900'>
        <div className='flex justify-center items-center align-middle gap-2'>
          <img src={TruthLogo} alt="Truth Logo" className="w-auto h-10 sm:h-8" />
          <p className="font-bold text-inherit">TRUTH</p>
        </div>
        <Switch
          defaultSelected
          size="md"
          color="primary"
          thumbIcon={({ isSelected, className }) =>
            !isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
            } else if (theme === "dark") {
              setTheme("light");
            }
          }}
        />
      </div>
      <Outlet />
    </div>
  )
}

export default Auth
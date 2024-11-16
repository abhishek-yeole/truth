import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TruthLogo from '../assets/truth-dark.svg';
import { Switch } from '@nextui-org/react';
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, spring } from 'framer-motion';
import { Vortex } from '../components/Vortex';
import Loader from '../components/Loader';

const Auth = () => {
  const { theme, setTheme } = useTheme();
  const navigateTo = useNavigate();
  const url = useLocation();
  const [showVortex, setShowVortex] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVortex(true);
    }, 200);
  }, []);

  return (
    <>
      <div className='nav flex justify-around items-center align-middle w-full h-16 rounded-b-3xl sm:rounded-b-full bg-gray-200 dark:bg-neutral-900'>
        <div className='flex justify-center items-center align-middle gap-2 cursor-pointer' onClick={() => navigateTo('/')}>
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

      <div className="h-fit w-full flex flex-wrap justify-center align-middle items-center p-5 sm:p-10 gap-2 transition-all">
        <AnimatePresence>
          {showVortex && 
            <motion.div 
              initial={{ opacity: 0, scale: 0.3, type: spring }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3, type: spring }}
              className={`h-[10rem] sm:h-[30rem] ${url.pathname === "/auth/login" ? "w-full sm:w-[calc(100%-450px)]" : "w-full sm:w-[calc(100%-750px)]"} mx-auto rounded-lg overflow-hidden`}
            >
              <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
              >
                <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
                  Let's make a <span className='text-red-600'>change.</span>
                </h2>
                <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
                  Sign up with Project Truth to get access to amazing features.
                </p>
              </Vortex>
            </motion.div>
          }
        </AnimatePresence>
        <Outlet />
      </div>
    </>
  )
}

export default Auth
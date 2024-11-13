import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FloatingDock } from '../components/Docker'
import HomeIcon from '../assets/HomeIcon';
import AccountSettings from '../assets/AccountSettings';
import ActionKeyIcon from '../assets/ActionKeyIcon';
import TimelineIcon from '../assets/TimelineIcon';
import AnalyticsIcon from '../assets/AnalyticsIcon';
import TruthLogo from "../assets/truth-dark.svg";
import { Switch } from '@nextui-org/react';
import { useTheme } from "next-themes";
import { SunIcon } from '../assets/SunIcon';
import { MoonIcon } from '../assets/MoonIcon';
import { useNavigate } from 'react-router-dom';
import ReloadIcon from '../assets/ReloadIcon';

const User = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const links = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/home",
    },
  
    {
      title: "Analytics",
      icon: (
        <AnalyticsIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/analytics",
    },
    {
      title: "Timeline",
      icon: (
        <TimelineIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/timeline",
    },
    {
      title: "Action",
      icon: (
        <ActionKeyIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/action",
    },
    {
      title: "Settings",
      icon: (
        <AccountSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/settings",
    },
  ];
    
  return (
    <div>
      <div className="absolute bottom-0 left-0 bg-gray-100 dark:bg-neutral-900 rounded-tr-3xl w-[35%] h-12 sm:w-[10%] sm:h-14 flex justify-center align-middle items-center gap-1">
        <div className="flex justify-center align-bottom items-center gap-2 pr-1 cursor-pointer active:scale-90 transition-all" onClick={() => navigate('/')}>
          <img src={TruthLogo} alt="Truth Logo" className="w-auto h-8 sm:h-6" />
          <p className="font-bold text-inherit hidden sm:block">TRUTH</p>
        </div>
        <Switch
          className='block sm:hidden'
          defaultSelected
          size="sm"
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
        <div className='cursor-pointer block sm:hidden' onClick={() => window.location.reload(false)}><ReloadIcon className="h-8 w-8 text-neutral-500 dark:text-neutral-300" /></div>
      </div>
      <div className='absolute bottom-0 right-0 bg-gray-100 dark:bg-neutral-900 rounded-tl-3xl w-[10%] h-14 hidden sm:block'>
        <div className='flex justify-center align-middle items-center gap-2 w-full h-full'>
          <Switch
            defaultSelected
            size="sm"
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
          <div className='cursor-pointer' onClick={() => window.location.reload(false)}><ReloadIcon className="h-8 w-8 text-neutral-500 dark:text-neutral-300" /></div>
        </div>
      </div>
      <FloatingDock items={links} desktopClassName="absolute bottom-2 left-1/2 -translate-x-1/2" mobileClassName="absolute bottom-2 right-2" />
      <Outlet />
    </div>
  )
}

export default User
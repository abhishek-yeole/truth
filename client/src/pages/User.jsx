import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [links, setLinks] = useState([
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-red-500" />
      ),
      href: "/user/home",
      bgColor: "bg-red-500/20 shadow-red-500/40",
      active: false,
    },
  
    {
      title: "Analytics",
      icon: (
        <AnalyticsIcon className="h-full w-full text-blue-500" />
      ),
      href: "/user/analytics",
      bgColor: "bg-blue-500/20 shadow-blue-500/40",
      active: false,
    },
    {
      title: "Timeline",
      icon: (
        <TimelineIcon className="h-full w-full text-green-500" />
      ),
      href: "/user/timeline",
      bgColor: "bg-green-500/20 shadow-green-500/40",
      active: false,
    },
    {
      title: "Action",
      icon: (
        <ActionKeyIcon className="h-full w-full text-orange-500" />
      ),
      href: "/user/action",
      bgColor: "bg-orange-500/20 shadow-orange-500/40",
      active: false,
    },
    {
      title: "Settings",
      icon: (
        <AccountSettings className="h-full w-full text-violet-500" />
      ),
      href: "/user/settings",
      bgColor: "bg-violet-500/20 shadow-violet-500/40",
      active: false,
    },
  ]);

  const updateActiveLinks = () => {
    const updatedLinkItems = links.map(item => ({
      ...item,
      active: item.href === location.pathname,
    }));
    setLinks(updatedLinkItems);
  };

  useEffect(() => {
    updateActiveLinks();
  }, [location.pathname]);
    
  return (
    <>
      <div className="fixed bottom-0 z-50 left-0 bg-gray-100 dark:bg-neutral-800 rounded-tr-3xl w-[35%] h-12 sm:w-[10%] sm:h-14 flex justify-center align-middle items-center gap-1">
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
      <div className='fixed bottom-0 z-50 right-0 bg-gray-100 dark:bg-neutral-800 rounded-tl-3xl w-[10%] h-14 hidden sm:block'>
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
      <FloatingDock items={links} desktopClassName="z-50 fixed bottom-2 left-1/2 -translate-x-1/2" mobileClassName="z-50 fixed bottom-2 right-2" />
      <Outlet />
    </>
  )
}

export default User
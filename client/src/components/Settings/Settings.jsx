import React, { useEffect } from 'react';
import { replace, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Profile from './Profile';
import Security from './Security';
import Permissions from './Permissions';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollShadow } from '@nextui-org/react';
import { ProfileIcon } from '../../assets/ProfileIcon';
import { PermissionIcon } from '../../assets/PermissionIcon';
import { SecurityIcon } from '../../assets/SecurityIcon';

const Settings = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    if (location.pathname === "/user/settings/" || location.pathname === "/user/settings") navigateTo("/user/settings/profile", replace);
    setTabs([
      {
        label: "Profile",
        href: "/user/settings/profile",
        icon: (
          <ProfileIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Profile />,
        active: location.pathname === "/user/settings" || location.pathname === "/user/settings/" || location.pathname.includes("/profile") ? true : false,
      },
      {
        label: "Permissions",
        href: "/user/settings/permissions",
        icon: (
          <PermissionIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Permissions />,
        active: location.pathname.includes("/permissions") ? true : false,
      },
      {
        label: "Security",
        href: "/user/settings/security",
        icon: (
          <SecurityIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Security />,
        active: location.pathname.includes("/security") ? true : false,
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {tabs.map((tab, index) => (
        <AnimatePresence key={index}>
          {tab.active && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <ScrollShadow hideScrollBar size={50} className="flex flex-col gap-2 flex-1 w-full h-[90vh] overflow-auto">
                {tab.element}
              </ScrollShadow>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  )
}

export default Settings
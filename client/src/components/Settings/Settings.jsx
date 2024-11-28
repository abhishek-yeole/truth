import React, { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
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
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    setTabs([
      {
        label: "Profile",
        href: "#profile",
        icon: (
          <ProfileIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Profile />,
        active: location.hash === '' || location.hash === "#profile" ? true : false,
      },
      {
        label: "Permissions",
        href: "#permissions",
        icon: (
          <PermissionIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Permissions />,
        active: location.hash === "#permissions" ? true : false,
      },
      {
        label: "Security",
        href: "#security",
        icon: (
          <SecurityIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Security />,
        active: location.hash === "#security" ? true : false,
      },
    ]);
  }, []);

  return (
    <div>
      <p>Settings</p>
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
    </div>
  )
}

export default Settings
import React, { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import SaerchBy from './SaerchBy';
import Personal from './Personal';
import Global from './Global';
import Charts from './Charts';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollShadow } from '@nextui-org/react';
import { PersonalIcon } from '../../assets/PersonalIcon';
import SearchIcon from '../../assets/SearchIcon';
import { GlobeIcon } from '../../assets/GlobeIcon';
import { ChartIcon } from '../../assets/ChartIcon';

const Analytics = () => {
  const location = useLocation();
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    setTabs([
      {
        label: "Personal",
        href: "#personal",
        icon: (
          <PersonalIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Personal />,
        active: location.hash === '' || location.hash === "#personal" ? true : false,
      },
      {
        label: "Search By",
        href: "#searchby",
        icon: (
          <SearchIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <SaerchBy />,
        active: location.hash === "#searchby" ? true : false,
      },
      {
        label: "Global",
        href: "#global",
        icon: (
          <GlobeIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Global />,
        active: location.hash === "#global" ? true : false,
      },
      {
        label: "Charts",
        href: "#charts",
        icon: (
          <ChartIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Charts />,
        active: location.hash === "#charts" ? true : false,
      },
    ]);
  }, []);

  return (
    <div>
      <p>Analytics</p>
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

export default Analytics
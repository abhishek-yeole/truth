import React, { useEffect } from 'react';
import { replace, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Main from './Main';
import News from './News';
import Trending from './Trending';
import { HomeMain } from '../../assets/HomeMain';
import { NewsIcon } from '../../assets/NewsIcon';
import { TrendingIcon } from '../../assets/TrendingIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollShadow } from '@nextui-org/react';

const Home = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    if (location.pathname === "/user/home/" || location.pathname === "/user/home") navigateTo("/user/home/main", replace);
    setTabs([
      {
        label: "Main",
        href: "/user/home/main",
        icon: (
          <HomeMain className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Main />,
        active: location.pathname === "/user/home" || location.pathname === "/user/home/" || location.pathname.includes("/main") ? true : false,
      },
      {
        label: "News",
        href: "/user/home/news",
        icon: (
          <NewsIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <News />,
        active: location.pathname.includes("/news") ? true : false,
      },
      {
        label: "Trending",
        href: "/user/home/trending",
        icon: (
          <TrendingIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Trending />,
        active: location.pathname.includes("/trending") ? true : false,
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

export default Home
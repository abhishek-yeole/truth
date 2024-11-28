import React, { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
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
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    setTabs([
      {
        label: "Main",
        href: "#main",
        icon: (
          <HomeMain className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Main />,
        active: location.hash === '' || location.hash === "#main" ? true : false,
      },
      {
        label: "News",
        href: "#news",
        icon: (
          <NewsIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <News />,
        active: location.hash === "#news" ? true : false,
      },
      {
        label: "Trending",
        href: "#trending",
        icon: (
          <TrendingIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Trending />,
        active: location.hash === "#trending" ? true : false,
      },
    ]);
  }, []);

  return (
    <div>
      <p>Home</p>
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

export default Home
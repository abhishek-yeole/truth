import React, { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import Explore from './Explore';
import Popular from './Popular';
import NearBy from './NearBy';
import MyCommunites from './MyCommunites';
import MyPosts from './MyPosts';
import SavedHistory from './SavedHistory';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollShadow } from '@nextui-org/react';
import { TrendingIcon } from '../../assets/TrendingIcon';
import { ExploreIcon } from '../../assets/ExploreIcon';
import { NearbyIcon } from '../../assets/NearbyIcon';
import { CommunityIcon } from '../../assets/CommunityIcon';
import { MyPostIcon } from '../../assets/MyPostIcon';
import { SavedIcon } from '../../assets/SavedIcon';

const Community = () => {
  const location = useLocation();
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    setTabs([
      {
        label: "Explore",
        href: "#explore",
        icon: (
          <ExploreIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Explore />,
        active: location.hash === '' || location.hash === "#explore" ? true : false,
      },
      {
        label: "Popular",
        href: "#popular",
        icon: (
          <TrendingIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Popular />,
        active: location.hash === "#popular" ? true : false,
      },
      {
        label: "NearBy",
        href: "#nearby",
        icon: (
          <NearbyIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <NearBy />,
        active: location.hash === "#nearby" ? true : false,
      },
      {
        label: "My Communities",
        href: "#mycommunities",
        icon: (
          <CommunityIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <MyCommunites />,
        active: location.hash === "#mycommunities" ? true : false,
      },
      {
        label: "My Posts",
        href: "#myposts",
        icon: (
          <MyPostIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <MyPosts />,
        active: location.hash === "#myposts" ? true : false,
      },
      {
        label: "Saved History",
        href: "#savedhistory",
        icon: (
          <SavedIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <SavedHistory />,
        active: location.hash === "#savedhistory" ? true : false,
      },
    ]);
  }, []);

  return (
    <div>
      <p>Community</p>
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

export default Community
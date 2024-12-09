import React, { useEffect } from 'react';
import { replace, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
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
  const navigateTo = useNavigate();
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    if (location.pathname === "/user/community/" || location.pathname === "/user/community") navigateTo("/user/community/explore", replace);
    setTabs([
      {
        label: "Explore",
        href: "/user/community/explore",
        icon: (
          <ExploreIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Explore />,
        active: location.pathname === "/user/community" || location.pathname === "/user/community/" || location.pathname.includes("/explore") ? true : false,
      },
      {
        label: "Popular",
        href: "/user/community/popular",
        icon: (
          <TrendingIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Popular />,
        active: location.pathname.includes("/popular") ? true : false,
      },
      {
        label: "NearBy",
        href: "/user/community/nearby",
        icon: (
          <NearbyIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <NearBy />,
        active: location.pathname.includes("/nearby") ? true : false,
      },
      {
        label: "My Communities",
        href: "/user/community/mycommunities",
        icon: (
          <CommunityIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <MyCommunites />,
        active: location.pathname.includes("/mycommunities") ? true : false,
      },
      {
        label: "My Posts",
        href: "/user/community/myposts",
        icon: (
          <MyPostIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <MyPosts />,
        active: location.pathname.includes("/myposts") ? true : false,
      },
      {
        label: "Saved History",
        href: "/user/community/saved",
        icon: (
          <SavedIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <SavedHistory />,
        active: location.pathname.includes("/saved") ? true : false,
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

export default Community
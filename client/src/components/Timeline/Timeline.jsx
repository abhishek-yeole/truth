import React, { useEffect } from 'react';
import { replace, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Main from './Main';
import UpdateIssue from './UpdateIssue';
import ReportIssue from './ReportIssue';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollShadow } from '@nextui-org/react';
import TimelineIcon from '../../assets/TimelineIcon';
import { UpdateIcon } from '../../assets/UpdateIcon';
import { ReportIcon } from '../../assets/ReportIcon';

const Timeline = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    if (location.pathname === "/user/timeline/" || location.pathname === "/user/timeline") navigateTo("/user/timeline/main", replace);
    setTabs([
      {
        label: "Main",
        href: "/user/timeline/main",
        icon: (
          <TimelineIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Main />,
        active: location.pathname === "/user/timeline" || location.pathname === "/user/timeline/" || location.pathname.includes("/main") ? true : false,
      },
      {
        label: "Update Issue",
        href: "/user/timeline/update",
        icon: (
          <UpdateIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <UpdateIssue />,
        active: location.pathname.includes("/update") ? true : false,
      },
      {
        label: "Report Issue",
        href: "/user/timeline/report",
        icon: (
          <ReportIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <ReportIssue />,
        active: location.pathname.includes("/report") ? true : false,
      },
    ]);
  }, []);

  return (
    <div>
      <p>Timeline</p>
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

export default Timeline
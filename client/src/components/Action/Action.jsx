import React, { useEffect } from 'react';
import { Outlet, replace, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Main from './Main';
import ReportIssues from './ReportIssues';
import EditIssues from './EditIssues';
import AddIssues from './AddIssues';
import MyIssues from './MyIssues';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollShadow } from '@nextui-org/react';
import { ThunderIcon } from '../../assets/ThunderIcon';
import { PersonalIssueIcon } from '../../assets/PersonalIssueIcon';
import { AddIcon } from '../../assets/AddIcon';
import { EditIcon } from '../../assets/EditIcon';
import { ReportIcon } from '../../assets/ReportIcon';

const Action = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    if (location.pathname === "/user/action/" || location.pathname === "/user/action") navigateTo("/user/action/main", replace);
    setTabs([
      {
        label: "Main",
        href: "/user/action/main",
        icon: (
          <ThunderIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Main />,
        active: location.pathname === "/user/action" || location.pathname === "/user/action/" || location.pathname.includes("/main") ? true : false,
      },
      {
        label: "My Issues",
        href: "/user/action/myissues",
        icon: (
          <PersonalIssueIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <MyIssues />,
        active: location.pathname.includes("/myissues") ? true : false,
      },
      {
        label: "Add Issue",
        href: "/user/action/add",
        icon: (
          <AddIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <AddIssues />,
        active: location.pathname.includes("/add") ? true : false,
      },
      {
        label: "Edit Issue",
        href: "/user/action/edit",
        icon: (
          <EditIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <EditIssues />,
        active: location.pathname.includes("/edit") ? true : false,
      },
      {
        label: "Report Issue",
        href: "/user/action/report",
        icon: (
          <ReportIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <ReportIssues />,
        active: location.pathname.includes("/report") ? true : false,
      },
    ]);
  }, [location.pathname]);

  return (
    <div className="flex flex-col gap-2">
      {tabs.map((tab, index) => (
        <AnimatePresence key={index}>
          {tab.active && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
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

export default Action
import React, { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
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
  const { tabs, setTabs } = useOutletContext();

  useEffect(() => {
    setTabs([
      {
        label: "Main",
        href: "#main",
        icon: (
          <ThunderIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <Main />,
        active: location.hash === '' || location.hash === "#main" ? true : false,
      },
      {
        label: "My Issues",
        href: "#myissues",
        icon: (
          <PersonalIssueIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <MyIssues />,
        active: location.hash === "#myissues" ? true : false,
      },
      {
        label: "Add Issue",
        href: "#addissue",
        icon: (
          <AddIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <AddIssues />,
        active: location.hash === "#addissue" ? true : false,
      },
      {
        label: "Edit Issue",
        href: "#editissue",
        icon: (
          <EditIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <EditIssues />,
        active: location.hash === "#editissue" ? true : false,
      },
      {
        label: "Report Issue",
        href: "#reportissue",
        icon: (
          <ReportIcon className="dark:text-purple-200 h-5 w-5 flex-shrink-0 transition-all" />
        ),
        element: <ReportIssues />,
        active: location.hash === "#reportissue" ? true : false,
      },
    ]);
  }, []);

  return (
    <div>
      <p>Action</p>
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

export default Action
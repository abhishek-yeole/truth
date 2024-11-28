import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FloatingDock } from "../components/ui/Docker";
import { SidebarMain } from "../components/SidebarMain";
import HomeIcon from "../assets/HomeIcon";
import AccountSettings from "../assets/AccountSettings";
import ActionKeyIcon from "../assets/ActionKeyIcon";
import TimelineIcon from "../assets/TimelineIcon";
import AnalyticsIcon from "../assets/AnalyticsIcon";
import { CommunityIcon } from "../assets/CommunityIcon";

export default function User () {
  const location = useLocation();
  const [tabs, setTabs] = useState([]);
  const [links, setLinks] = useState([
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-red-500" />
      ),
      href: "/user/home",
      bgColor: "bg-red-500/20 shadow-red-500/40",
      active: false,
    },
  
    {
      title: "Analytics",
      icon: (
        <AnalyticsIcon className="h-full w-full text-blue-500" />
      ),
      href: "/user/analytics",
      bgColor: "bg-blue-500/20 shadow-blue-500/40",
      active: false,
    },
    {
      title: "Timeline",
      icon: (
        <TimelineIcon className="h-full w-full text-green-500" />
      ),
      href: "/user/timeline",
      bgColor: "bg-green-500/20 shadow-green-500/40",
      active: false,
    },
    {
      title: "Action",
      icon: (
        <ActionKeyIcon className="h-full w-full text-orange-500" />
      ),
      href: "/user/action",
      bgColor: "bg-orange-500/20 shadow-orange-500/40",
      active: false,
    },
    {
      title: "Community",
      icon: (
        <CommunityIcon className="h-full w-full text-cyan-500" />
      ),
      href: "/user/community",
      bgColor: "bg-cyan-500/20 shadow-cyan-500/40",
      active: false,
    },
    {
      title: "Settings",
      icon: (
        <AccountSettings className="h-full w-full text-fuchsia-500" />
      ),
      href: "/user/settings",
      bgColor: "bg-fuchsia-500/20 shadow-fuchsia-500/40",
      active: false,
    },
  ]);

  const updateActiveLinks = () => {
    const updatedLinkItems = links.map(item => ({
      ...item,
      active: item.href === location.pathname,
    }));
    setLinks(updatedLinkItems);
  };

  useEffect(() => {
    updateActiveLinks();
  }, [location.pathname]);
    
  return (
    <>
      <FloatingDock items={links} desktopClassName="z-[49] fixed bottom-2 left-1/2 -translate-x-1/2" mobileClassName="z-50 fixed bottom-2 right-2" />
      <div className="h-screen">
        <SidebarMain content={<Outlet context={{ tabs, setTabs }} />} tabs={tabs} setTabs={setTabs}/>
      </div>
    </>
  )
}
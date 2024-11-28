import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/Siderbar";
import { Switch, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useGlobalContext } from "../contexts/GlobalContext";
import TruthLogo from "../assets/truth-dark.svg";
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";
import { LogoutIcon } from "../assets/LogoutIcon";
import { cn } from "./ui/cn";
import MenuIcon from "../assets/MenuIcon";

export function SidebarMain({ content, tabs, setTabs }) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useGlobalContext();

  const [open, setOpen] = useState(false);
  return (
    (<div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-full flex-1 mx-auto overflow-hidden",
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10" mobileContent={
          <div className="flex justify-between z-20 w-full">
            <div className="flex justify-center align-middle items-center mr-4 gap-2">
              <img src={TruthLogo} alt="Truth Logo" className="w-auto h-8" />
              <p className="font-bold text-inherit transition-all">TRUTH</p>
            </div>
            <div className="flex items-center gap-3">  
              <Switch
                defaultSelected
                size="sm"
                color="primary"
                thumbIcon={({ isSelected, className }) =>
                  !isSelected ? (
                    <SunIcon className={className} />
                  ) : (
                    <MoonIcon className={className} />
                  )
                }
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                  } else if (theme === "dark") {
                    setTheme("light");
                  }
                }}
              />
              <Dropdown backdrop="opaque">
                <DropdownTrigger>
                  <div className="p-2">
                    <MenuIcon className="text-neutral-800 dark:text-neutral-200" />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="w-full flex-col h-fit py-1 justify-start"
                  >
                    <p className="font-semibold">
                      Signed in as &nbsp;
                      <span className="font-bold text-red-600">{user.result.name}</span>
                    </p>
                    <p>{user.result.email}</p>
                  </DropdownItem>
    
                  {tabs.map((tab, index) => (
                    <DropdownItem
                      key={index}
                      as="a"
                      href={tab.href}
                      onClick={() => setTabs((prev) => prev.map((t) => t.href === tab.href ? { ...t, active: true } : { ...t, active: false }))}
                      startContent={tab.icon}
                      className={`flex flex-row items-center gap-2 ${tab.active && "bg-violet-600/40"}`}
                      color={tab.active && "secondary"}
                    >
                      <span>{tab.label}</span>
                    </DropdownItem>
                  ))}
    
                  <DropdownItem key="logout" color="danger" onClick={() => logout()} startContent={<LogoutIcon className="text-xl" />}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        }>
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <SidebarLink link={{
                label: user.result.name,
                href: "#",
                icon: (
                  <img
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    className="h-8 w-8  rounded-full transition-all"
                    width={32}
                    height={32}
                    alt="Avatar" />
                ),
              }}
            />
            <div className="mt-8 flex flex-col gap-2">
              {tabs.map((tab, idx) => (
                <SidebarLink className={`${tab.active && 'bg-fuchsia-600/70 font-semibold'} px-1 rounded-lg transition-all`} key={idx} link={tab} onClick={() => setTabs((prev) => prev.map((t) => t.href === tab.href ? { ...t, active: true } : { ...t, active: false }))} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <SidebarLink link={{
                label: "Theme",
                href: "#",
                icon: (
                  <Switch
                    defaultSelected
                    size="sm"
                    color="primary"
                    thumbIcon={({ isSelected, className }) =>
                      !isSelected ? (
                        <SunIcon className={className} />
                      ) : (
                        <MoonIcon className={className} />
                      )
                    }
                    onClick={() => {
                      if (theme === "light") {
                        setTheme("dark");
                      } else if (theme === "dark") {
                        setTheme("light");
                      }
                    }}
                  />
                ),
              }}
            />
            <SidebarLink className="rounded-lg hover:bg-red-600/40 transition-all"
              onClick={() => logout()}
              link={{
                label: "Logout",
                href: "#",
                icon: (
                  <LogoutIcon className="flex-shrink-0 transition-all w-8 h-8 text-neutral-600 dark:text-neutral-300" />
                ),
              }}
            />
            <SidebarLink link={{
                label: "Truth",
                href: "/",
                icon: (
                  <img
                    src={TruthLogo}
                    className="h-8 w-8 flex-shrink-0 transition-all"
                    width={32}
                    height={32}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard content={content}/>
    </div>)
  );
}

const Dashboard = ({ content }) => {
  return (
    (<div className="flex flex-1">
      {<div className="transition-all p-3 md:p-5 rounded-t-2xl sm:rounded-bl-2xl sm:rounded-tr-none border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto">
        {content}
      </div>}
    </div>)
  );
};
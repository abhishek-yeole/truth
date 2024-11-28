import { Autocomplete, AutocompleteItem, Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Switch, Popover, PopoverTrigger, PopoverContent, Avatar, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu} from "@nextui-org/react";
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";
import { useTheme } from "next-themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TruthLogo from "../assets/truth-dark.svg";
import SearchIcon from "../assets/SearchIcon";
import ChevronDown from '../assets/ChevronDown';
import ActionKeyIcon from '../assets/ActionKeyIcon';
import TimelineIcon from '../assets/TimelineIcon';
import AnalyticsIcon from '../assets/AnalyticsIcon';
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FloatingDock } from "./ui/Docker";
import { AnimatePresence, motion } from "framer-motion";
import ShareIcon from "../assets/ShareIcon";
import GithubIcon from "../assets/GithubIcon";
import TwitterIcon from "../assets/TwitterIcon";
import InstagramIcon from "../assets/InstagramIcon";
import CopyIcon from "../assets/CopyIcon";
import toast from "react-hot-toast";

const NavbarMain = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { label: "About", href: "/about", active: false },
    { label: "How it works?", href: "/working", active: false },
    { label: "Inspiration", href: "/inspiration", active: false },
  ]);

  const updateActiveMenu = () => {
    const updatedMenuItems = menuItems.map(item => ({
      ...item,
      active: item.href === location.pathname,
    }));
    setMenuItems(updatedMenuItems);
  };

  useEffect(() => {
    updateActiveMenu();
  }, [location.pathname]);

  const search = [
    {label: "About", value: "about", link: "./about"},
    {label: "How it works ?", value: "working", link: "./working"},
    {label: "Inspiration", value: "inspiration", link: "./inspiration"},
    {label: "FAQ's", value: "faqs", link: "./working#faqs"},
    {label: "Feedback", value: "feedback", link: "./#feedback"},
    {label: "Data Policy", value: "dataPolicy", link: "./working#data-policy"},
    {label: "Data Sharing", value: "dataSharing", link: "./working#data-sharing"},
    {label: "Analytics", value: "analytics", link: "./analytics"},
    {label: "Settings", value: "settings", link: "./settings"},
  ];

  const links = [
    {
      title: "Github",
      icon: (
        <GithubIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/abhishek-yeole/truth",
      target: "_blank",
      bgColor: "bg-neutral-200/20",
      active: true,
    },
  
    {
      title: "Twitter",
      icon: (
        <TwitterIcon className="h-full w-full text-blue-500" />
      ),
      href: "https://twitter.com/intent/tweet?text=Check out this website: https://truth-gnec.vercel.app",
      target: "_blank",
      bgColor: "bg-blue-500/20",
      active: true,
    },
    {
      title: "Instagram",
      icon: (
        <InstagramIcon className="h-full w-full text-fuchsia-500" />
      ),
      href: "https://instagram.com/",
      target: "_blank",
      bgColor: "bg-fuchsia-500/20",
      active: true,
    },
    {
      title: "Copy",
      icon: (
        <CopyIcon className="h-full w-full text-green-500" />
      ),
      href: "copy",
      bgColor: "bg-green-200/20",
      active: true,
    }
  ];

  const handleSelect = (value) => {
    const selectedItem = search.find((item) => item.value === value);
    if (selectedItem) {
      navigate(selectedItem.link);
    }
  };

  const [hovered, setHovered] = useState(false);
  
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <Link to="/" aria-current="page">
          <NavbarBrand className="flex mr-4 gap-2">
            <img src={TruthLogo} alt="Truth Logo" className="w-auto h-10 sm:h-8" />
            <p className="font-bold text-inherit transition-all">TRUTH</p>
          </NavbarBrand>
        </Link>
        
        <NavbarContent className="hidden sm:flex gap-5">
          {menuItems.map((item, index) => (
            <NavbarItem key={index} className="active:scale-90 hover:scale-110 transition-all">
              <Link to={item.href} aria-current="page" className={`${item.active && "text-blue-600 hover:text-blue-800"} hover:text-blue-600 hover:underline hover:underline-offset-8 font-semibold transition-all`}>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
          <Dropdown>
            <NavbarItem className="transition-all">
              <DropdownTrigger className="flex justify-center items-center">
                <p className="cursor-pointer active:scale-90 hover:scale-110 hover:text-blue-600 hover:underline hover:underline-offset-8 font-semibold transition-all">
                  Features<span><ChevronDown /></span>
                </p>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Truth features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="analytics"
                description="Real-time metrics to debug issues. Slow query added? We'll show you exactly where."
                startContent={<AnalyticsIcon className="w-8 h-8"/>}
                onPress={() => navigate("/user/analytics")}
                color="primary"
              >
                Analytics
              </DropdownItem>
              <DropdownItem
                key="action"
                description="ACME scales apps to meet user demand, automagically, based on load."
                startContent={<ActionKeyIcon className="w-8 h-8"/>}
                onPress={() => navigate("/user/action")}
                color="primary"
              >
                Action
              </DropdownItem>
              <DropdownItem
                key="timeline"
                description="ACME runs on ACME, join us and others serving requests at web scale."
                startContent={<TimelineIcon className="w-8 h-8"/>}
                onPress={() => navigate("/user/timeline")}
                color="primary"
              >
                Timeline
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Autocomplete 
          aria-label="search"
          placeholder="Type to search..."
          size="md"
          className="max-w-xs hidden sm:block"
          startContent={<SearchIcon size={18} />} 
          onSelectionChange={handleSelect}
        >
          {search.map((search) => (
            <AutocompleteItem key={search.value} value={search.value}>
              {search.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="group rounded-full ring-2 ring-indigo-500 w-8 h-8 flex justify-center items-center" onMouseEnter={() => setHovered(true)}  onMouseLeave={() => setHovered(false)}>
          <ShareIcon />
          <div className="absolute -bottom-30 sm:-bottom-16 hidden group-hover:block">
            <div className="sm:pt-5 pt-64">
              <FloatingDock items={links} mobileClassName="hidden" />
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    layoutId="nav"
                    className="relative flex flex-col gap-2 sm:hidden">
                    {links.map((item, idx) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                          transition: {
                            delay: idx * 0.05,
                          },
                        }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {item.href === "copy" ? (
                          <div
                            key={item.title}
                            className="h-12 w-12 rounded-full bg-gray-100 dark:bg-neutral-900 flex items-center justify-center cursor-pointer"
                            onClick={() => { navigator.clipboard.writeText("https://truth-gnec.vercel.app"); toast.success("Copied to Clipboard");}}
                          >
                            <div className="h-4 w-4">{item.icon}</div>
                          </div>
                        ) : (<>
                          {item.target ? (
                            <Link
                              to={item.href}
                              key={item.title}
                              className={`h-12 w-12 rounded-full ${ item.active ? item.bgColor : "bg-gray-100 dark:bg-neutral-800" } flex items-center justify-center`}
                              target="_blank"
                            >
                              <div className="h-4 w-4">{item.icon}</div>
                            </Link>
                          ) : (
                            <Link
                              to={item.href}
                              key={item.title}
                              className={`h-12 w-12 rounded-full ${ item.active ? item.bgColor : "bg-gray-100 dark:bg-neutral-800" } flex items-center justify-center`}
                            >
                              <div className="h-4 w-4">{item.icon}</div>
                            </Link>
                          )}</>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
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
        <Popover placement="bottom" backdrop="opaque">
          <PopoverTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="danger"
              name="User"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </PopoverTrigger>
          <PopoverContent aria-label="Profile Actions" variant="flat">
            {user ? (
              <>
                <Button variant="light" size="sm" key="profile" className="w-full flex-col h-fit py-1 justify-start">
                  <p className="font-semibold">Signed in as &nbsp;<span className="font-bold text-red-600">{user.result.name}</span></p>
                  <p>{user.result.email}</p>
                </Button>
                <Button variant="light" size="sm" key="settings" className="w-full justify-start" onClick={() => navigate('/user/settings')}>My Settings</Button>
                <Button variant="light" size="sm" key="analytics" className="w-full justify-start"  onClick={() => navigate('/user/analytics')}>Analytics</Button>
                <Button variant="light" size="sm" key="general" className="w-full justify-start"  onClick={() => navigate('/general')}>General</Button>
                <Button variant="light" size="sm" key="help_and_feedback" className="w-full justify-start"  onClick={() => navigate('./#feeback')}>Help & Feedback</Button>
                <Button variant="light" size="sm" key="logout" color="danger" className="w-full justify-start" onClick={() => logout()}>Log Out</Button>
              </>
            ) : (
              <>
                <Button variant="light" color="primary" size="lg" key="login" className="w-full justify-start" onPress={() => navigate('/auth/login')}>Login</Button>
                <Button variant="light" color="secondary" size="lg" key="register" className="w-full justify-start" onPress={() => navigate('/auth/register')}>Register</Button>
              </>
            )}
            <Autocomplete 
              aria-label="search"
              placeholder="Type to search..."
              size="md"
              className="max-w block sm:hidden"
              startContent={<SearchIcon size={18} />} 
              onSelectionChange={handleSelect}
            >
              {search.map((search) => (
                <AutocompleteItem key={search.value} value={search.value}>
                  {search.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </PopoverContent>
        </Popover>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className={`${item.active && "text-blue-600 hover:text-blue-800"}`}
              to={item.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <Dropdown>
          <NavbarItem key="features" className="transition-all">
            <DropdownTrigger >
              <p className="cursor-pointer">
                Features<span><ChevronDown /></span>
              </p>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Truth features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="analytics"
              description="Real-time metrics to debug issues. Slow query added? We'll show you exactly where."
              startContent={<AnalyticsIcon className="w-8 h-8"/>}
              onPress={() => navigate("/user/analytics")}
              color="primary"
            >
              Analytics
            </DropdownItem>
            <DropdownItem
              key="action"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={<ActionKeyIcon className="w-8 h-8"/>}
              onPress={() => navigate("/user/action")}
              color="primary"
            >
              Action
            </DropdownItem>
            <DropdownItem
              key="timeline"
              description="ACME runs on ACME, join us and others serving requests at web scale."
              startContent={<TimelineIcon className="w-8 h-8"/>}
              onPress={() => navigate("/user/timeline")}
              color="primary"
            >
              Timeline
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarMain;
import { Autocomplete, AutocompleteItem, Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Input, Switch, Popover, PopoverTrigger, PopoverContent, Avatar, Button} from "@nextui-org/react";
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";
import { useTheme } from "next-themes";
import { Link, useNavigate } from "react-router-dom";
import TruthLogo from "../assets/truth-dark.svg";
import SearchIcon from "../assets/SearchIcon";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

const NavbarMain = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useGlobalContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "About", href: "./about" },
    { label: "How it works?", href: "./working" },
    { label: "Inspiration", href: "./inspiration" },
  ];

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

  const handleSelect = (value) => {
    const selectedItem = search.find((item) => item.value === value);
    if (selectedItem) {
      navigate(selectedItem.link);
    }
  };
  
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
              <Link to={item.href} aria-current="page" className="hover:text-red-600 hover:underline hover:underline-offset-8 font-semibold transition-all">
                {item.label}
              </Link>
            </NavbarItem>
          ))}
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
              name="Jason Hughes"
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
                <Button variant="light" color="primary" size="lg" key="login" className="w-full justify-start" onClick={() => navigate('/auth/login')}>Login</Button>
                <Button variant="light" color="secondary" size="lg" key="register" className="w-full justify-start" onClick={() => navigate('/auth/register')}>Register</Button>
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
              className="w-full"
              to={item.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarMain;
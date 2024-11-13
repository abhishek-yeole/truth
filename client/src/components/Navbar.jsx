import {Autocomplete, AutocompleteItem, Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Input, Switch, Popover, PopoverTrigger, PopoverContent, Avatar, Button} from "@nextui-org/react";
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";
import { useTheme } from "next-themes";
import { Link, useNavigate } from "react-router-dom";
import TruthLogo from "../assets/truth-dark.svg";
import SearchIcon from "../assets/SearchIcon";
import { useState } from "react";

export const menuItems = [
  { label: "About", href: "./about" },
  { label: "How it works?", href: "./working" },
  { label: "Inspiration", href: "./inspiration" },
];

export const search = [
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

const NavbarMain = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <p className="font-bold text-inherit">TRUTH</p>
          </NavbarBrand>
        </Link>
        <NavbarContent className="hidden sm:flex gap-5">
          <NavbarItem>
            <Link to="./about" aria-current="page" className="hover:text-red-600 hover:border-b-1 hover:border-red-600 hover:shadow-lg hover:shadow-red-600 font-semibold active:scale-90 transition-all">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="./working" aria-current="page" className="hover:text-red-600 hover:border-b-1 hover:border-red-600 hover:shadow-lg hover:shadow-red-600 font-semibold active:scale-90 transition-all">
              How it works ?
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="./inspiration" aria-current="page" className="hover:text-red-600 hover:border-b-1 hover:border-red-600 hover:shadow-lg hover:shadow-red-600 font-semibold active:scale-90 transition-all">
              Inspiration
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Autocomplete 
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
            <Button variant="light" size="sm" key="profile" className="w-full justify-start">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </Button>
            <Button variant="light" size="sm" key="settings" className="w-full justify-start">My Settings</Button>
            <Button variant="light" size="sm" key="analytics" className="w-full justify-start">Analytics</Button>
            <Button variant="light" size="sm" key="system" className="w-full justify-start">System</Button>
            <Button variant="light" size="sm" key="configurations" className="w-full justify-start">Configurations</Button>
            <Button variant="light" size="sm" key="help_and_feedback" className="w-full justify-start">Help & Feedback</Button>
            <Button variant="light" size="sm" key="logout" color="danger" className="w-full justify-start">
              Log Out
            </Button>
            <Autocomplete 
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
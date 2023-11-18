/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Navbar as NavbarNext,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  ButtonGroup,
  User,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';

import { useDarkMode } from 'usehooks-ts';

import {
  BsFillChatLeftDotsFill,
  BsClockFill,
  BsArrowRightCircle,
  BsFillGearFill,
  BsFillFilterSquareFill,
  BsRobot
} from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { dictionary } from '@/utils/constants/dictionary';

export default function Navbar() {
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out'
  ];
  // const { toggle, isDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavbarNext
      className="bg-transparent"
      maxWidth="full"
      height={'7rem'}
      position="static"
      disableAnimation
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">ACMasdE</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <BsRobot size={48} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" hidden sm:flex gap-4 " justify="center">
        <ButtonGroup className=" rounded-xl  shadow-md dark:border-white dark:border-1">
          <Button
            className={` w-40 h-12  ${
              location.pathname.includes('chat')
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => {
              navigate('/chat');
            }}
            startContent={<BsFillChatLeftDotsFill size={17} />}
          >
            {dictionary.az.chat}
          </Button>

          <Button
            className={`w-40 h-12  ${
              location.pathname.includes('pricing')
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => {
              navigate('/pricing');
            }}
            startContent={<BsFillFilterSquareFill size={17} />}
          >
            {dictionary.az.tariffs}
          </Button>

          <Button
            className={`w-40 h-12 ${
              location.pathname.includes('settings')
                ? 'bg-black text-white hover:bg-black'
                : 'bg-white text-black'
            }`}
            onClick={() => {
              navigate('/settings');
            }}
            startContent={<BsFillGearFill size={17} />}
          >
            {dictionary.az.settings}
          </Button>

          <Button
            className={`w-40 h-12  ${
              location.pathname.includes('history')
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => {
              navigate('/history');
            }}
            startContent={<BsClockFill size={17} />}
          >
            {dictionary.az.history}
          </Button>
        </ButtonGroup>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="bg-white  rounded-lg shadow-md p-1 px-3 md:flex gap-5 items-center justify-between	">
          <User
            name="Jane Doe"
            description="Product Designer"
            avatarProps={{
              src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
            }}
          />

          <Dropdown>
            <DropdownTrigger>
              <div>
                <BsArrowRightCircle className="cursor-pointer" size={20} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                onClick={() => {
                  localStorage.removeItem('userToken');
                  navigate('/login');
                }}
                key="logout"
              >
                {dictionary.az.logOut}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      {/* 
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              to="/f"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </NavbarNext>
  );
}

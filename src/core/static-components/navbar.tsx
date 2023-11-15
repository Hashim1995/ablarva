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
  User
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
  const { toggle, isDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavbarNext
      className="bg-transparent"
      maxWidth="full"
      height={'7rem'}
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
            Söhbət
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
            Tariflər
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
            Tənzimləmə
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
            Tariçə
          </Button>
        </ButtonGroup>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link to="/a">Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <div>
            <button onClick={toggle}>Light Mode / Dark Mode</button>
          </div>
        </NavbarItem> */}
        <NavbarItem className="bg-white dark:border-white dark:border-1 dark:bg-black rounded-lg shadow-md p-1 px-3 md:flex gap-5 items-center justify-between	">
          <User
            name="Jane Doe"
            description="Product Designer"
            avatarProps={{
              src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
            }}
          />
          <div
            role="checkbox"
            aria-checked={isDarkMode ? 'true' : 'false'}
            tabIndex={0}
            onClick={toggle}
            className={`cursor-pointer w-11 h-5 bg-black dark:bg-white rounded-full relative px-1.5 flex items-center${
              isDarkMode ? '' : ' justify-end'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full absolute transform duration-200 ease-out bg-white dark:bg-black left-0.5 ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          <BsArrowRightCircle size={20} />
        </NavbarItem>
      </NavbarContent>

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
      </NavbarMenu>
    </NavbarNext>
  );
}

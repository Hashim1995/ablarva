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
  Tooltip,
  DropdownItem,
  useDisclosure,
  Image,
  Link
} from '@nextui-org/react';

import { useDarkMode, useOnClickOutside } from 'usehooks-ts';

import {
  BsFillChatLeftDotsFill,
  BsClockFill,
  BsArrowRightCircle,
  BsFillGearFill,
  BsFillFilterSquareFill,
  BsRobot,
  BsEnvelope,
  BsYelp
} from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { dictionary } from '@/utils/constants/dictionary';
import { useState, useEffect, useRef } from 'react';
import { IMenuItemsNavbar } from '@/models/common';
import { useSelector } from 'react-redux';
import { MdAttachMoney, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';

import { FaUser } from 'react-icons/fa';
import { RootState } from '@/redux/store';
import VerifyEmail from './verify-email';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuItems: IMenuItemsNavbar[] = [
    {
      label: `${dictionary.az.chat}`,
      path: 'chat',
      icon: <BsFillChatLeftDotsFill />
    },
    {
      label: `${dictionary.az.tariffs}`,
      path: 'pricing',
      icon: <BsFillFilterSquareFill />
    },
    {
      label: `${dictionary.az.settings}`,
      path: 'settings',
      icon: <BsFillGearFill />
    }
  ];
  // const { toggle, isDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [show, setShow] = useState<boolean>(false);
  const navRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleOutSideClick = () => {
    setIsMenuOpen(false);
    setShow(false);
  };

  useOnClickOutside(navRef, handleOutSideClick);

  return (
    <>
      <NavbarNext
        className="z-10  bg-black"
        maxWidth="full"
        isBlurred={false}
        position="static"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        disableAnimation
        onClick={handleOutSideClick}
      >
        <NavbarContent className="lg:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
        <NavbarContent className="lg:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">ACMasdE</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden lg:flex gap-4 z-10" justify="start">
          <div
            onClick={() => navigate('/chat')}
            className="cursor-pointer"
            aria-hidden
          >
            <NavbarBrand>
              <BsRobot color="white" size={48} />
            </NavbarBrand>
          </div>
        </NavbarContent>
        <NavbarContent className=" hidden lg:flex gap-4 " justify="center">
          <ButtonGroup className="">
            <Button
              className={` w-40 text-white bg-transparent h-12  ${location.pathname.includes(
                'chat'
              )}`}
              onClick={() => {
                navigate('/chat');
              }}
              startContent={<BsFillChatLeftDotsFill size={17} />}
            >
              {dictionary.az.chat}
            </Button>
            <Tooltip
              className="hidden sm:block"
              placement="bottom"
              content={'Hazırlanır'}
            >
              <Button
                className={`isDisabled text-white  w-40 bg-transparent h-12  ${location.pathname.includes(
                  'assistan'
                )}`}
                startContent={<BsYelp color="white" size={17} />}
              >
                {dictionary.az.assistan}
              </Button>
            </Tooltip>

            <Tooltip
              className="hidden sm:block"
              placement="bottom"
              content={'Hazırlanır'}
            >
              <Button
                className={`isDisabled text-white w-40 bg-transparent h-12  ${location.pathname.includes(
                  'Kataliz'
                )}`}
                startContent={<BsClockFill color="white" size={17} />}
              >
                Kataliz
              </Button>
            </Tooltip>
          </ButtonGroup>
        </NavbarContent>
        <NavbarContent
          style={{
            marginRight: '-23px'
          }}
          justify="end"
        >
          <NavbarItem className=" p-1 px-2 sm:px-3 flex gap-2 items-center justify-between">
            {' '}
            {!user.verified && (
              <Tooltip
                className="hidden sm:block"
                placement="bottom"
                content={dictionary.az.emailVerify}
              >
                <Button
                  onClick={onOpen}
                  size="sm"
                  isIconOnly
                  className="bg-white rounded-full"
                  aria-label="Filter"
                >
                  <BsEnvelope
                    className="cursor-pointer animate-pulse"
                    color="red"
                    size={22}
                  />
                </Button>
              </Tooltip>
            )}
            <User
              name={
                user
                  ? `${user.firstName} ${user.lastName}`
                  : dictionary.az.empty
              }
              description={user.email || dictionary.az.empty}
              avatarProps={{
                src: `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`
              }}
              className="hidden sm:flex text-white"
            />
            <Dropdown className="">
              <DropdownTrigger className="">
                <div>
                  <MdOutlineKeyboardArrowDown
                    className="cursor-pointer"
                    color="white"
                    size={20}
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu className=" " aria-label="Static Actions">
                <DropdownItem
                  className=" "
                  onClick={() => {
                    navigate('/pricing');
                  }}
                  key="pricing"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <MdAttachMoney /> {dictionary.az.tariffs}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    navigate('/cabinet');
                  }}
                  key="cabinet"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <AiOutlineUser /> {dictionary.az.cabinet}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    localStorage.removeItem('userToken');
                    navigate('/login');
                  }}
                  key="logout"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <BsArrowRightCircle /> {dictionary.az.logOut}
                  </p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <Dropdown className="block sm:hidden">
              <DropdownTrigger>
                <div>
                  <Image
                    src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`}
                    width={39}
                    alt="user-image"
                    className="rounded-full block sm:hidden"
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem isReadOnly>
                  <p className="text-xl text-black">
                    {user
                      ? `${user.firstName} ${user.lastName}`
                      : dictionary.az.empty}
                  </p>
                  <p className="text-sm text-black">
                    {user.email || dictionary.az.empty}
                  </p>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    localStorage.removeItem('userToken');
                    navigate('/login');
                  }}
                  key="logout"
                  className="pt-0"
                >
                  <p className="text-sm">{dictionary.az.logOut}</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="md:hidden items-start pt-3 sm:pt-4 mt-0 sm:mt-4 md:mt-1">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              className="flex items-start"
              key={`${item}-${index}`}
            >
              <Button
                className="w-full px-1 flex bg-transparent items-center font-medium"
                onClick={() => {
                  navigate(`/${item.path}`);
                }}
              >
                {item.icon} {item.label}
              </Button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarNext>
      {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
    </>
  );
}

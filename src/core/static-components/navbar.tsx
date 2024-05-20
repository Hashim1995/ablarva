import {
  Navbar as NavbarNext,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  User,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Tooltip,
  DropdownItem,
  useDisclosure,
  Switch
} from '@nextui-org/react';

import { useOnClickOutside } from 'usehooks-ts';
import logoWhite from '@assets/images/logo-text-white.webp';
import logoBlue from '@assets/images/logo-text-blue.webp';
import { BsEnvelope, BsQuestionCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { LayoutLanguage } from '@/models/common';
import { useDispatch, useSelector } from 'react-redux';

import PricingModal from '@/modules/EMA/billing/components/ema-buy-modal';
import { setCurrentLayoutLanguage } from '@/redux/core/core-slice';
import { RootState } from '@/redux/store';
import { MoonIcon } from '@/assets/icons/moon-icon';
import { SunIcon } from '@/assets/icons/sun-icon';
import { IoLogOutOutline } from 'react-icons/io5';
import useDarkMode from 'use-dark-mode';
import { useTranslation } from 'react-i18next';
import VerifyEmail from './verify-email';
import FeedbackModal from './feedback-modal';

/**
 * Navbar component with language switcher, dark/light mode toggle, and user info display.
 *
 * This component provides navigation functionalities, including toggling modals,
 * changing themes, and switching between languages.
 *
 * @component
 * @example
 * // Usage example:
 * <Navbar />
 *
 */

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentLayoutLanguage } = useSelector(
    (state: RootState) => state.core
  );

  const { user } = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: pricingIsOpen, onOpenChange: pricingOnOpenChange } =
    useDisclosure();

  const {
    isOpen: feedBackModalIsOpen,
    onOpen: feedBackModalOnOpen,
    onOpenChange: feedBackModaOnOpenChange
  } = useDisclosure();
  const navRef = useRef(null);
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
    global: window
  });
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleOutSideClick = () => {
    setIsMenuOpen(false);
  };

  const currentLanguageFlag = (id: string) => {
    switch (id) {
      case LayoutLanguage?.Azerbaijani:
        return <img width={22} alt="uk flag" src="/flags/az-flag.svg" />;

      case LayoutLanguage?.English:
        return <img width={22} alt="uk flag" src="/flags/en-flag.svg" />;
      case LayoutLanguage?.Russian:
        return <img width={22} alt="uk flag" src="/flags/ru-flag.svg" />;
      default:
        return <img width={22} alt="uk flag" src="/flags/global-flag.svg" />;
    }
  };

  useOnClickOutside(navRef, handleOutSideClick);

  return (
    <>
      <NavbarNext
        className="z-10 bg-transparent"
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
            <p className="font-bold text-inherit">Ai-zade</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="z-10 lg:flex gap-4 hidden" justify="start">
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer"
            aria-hidden
          >
            <NavbarBrand>
              <img
                src={darkMode.value ? logoWhite : logoBlue}
                className="h-8 cursor-pointer"
                aria-hidden
                alt="Ablarva logo"
              />
            </NavbarBrand>
          </div>
        </NavbarContent>
        <NavbarContent className="lg:flex gap-4 hidden" justify="center" />
        <NavbarContent
          style={{
            marginRight: '-23px'
          }}
          justify="end"
        >
          <NavbarItem className="flex justify-between items-center gap-2 px-2 sm:px-3 p-1 text-default-800 dark:text-white">
            <Dropdown
              role="menu"
              classNames={{
                content: 'min-w-[auto] w-[80px]'
              }}
            >
              <DropdownTrigger>
                <Button size="sm" className="bg-transparent capitalize">
                  {currentLanguageFlag(currentLayoutLanguage)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={currentLayoutLanguage}
                onSelectionChange={(e: any) => {
                  dispatch(setCurrentLayoutLanguage(e?.currentKey));
                  i18n?.changeLanguage(e?.currentKey);
                  window.location.reload();
                }}
              >
                <DropdownItem key={LayoutLanguage?.Azerbaijani}>
                  <img width={22} alt="az flag" src="/flags/az-flag.svg" />
                </DropdownItem>
                <DropdownItem key={LayoutLanguage?.English}>
                  <img width={22} alt="en flag" src="/flags/en-flag.svg" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {user?.id && !user.verified ? (
              <Tooltip
                className="sm:block hidden"
                placement="bottom"
                classNames={{
                  content: 'text-default-900 dark:text-white'
                }}
                content={t('emailVerify')}
              >
                <Button
                  onClick={onOpen}
                  size="sm"
                  isIconOnly
                  aria-label="email verify"
                  title="Email verify"
                  className="flex bg-transparent rounded-full"
                >
                  <BsEnvelope
                    className="text-default-900 dark:text-white animate-pulse cursor-pointer"
                    size={22}
                  />
                </Button>
              </Tooltip>
            ) : null}

            <Button
              onClick={feedBackModalOnOpen}
              size="sm"
              isIconOnly
              aria-label="feedback"
              title="Feedback"
              className="flex bg-transparent rounded-full"
            >
              <BsQuestionCircle
                className="text-default-900 dark:text-white"
                size={22}
              />
            </Button>
            <Switch
              defaultSelected={darkMode.value}
              onValueChange={darkMode.toggle}
              size="sm"
              startContent={<MoonIcon />}
              endContent={<SunIcon />}
            />
            {user?.id ? (
              <User
                name={user ? `${user.firstName} ${user.lastName}` : t('empty')}
                description={user.email || t('empty')}
                avatarProps={{
                  src: `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`
                }}
                classNames={{
                  description: 'text-default-900 dark:text-white'
                }}
                className="sm:flex hidden text-default-800 dark:text-white"
              />
            ) : null}
            {user?.id ? (
              <div>
                <IoLogOutOutline
                  className="text-default-900 dark:text-white cursor-pointer"
                  size={20}
                  onClick={() => {
                    localStorage.removeItem('userToken');
                    window.location.reload();
                  }}
                />
              </div>
            ) : null}
          </NavbarItem>
        </NavbarContent>
      </NavbarNext>
      {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
      {feedBackModalIsOpen && (
        <FeedbackModal
          onOpenChange={feedBackModaOnOpenChange}
          isOpen={feedBackModalIsOpen}
        />
      )}
      {pricingIsOpen && (
        <PricingModal
          onOpenChange={pricingOnOpenChange}
          isOpen={pricingIsOpen}
        />
      )}
    </>
  );
}

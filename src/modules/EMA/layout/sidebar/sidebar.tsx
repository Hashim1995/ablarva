import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch,
  User
} from '@nextui-org/react';
import {
  BsArrowRightCircle,
  BsBarChart,
  BsChatDots,
  BsGear,
  BsMailbox
} from 'react-icons/bs';
import {
  MdOutlineDashboard,
  MdOutlineLeaderboard,
  MdOutlineCampaign,
  MdOutlineMarkEmailUnread,
  MdOutlineAttachEmail,
  MdAttachMoney
} from 'react-icons/md';

import { useLocation, useNavigate } from 'react-router-dom';
import logo from '@assets/images/aizadə.png';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AiOutlineUser } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';
import useDarkMode from 'use-dark-mode';
import { useTranslation } from 'react-i18next';
import { MoonIcon } from '@/assets/icons/moon-icon';
import { SunIcon } from '@/assets/icons/sun-icon';
import { Sidebar } from './sidebar.styles';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';

export function SidebarWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const { pathname } = location;
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
    global: window // Just pass this as a config option
  });
  return (
    <aside className="h-screen remove-scrollbar z-[20] sticky top-0">
      {/* {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null} */}

      <div
        className={Sidebar({
          collapsed: false
        })}
      >
        <div className={Sidebar.Header()}>
          <img src={logo} className="h-[48px] w-[48px]" alt="" />
          <h6>Ablarva</h6>
        </div>
        <Switch
          defaultSelected={darkMode.value}
          onValueChange={darkMode.toggle}
          size="lg"
          color="warning"
          startContent={<MoonIcon />}
          endContent={<SunIcon />}
        />
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarMenu title={t('main')}>
              <SidebarItem
                title="Dashboard"
                icon={<MdOutlineDashboard />}
                isActive={pathname === '/email-marketing'}
                href="/email-marketing"
              />
              <SidebarItem
                isActive={pathname.includes('/assistant')}
                title="Chat"
                icon={<BsChatDots />}
                href="assistant"
              />
              <SidebarItem
                isActive={pathname.includes('/leads')}
                title="Leads"
                icon={<MdOutlineLeaderboard />}
                href="leads"
              />{' '}
            </SidebarMenu>

            <SidebarMenu title={t('others')}>
              <SidebarItem
                isActive={pathname.includes('/mailbox')}
                title="Mailbox"
                icon={<BsMailbox />}
                href="mailbox"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/campaigns')}
                title="Campaigns"
                icon={<MdOutlineCampaign />}
                href="campaigns"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/pending-mails')}
                title="Pending mails"
                icon={<MdOutlineMarkEmailUnread />}
                href="pending-mails"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/connected-mails')}
                title="Connected mails"
                icon={<MdOutlineAttachEmail />}
                href="connected-mails"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/analytics')}
                title="Analytics"
                icon={<BsBarChart />}
                href="analytics"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <User
              name={user ? `${user.firstName} ${user.lastName}` : t('empty')}
              description={user.email || t('empty')}
              avatarProps={{
                size: 'sm',
                src: `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`
              }}
              className="hidden sm:flex text-default-900 dark:text-white"
            />
            <Dropdown className="">
              <DropdownTrigger className="">
                <div>
                  <BsGear className="cursor-pointer" color="white" size={16} />
                </div>
              </DropdownTrigger>
              <DropdownMenu className=" " aria-label="Static Actions">
                <DropdownItem
                  className=" "
                  // onClick={pricingOnOpen}
                  key="pricing"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <MdAttachMoney /> {t('tariffs')}
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
                    <AiOutlineUser /> {t('cabinet')}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    navigate('/settings');
                  }}
                  key="settings"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <BsGear /> {t('settings')}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    navigate('/reports');
                  }}
                  key="reports"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <TbReportAnalytics /> {t('reports')}
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
                    <BsArrowRightCircle /> {t('logOut')}
                  </p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </aside>
  );
}

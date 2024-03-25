/* eslint-disable no-unused-vars */
import { useDisclosure } from '@nextui-org/react';
import logo from '@assets/images/aizadə.png';
import { useTranslation } from 'react-i18next';
import TermsConditionsModal from './terms-conditions';

/**
 * Renders the left sidebar component for the login page.
 * This component displays the logo, a welcome message, and a link to the privacy policy.
 */
function LoginLeftBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="mt-3 mb-10 text-4xl font-bold tracking-wider flex items-center  gap-4">
        <img src={logo} className="animate-pulse w-[100px] h-[100px] " alt="" />
        <span className="theme-gradient font-bold text-[1.8em]">AI-ZADE</span>
      </div>

      {/* <p
        aria-hidden
        onClick={onOpen}
        className="mt-3 md:mt-6 underline text-xl text-center text-blue-500 cursor-pointer"
      >
        {t('privacyPolicySentence')}
      </p>
      {isOpen && (
        <TermsConditionsModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )} */}
    </div>
  );
}

export default LoginLeftBar;

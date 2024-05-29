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
      <div className="flex items-center gap-4 mt-3 mb-10 font-bold text-4xl tracking-wider">
        <img src={logo} className="w-[100px] h-[100px] animate-pulse" alt="" />
        <span className="font-bold text-[1.8em] theme-gradient">ABLARVA</span>
      </div>

      {/* <p
        aria-hidden
        onClick={onOpen}
        className="mt-3 md:mt-6 text-blue-500 text-center text-xl underline cursor-pointer"
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

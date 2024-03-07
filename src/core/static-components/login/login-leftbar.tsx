import { useDisclosure } from '@nextui-org/react';
import { BsRobot } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import TermsConditionsModal from './terms-conditions';

function LoginLeftBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <div className="my-3 text-4xl font-bold tracking-wider flex items-center justify-center">
        <BsRobot className="animate-pulse w-[100px] h-[100px]	 " />
      </div>
      <p className="mt-3 text-lg font-normal text-center text-white md:mt-0">
        {t('welcomeMessage')}
      </p>

      <p
        aria-hidden
        onClick={onOpen}
        className="mt-3 md:mt-6 underline text-xl text-center text-blue-500 cursor-pointer"
      >
        {t('privacyPolicySentence')}
      </p>
      {isOpen && (
        <TermsConditionsModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )}
    </>
  );
}

export default LoginLeftBar;

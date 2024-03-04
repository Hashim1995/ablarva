import { useDisclosure } from '@nextui-org/react';
import InstructionModal from './instruction-modal';
import { useTranslation } from 'react-i18next';

interface IFooterProps {
  onOpenHelp: () => void;
}

function Footer({ onOpenHelp }: IFooterProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  return (
    <footer className="bg-black shadow z-10  w-full ">
      <div className="w-full mx-auto  px-4 py-1 flex items-center justify-between">
        <div />
        <div className="text-sm  text-center text-white">
          <a href="/#" className="hover:underline">
            AI-ZADE™
          </a>{' '}
          © {t('currentYearFooter')}
        </div>
        <div className="flex gap-5">
          <div
            aria-hidden
            onClick={onOpen}
            className="cursor-pointer text-sm text-center text-white"
          >
            {t('instructionFooterText')}
          </div>
          <div
            aria-hidden
            onClick={onOpenHelp}
            className="cursor-pointer text-sm text-center text-white lg:hidden block"
          >
            {t('helpFooter')}
          </div>
        </div>
      </div>
      {isOpen && (
        <InstructionModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )}
    </footer>
  );
}

export default Footer;

import { useDisclosure } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import InstructionModal from './instruction-modal';

interface IFooterProps {
  onOpenHelp: () => void;
}

/**
 * Renders the footer component.
 *
 * @param {IFooterProps} props - The props for the Footer component.
 * @param {Function} props.onOpenHelp - The function to handle opening the help section.
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer({ onOpenHelp }: IFooterProps): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  return (
    <footer className="bg-black shadow z-10  w-full ">
      <div className="w-full mx-auto  px-4 py-1 flex items-center justify-between">
        <div />
        <div className="text-sm  text-center text-default-900 dark:text-white">
          <a href="/#" className="hover:underline">
            AI-ZADE™
          </a>{' '}
          © {t('currentYearFooter')}
        </div>
        <div className="flex gap-5">
          <div
            aria-hidden
            onClick={onOpen}
            className="cursor-pointer text-sm text-center text-default-900 dark:text-white"
          >
            {t('instructionFooterText')}
          </div>
          <div
            aria-hidden
            onClick={onOpenHelp}
            className="cursor-pointer text-sm text-center text-default-900 dark:text-white lg:hidden block"
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

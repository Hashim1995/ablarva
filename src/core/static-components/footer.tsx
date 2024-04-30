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
    <footer className="z-10 bg-black shadow w-full">
      <div className="flex justify-between items-center mx-auto px-4 py-1 w-full">
        <div />
        <div className="text-center text-default-800 text-sm dark:text-white">
          <a href="/#" className="hover:underline">
            AI-ZADE™
          </a>{' '}
          © {t('currentYearFooter')}
        </div>
        <div className="flex gap-5">
          <div
            aria-hidden
            onClick={onOpen}
            className="text-center text-default-800 text-sm dark:text-white cursor-pointer"
          >
            {t('instructionFooterText')}
          </div>
          <div
            aria-hidden
            onClick={onOpenHelp}
            className="block lg:hidden text-center text-default-800 text-sm dark:text-white cursor-pointer"
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

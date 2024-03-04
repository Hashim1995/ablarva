import { useDisclosure } from '@nextui-org/react';
import InstructionModal from './instruction-modal';

interface IFooterProps {
  onOpenHelp: () => void;
}

function Footer({ onOpenHelp }: IFooterProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <footer className="bg-black shadow z-10  w-full ">
      <div className="w-full mx-auto  px-4 py-1 flex items-center justify-between">
        <div />
        <div className="text-sm  text-center text-white">
          <a href="/#" className="hover:underline">
            AI-ZADE™
          </a>{' '}
          © 2024{' '}
        </div>
        <div className="flex gap-5">
          <div
            aria-hidden
            onClick={onOpen}
            className="cursor-pointer text-sm text-center text-white"
          >
            Təlimat
          </div>
          <div
            aria-hidden
            onClick={onOpenHelp}
            className="cursor-pointer text-sm text-center text-white lg:hidden block"
          >
            Kömək
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

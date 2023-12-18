import { useDisclosure } from '@nextui-org/react';
import InstructionModal from './instruction-modal';

function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <footer className="bg-black shadow z-10  w-full ">
      <div className="w-full mx-auto  px-4 py-1 flex items-center justify-between">
        <div />
        <div className="text-sm  text-center text-white">
          <a href="/#" className="hover:underline">
            AI-ZADE™
          </a>
          . All Rights Reserved. © 2023{' '}
        </div>
        <div className="flex gap-5">
          <div
            aria-hidden
            onClick={onOpen}
            className="cursor-pointer text-sm text-center text-white"
          >
            Təlimat
          </div>
          <div className="text-sm text-center text-white">Version: 0.2.1</div>
        </div>
      </div>
      {isOpen && (
        <InstructionModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )}
    </footer>
  );
}

export default Footer;

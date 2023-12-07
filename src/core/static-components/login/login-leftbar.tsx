import { useDisclosure } from '@nextui-org/react';
import { BsRobot } from 'react-icons/bs';
import TermsConditionsModal from './terms-conditions';

function LoginLeftBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="my-3 text-4xl font-bold tracking-wider flex items-center justify-center">
        <BsRobot className="animate-pulse w-[50px] h-[50px]	md:w-[68px] md:h-[68px]" />
      </div>
      <p className="mt-3 text-sm font-normal text-center text-white md:mt-0">
        With necəsən, gəle, öp, qıdığla the power of K-WD, you can now focus
        only on functionaries for your digital products, while leaving the UI
        design on us!
      </p>

      <p
        aria-hidden
        onClick={onOpen}
        className="mt-3 md:mt-6 underline text-sm text-center text-white cursor-pointer"
      >
        Read our terms and conditions
      </p>
      {isOpen && (
        <TermsConditionsModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )}
    </>
  );
}

export default LoginLeftBar;

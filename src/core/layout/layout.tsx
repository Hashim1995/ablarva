import { Outlet } from 'react-router-dom';
import { Button, useDisclosure } from '@nextui-org/react';
import { BsQuestionCircle } from 'react-icons/bs';
import Navbar from '../static-components/navbar';
import FeedbackModal from '../static-components/feedback-modal';

function LayoutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className=" h-screen  app-wrapper">
      <Navbar />
      <div className=" z-10   ">
        <Button
          onClick={onOpen}
          size="sm"
          isIconOnly
          className="bg-black rounded-full lg:flex hidden z-40  fixed sm:bottom-12 sm:right-12 bottom-8 right-8"
        >
          <BsQuestionCircle color="white" size={42} />
        </Button>
        {isOpen && (
          <FeedbackModal onOpenChange={onOpenChange} isOpen={isOpen} />
        )}

        <Outlet />
      </div>
    </div>
  );
}

export default LayoutPage;

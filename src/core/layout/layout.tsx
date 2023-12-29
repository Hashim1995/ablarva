import { Outlet } from 'react-router-dom';
import { Button, useDisclosure } from '@nextui-org/react';
import { BsQuestionCircle } from 'react-icons/bs';
import Footer from '../static-components/footer';
import Navbar from '../static-components/navbar';
import FeedbackModal from '../static-components/feedback-modal';

function LayoutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex particles flex-col justify-normal gap-2 h-screen max-h-screen app-wrapper">
      <Navbar />
      {/* sm:h-[80vh] */}

      <div className="my-2 flex-1 z-10 scrollBar relative overflow-y-scroll">
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

        <div className="h-full">
          <Outlet />
        </div>
      </div>
      <Footer onOpenHelp={onOpen} />
    </div>
  );
}

export default LayoutPage;

import { useState } from 'react';
import { Card } from '@nextui-org/react';
import MessengerHeader from './header';
import Drawer from '../../../../components/layout/drawer';
import ChatInner from './chat-inner/chat-inner';
import ChatHistory from '../chat-history/chat-history';

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Card
      style={{
        borderRadius: '0 !important'
      }}
      className="h-full rounded-0 shadow-none  bg-transparent  "
    >
      <MessengerHeader
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <div className="inner h-full flex  chat-wrapper">
        <Drawer className="bg-black" isOpen={isDrawerOpen}>
          <ChatHistory isResponsive />
        </Drawer>
        <main
          // style={{ height: 'calc(80vh - 56px) ' }}
          className="flex-1  layoutHeight     transition-all duration-300 ease-in-out h-full"
        >
          <ChatInner />
        </main>
      </div>
    </Card>
  );
}

export default Layout;

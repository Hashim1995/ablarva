import { useState } from 'react';
import { Card } from '@nextui-org/react';
import MessengerHeader from './header';
import Drawer from '../../../../components/layout/drawer';
import ChatInner from './chat-inner/chat-inner';
import ChatHistory from '../chat-history/chat-history';

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Card className="h-full rounded-2xl bg-transparent  shadow-md">
      <MessengerHeader
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <div className="inner h-full flex">
        <Drawer className="bg-black" isOpen={isDrawerOpen}>
          <ChatHistory isResponsive />
        </Drawer>
        <main
          style={{ height: 'calc(80vh - 56px) ' }}
          className="flex-1  layoutHeight bg-white overflow-x-auto transition-all duration-300 ease-in-out h-full"
        >
          <ChatInner />
        </main>
      </div>
    </Card>
  );
}

export default Layout;

import { useState } from 'react';
import { Card } from '@nextui-org/react';
import MessengerHeader from './header';
import Drawer from '../../../../components/layout/drawer';
import ChatInner from './chat-inner/chat-inner';
import AsistanCardList from './assistan/asistanList';

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Card className="h-full rounded-2xl bg-transparent  shadow">
      <MessengerHeader
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <div className="inner  h-full flex">
        <Drawer className="bg-black" isOpen={isDrawerOpen}>
          <AsistanCardList activeId={2} />
        </Drawer>
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <ChatInner />
        </main>
      </div>
    </Card>
  );
}

export default Layout;

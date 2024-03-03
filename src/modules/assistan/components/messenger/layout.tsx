import { Card } from '@nextui-org/react';
import MessengerHeader from './header';
import ChatInner from './chat-inner/chat-inner';

function Layout({ isDrawerOpen, setIsDrawerOpen }: any) {
  return (
    <Card
      style={{
        borderRadius: '0 !important'
      }}
      className="h-full rounded-none  shadow-none gradient-bg"
    >
      <MessengerHeader
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <div className="inner h-full flex  chat-wrapper">
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

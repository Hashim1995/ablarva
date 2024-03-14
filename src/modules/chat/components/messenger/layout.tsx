import { Card } from '@nextui-org/react';
import MessengerHeader from './header';
import ChatInner from './chat-inner/chat-inner';

/**
 * Renders the layout for the messenger component.
 * @returns The JSX element representing the messenger layout.
 */
function Layout() {
  return (
    <Card
      style={{
        borderRadius: '0 !important'
      }}
      className="h-full rounded-none bg-transparent  shadow-none"
    >
      <MessengerHeader />

      <div className="inner h-full flex  chat-wrapper">
        <main className="flex-1  layoutHeight     transition-all duration-300 ease-in-out h-full">
          <ChatInner />
        </main>
      </div>
    </Card>
  );
}

export default Layout;

import { Card } from '@nextui-org/react';
import MessengerHeader from './header';
import ChatInner from './chat-inner/chat-inner';

/**
 * @description The `Layout` component is a React functional component that renders the layout for the messenger for Assistant chat.
 *
 * @returns JSX.Element representing the Layout component.
 */
function Layout() {
  return (
    <Card
      style={{
        borderRadius: '0 !important'
      }}
      className="h-full rounded-none  shadow-none bg-transparent "
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

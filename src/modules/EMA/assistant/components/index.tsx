import { RootState } from '@/redux/store';
import Drawer from '@/components/layout/drawer';
import { useSelector } from 'react-redux';
import ChatHistory from './chat-history/chat-history';
import Layout from './messenger/layout';
import AsistantCardList from './messenger/assistant/asistantList';

/**
 * @description The `Chat` component is a React functional component that renders the chat interface for Assistant.
 *
 * @returns The rendered chat component.
 */
function Chat() {
  const { resetAssistantInner, assistantsDrawer } = useSelector(
    (state: RootState) => state.assistant
  );

  return (
    <div className=" fixed-height   ">
      <div className="flex fixed-height relative">
        <div className=" w-full fixed-height">
          <Drawer
            className="bg-black/30 backdrop-blur-md  z-50"
            isOpen={assistantsDrawer}
          >
            <AsistantCardList />
          </Drawer>
          <Layout key={resetAssistantInner} />
        </div>
        <div className="fixed-height">
          <ChatHistory />
        </div>
      </div>
    </div>
  );
}

export default Chat;

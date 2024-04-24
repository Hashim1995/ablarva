import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ChatHistory from './chat-history/chat-history';
import ChatInner from './messenger/chat-inner/chat-inner';

/**
 * @description The `Chat` component is a React functional component that renders the chat interface for Assistant.
 *
 * @returns The rendered chat component.
 */
function Chat() {
  const { resetAssistantInner } = useSelector(
    (state: RootState) => state.assistant
  );

  return (
    <div className="flex">
      <div className="relative flex-1 w-full h-full  overflow-x-hidden  remove-scrollbar   ">
        <div className="flex flex-col h-full ">
          <div className="w-full h-screen ">
            <div className="relative h-full">
              <div className="flex flex-col w-full h-full ">
                <ChatInner key={resetAssistantInner} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatHistory />
    </div>
  );
}

export default Chat;

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ChatHistory from './chat-history/chat-history';
import Layout from './messenger/layout';
// import MyPlan from './my-plan/my-plan';

/**
 * Renders the Chat component.
 *
 * @returns The rendered Chat component.
 */
function Chat() {
  // resetChatInner is a key that is used to reset the chat inner component.
  const { resetChatInner } = useSelector((state: RootState) => state.chat);
  return (
    <div className=" fixed-height  ">
      <div className="flex fixed-height">
        <div className=" w-full fixed-height">
          <Layout key={resetChatInner} />
        </div>
        <div className="fixed-height">
          <ChatHistory />
        </div>
      </div>
    </div>
  );
}

export default Chat;

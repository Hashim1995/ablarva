import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ChatHistory from './chat-history/chat-history';
import Layout from './messenger/layout';
// import MyPlan from './my-plan/my-plan';

function Chat() {
  const { resetAssistanInner } = useSelector(
    (state: RootState) => state.assistan
  );
  return (
    <div className="gradient-bg fixed-height  ">
      <div className="flex fixed-height">
        <div className=" w-full fixed-height">
          <Layout key={resetAssistanInner} />
        </div>
        <div className="fixed-height">
          <ChatHistory />
        </div>
      </div>
    </div>
  );
}

export default Chat;

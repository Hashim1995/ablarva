import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ChatHistory from './chat-history/chat-history';
import Layout from './messenger/layout';
import MyPlan from './my-plan/my-plan';

function Chat() {
  const { resetChatInner } = useSelector((state: RootState) => state.chat);
  return (
    <div className=" container-fluid h-full mx-auto ">
      <div className="h-full grid gap-3 sm:gap-5 grid-cols-12  lg:grid-cols-12 lg:grid-rows-5">
        <div className="rounded-3xl col-span-12 lg:col-span-8 lg:row-span-5 ">
          <Layout key={resetChatInner} />
        </div>

        <div className="rounded-3xl col-span-12 lg:col-span-4 lg:row-span-3 sm:row-span-1 hidden lg:block">
          <ChatHistory />
        </div>

        <div className="rounded-3xl col-span-12 lg:col-span-4 lg:row-span-2 sm:row-span-1 lg:block hidden">
          <MyPlan />
        </div>
      </div>
    </div>
  );
}

export default Chat;

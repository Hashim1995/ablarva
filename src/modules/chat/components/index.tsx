import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ChatHistory from './chat-history/chat-history';
import Layout from './messenger/layout';
import MyPlan from './my-plan/my-plan';

function Chat() {
  const { resetChatInner } = useSelector((state: RootState) => state.chat);
  return (
    <div className=" container-fluid h-full mx-auto ">
      <div className="h-full grid gap-3 sm:gap-5 grid-cols-12 md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-5">
        <div className="rounded-3xl col-span-12 lg:col-span-8 xl:row-span-5 md:row-span-4 md:col-span-12">
          <Layout key={resetChatInner} />
        </div>

        <div className="rounded-3xl col-span-12 lg:col-span-4 xl:row-span-3 sm:row-span-1 md:row-span-2 md:col-span-6">
          <ChatHistory />
        </div>

        <div className="rounded-3xl col-span-12 lg:col-span-4 xl:row-span-2 sm:row-span-1 md:row-span-2 md:col-span-6">
          <MyPlan />
        </div>
      </div>
    </div>
  );
}

export default Chat;

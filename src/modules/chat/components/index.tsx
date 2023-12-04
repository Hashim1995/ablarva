import ChatHistory from './chat-history/chat-history';
import LeftBar from './leftbar/leftbar';
import Layout from './messenger/layout';
import MyPlan from './my-plan/my-plan';

function Chat() {
  return (
    <div className=" container-fluid h-full mx-auto ">
      <div className="h-full grid gap-3 sm:gap-5 grid-cols-12 md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-5">
        <div className="rounded-3xl col-span-12 xl:col-span-1 xl:row-span-5 md:row-span-1 md:col-span-12">
          <LeftBar />
        </div>

        <div className="rounded-3xl col-span-12 xl:col-span-7 xl:row-span-5 md:row-span-4 md:col-span-12">
          <Layout />
        </div>

        <div className="rounded-3xl col-span-12 xl:col-span-4 xl:row-span-3 md:row-span-1 md:col-span-6">
          <ChatHistory />
        </div>

        <div className="rounded-3xl col-span-12 xl:col-span-4 xl:row-span-2 md:row-span-1 md:col-span-6">
          <MyPlan />
        </div>
      </div>
    </div>
  );
}

export default Chat;

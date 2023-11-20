import ChatHistory from './chat-history/chat-history';
import LeftBar from './leftbar/leftbar';
import Layout from './messenger/layout';
import MyPlan from './my-plan/my-plan';

function Chat() {
  return (
    <div className=" container-fluid h-full mx-auto ">
      <div className="grid lg:grid-cols-12 lg:grid-rows-5 h-768 lg:gap-10 md:grid md:grid-cols-12 md:grid-rows-8 md:gap-10">
        <div className=" rounded-3xl lg:row-span-5 md:row-span-8">
          <LeftBar />
        </div>
        <div className=" rounded-3xl lg:col-span-8 lg:row-span-5 md:col-span-11 md:row-span-5">
          <Layout />
        </div>
        <div className=" rounded-3xl  lg:col-span-3  lg:row-span-3 lg:col-start-10 md:col-span-7 md:row-span-3 md:col-start-2 md:row-start-6">
          <ChatHistory />
        </div>
        <div className=" rounded-3xl lg:col-span-3 lg:row-span-2 lg:col-start-10 lg:row-start-4 md:col-span-4 md:row-span-3 md:col-start-9 md:row-start-6">
          <MyPlan />
        </div>
      </div>
    </div>
  );
}

export default Chat;

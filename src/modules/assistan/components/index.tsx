import { RootState } from '@/redux/store';
import Drawer from '@/components/layout/drawer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChatHistory from './chat-history/chat-history';
import Layout from './messenger/layout';
import AsistanCardList from './messenger/assistan/asistanList';
// import MyPlan from './my-plan/my-plan';

function Chat() {
  const { resetAssistanInner } = useSelector(
    (state: RootState) => state.assistan
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="gradient-bg fixed-height  ">
      <div className="flex fixed-height">
        <Drawer className="bg-black " isOpen={isDrawerOpen}>
          <AsistanCardList />
        </Drawer>
        <div className=" w-full fixed-height">
          <Layout
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            key={resetAssistanInner}
          />
        </div>
        <div className="fixed-height">
          <ChatHistory />
        </div>
      </div>
    </div>
  );
}

export default Chat;

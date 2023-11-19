/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Image
} from '@nextui-org/react';
import MessengerHeader from './header';
import Drawer from '../../../../components/layout/drawer';
import Messenger from './messenger';
import AsistanCardList from './assistan/asistanList';

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mainContentWidth, setMainContentWidth] = useState('100%'); // state to control the width

  useEffect(() => {
    setMainContentWidth(isDrawerOpen ? 'calc(100% - 16rem)' : 'full');
  }, [isDrawerOpen]);

  return (
    <Card className="h-full rounded-2xl bg-transparent  shadow">
      <MessengerHeader
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <div className="inner  h-full flex">
        <Drawer className="bg-black" isOpen={isDrawerOpen}>
          <AsistanCardList activeId={2} />
        </Drawer>
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <Messenger />
        </main>
      </div>
    </Card>
  );
}

export default Layout;

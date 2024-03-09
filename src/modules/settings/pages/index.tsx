import Drawer from '@/components/layout/drawer';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

function SettingsPage() {
  return (
    <div>
      <div className=" fixed-height   ">
        <div className="flex fixed-height relative">
          <div className=" w-[400px] fixed-height">
            <Drawer className="bg-black/30 backdrop-blur-md  z-50" isOpen>
              <Sidebar />
            </Drawer>
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

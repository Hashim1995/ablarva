import Drawer from '@/components/layout/drawer';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

/**
 * Renders the settings page. This page is the parent page for all settings pages. It renders the sidebar and the settings page content.
 *
 * @returns The rendered settings page.
 */
function SettingsPage() {
  return (
    <div>
      <div className="remove-scrollbar home-container">
        <div className="flex relative">
          <div className="w-[400px] fixed-height">
            <Drawer className="bg-black/30 backdrop-blur-md z-50" isOpen>
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

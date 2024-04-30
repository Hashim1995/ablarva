import Drawer from '@/components/layout/drawer';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

/**
 * Renders the Reports page. This page is the parent page for all the reports pages. It contains the sidebar and the content area. The sidebar contains the links to the different reports pages.
 * @returns The JSX element representing the Reports page.
 */
function ReportsPage() {
  return (
    <div>
      <div className="  remove-scrollbar    home-container ">
        <div className="flex  relative">
          <div className=" w-[400px] ">
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

export default ReportsPage;

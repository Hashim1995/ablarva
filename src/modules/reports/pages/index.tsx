import Drawer from '@/components/layout/drawer';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

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

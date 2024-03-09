import { Outlet } from 'react-router-dom';
import Navbar from '../static-components/navbar';

function LayoutPage() {
  return (
    <div className="  app-wrapper">
      <Navbar />
      <div className=" z-10   ">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutPage;

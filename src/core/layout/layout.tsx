/* eslint-disable react/button-has-type */
import { Outlet } from 'react-router-dom';
// import { noDataText } from '@/utils/constants/texts';
import Footer from '../static-components/footer';
import Navbar from '../static-components/navbar';
import ParticlesBackground from '../static-components/particles-background';

function LayoutPage() {
  return (
    <div className="flex particles flex-col justify-between gap-2 h-screen  max-h-screen ">
      <div className="z-1">
        {' '}
        <ParticlesBackground isDark />
      </div>
      <Navbar />

      <div className="my-2 h-[80%] z-10 overflow-y-scroll">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutPage;

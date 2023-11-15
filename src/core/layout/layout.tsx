/* eslint-disable react/button-has-type */
import { Outlet } from 'react-router-dom';
// import { noDataText } from '@/utils/constants/texts';
import Footer from '../static-components/footer';
import Navbar from '../static-components/navbar';

function LayoutPage() {
  return (
    <div className="bg-gray-300 dark:bg-black" style={{ minHeight: '100vh' }}>
      <div>
        <Navbar />

        <div style={{ overflow: 'initial' }}>
          <div style={{ minHeight: '100vh' }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LayoutPage;

/* eslint-disable react/button-has-type */
import { Outlet } from 'react-router-dom';
// import { noDataText } from '@/utils/constants/texts';
import Footer from '../static-components/footer';
import Navbar from '../static-components/navbar';

function LayoutPage() {
  return (
    <div>
      <div>
        <Navbar />

        <div style={{ overflow: 'initial' }} className="my-2">
          <div>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LayoutPage;

import { Outlet } from 'react-router-dom';
import { SidebarWrapper } from './sidebar/sidebar';

/**
 * Renders the layout page.
 * @returns The layout page component.
 */
function EMALayoutPage() {
  return (
    <div className=" z-10  flex">
      <SidebarWrapper />
      <div className="outlet-renderer w-full relative pl-5 pt-5 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default EMALayoutPage;

import { Outlet } from 'react-router-dom';

/**
 * Renders the layout page.
 * @returns The layout page component.
 */
function EMALayoutPage() {
  return (
    <div className=" z-10   ">
      <Outlet />
    </div>
  );
}

export default EMALayoutPage;

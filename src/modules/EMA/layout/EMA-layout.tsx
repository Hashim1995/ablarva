import { setCurrentAssistantModel } from '@/redux/assistant/assistant-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { SidebarWrapper } from './sidebar/sidebar';

/**
 * Renders the layout page.
 * @returns The layout page component.
 */
function EMALayoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setCurrentAssistantModel({
        assistantId: 'da34ec4c-defc-11ee-b126-000d3a8e8bcf',
        assistantImagePath: '/assistanticons/adam.webp',
        assistantDescription:
          'Adam elevates your email marketing strategy with AI-driven content creation, offering personalization, segmentation all while ensuring compliance with best practices.',
        assistanName: 'Adam',
        assistantPosition: 'Email Marketing Specialist',
        isActive: true
      })
    );
  }, []);
  return (
    <div className=" z-10  flex">
      <SidebarWrapper />
      <div className="outlet-renderer w-full relative overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default EMALayoutPage;

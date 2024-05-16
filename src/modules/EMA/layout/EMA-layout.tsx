import { setCurrentAssistantModel } from '@/redux/assistant/assistant-slice';
import {
  fetchJobTitleList,
  fetchSenderInformationList
} from '@/redux/ema/ema-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { SidebarWrapper } from './sidebar/sidebar';

/**
 * Renders the layout page.
 * @returns The layout page component.
 */
function EMALayoutPage() {
  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(fetchJobTitleList());
    dispatch(fetchSenderInformationList());
  }, []);
  return (
    <div className="z-10 flex">
      <SidebarWrapper />
      <div className="relative w-full overflow-x-hidden outlet-renderer remove-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}

export default EMALayoutPage;

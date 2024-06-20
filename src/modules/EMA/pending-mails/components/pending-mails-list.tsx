/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { setState } from '@/models/common';
import { Pagination } from '@nextui-org/react';
import { t } from 'i18next';
import PendingMailsItem from './pending-mails-item';

interface IProps {
  activeTab: 1 | 2;
  setActiveTab: setState<1 | 2>;
}

const dummy = [
  {
    id: 1,
    to: 'h.hashimli@optima.az',
    campaignName: 'Adam Promotion - English',
    language: 'English',
    templateType: 'Promotion',
    title: 'Enhance Your B2B Sales with Advanced Email Marketing',
    createdAt: '2024-06-01',
    description: `Dear Mr. Hashim,

I noticed that Optima Group Co specializes in B2B services, where effective communication is key to increasing sales. Our AI-driven assistant, Adam, personalizes email campaigns to ensure maximum engagement and reach.

Would you be available for a quick call to discuss how targeted email marketing can benefit your business?

Looking forward to the possibility of working together.`
  },
  {
    id: 2,
    to: 's.jumazada@dha.com',
    campaignName: 'Adam Promotion',
    language: 'English',
    templateType: 'Promotion',
    title: 'Boost Your Email Marketing Results with Advanced AI',
    createdAt: '2024-06-02',
    description: `Dear Ms. Seljan,

I am Adam, your potential AI-driven assistant. I've observed DHA Baku's dedication to both professional medical content and robust email marketing services, and I'm designed to enhance your marketing strategies and efficiency.

Could we schedule a brief call to discuss how I could amplify your current email marketing efforts and contribute to even greater success at DHA Baku?

Thank you for considering`
  }
];
function PendingMailsList({ activeTab, setActiveTab }: IProps) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="relative flex justify-between">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('pendingMailsList')} 😎
        </h3>
      </div>
      <div className="bg-transparent w-full">
        <div className="flex justify-between mb-3">
          <div className="flex gap-2">
            <AppHandledBorderedButton
              onClick={() => setActiveTab(1)}
              variant={activeTab === 1 ? 'solid' : 'bordered'}
            >
              {t('pending')}
            </AppHandledBorderedButton>
            <AppHandledBorderedButton
              onClick={() => setActiveTab(2)}
              variant={activeTab === 2 ? 'solid' : 'bordered'}
            >
              {t('scheduled')}
            </AppHandledBorderedButton>
          </div>
          {activeTab === 1 && (
            <AppHandledSolidButton>
              {t('scheduleAndSendAll')}
            </AppHandledSolidButton>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {dummy?.map(item => <PendingMailsItem key={item?.id} item={item} />)}
          <div className="flex justify-center">
            <Pagination
              isCompact
              color="secondary"
              showControls
              page={1}
              total={500}
              // onChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingMailsList;

/* eslint-disable no-unused-vars */
import { AssistantService } from '@/services/assistant-services/assistant-services';
import { Skeleton } from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAssistantItem } from '../types';
import AssistantHomeCard from './assistant-home-card';

function Home() {
  const [assistansList, setAssistansList] = useState<IAssistantItem[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAssistansList = async () => {
    try {
      const res = await AssistantService.getInstance().fetchAssistantsList();

      setAssistansList(res?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const { t } = useTranslation();
  useEffect(() => {
    fetchAssistansList();
  }, []);

  return (
    <div className="py-10 remove-scrollbar  home-container ">
      <div className="flex justify-center mb-3">
        <h1 className=" text-[3rem] font-medium">
          <span className="theme-gradient font-bold">AI-ZADE</span>:{' '}
          {t('unlockPowerOf')} <br />
          {t('withSmartestAssistants')}
        </h1>
      </div>

      <div className="containerLg  ">
        {!loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 r gap-7 ">
            {assistansList?.map((item: IAssistantItem) => (
              <AssistantHomeCard key={item?.assistantId} item={item} />
            ))}
          </div>
        ) : (
          <>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

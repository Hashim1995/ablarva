/* eslint-disable no-unused-vars */
import { WormIcon } from '@/assets/icons/warm-icon';
import { EmaChatService } from '@/services/ema/ema-chat-services';
import { Skeleton } from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAssistantItem } from '../types';
import AssistantHomeCard from './assistant-home-card';

/**
 * @description The `Home` component is a React functional component that renders the home page for Assistant.
 *
 * @returns JSX.Element representing the Home component.
 */
function Home() {
  const [assistansList, setAssistansList] = useState<IAssistantItem[]>();
  const [loading, setLoading] = useState<boolean>(true);

  // Fetching the list of assistants
  const fetchAssistansList = async () => {
    try {
      const res = await EmaChatService.getInstance().fetchAssistantsList();

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

  function getRandomPosition() {
    return `${Math.floor(Math.random() * 100)}vh`; // Adjust the range as needed
  }

  const getRandomRotation = () => `${Math.floor(Math.random() * 360)}deg`;

  const wormIcons = Array.from({ length: 10 }, (_, index) => (
    <WormIcon
      key={index}
      style={{
        top: getRandomPosition(),
        left: getRandomPosition(),
        transform: `rotate(${getRandomRotation()})`
      }}
      className="absolute w-[500px] h-[500px]"
    />
  ));

  return (
    <div className="py-10 home-container remove-scrollbar">
      <div className="flex justify-center mb-3">
        <h1 className="font-medium text-[3rem]">
          <span className="font-bold theme-gradient">AI-ZADE</span>:{' '}
          {t('unlockPowerOf')} <br />
          {t('withSmartestAssistants')}
        </h1>
      </div>
      {/* {wormIcons} */}

      <div className="containerLg">
        {!loading ? (
          <div className="gap-7 grid grid-cols-2 sm:grid-cols-3 r">
            {assistansList?.map((item: IAssistantItem) => (
              <AssistantHomeCard key={item?.assistantId} item={item} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 my-5 w-full">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="rounded-lg w-3/5 h-3" />
                <Skeleton className="rounded-lg w-4/5 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-3 my-5 w-full">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="rounded-lg w-3/5 h-3" />
                <Skeleton className="rounded-lg w-4/5 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-3 my-5 w-full">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="rounded-lg w-3/5 h-3" />
                <Skeleton className="rounded-lg w-4/5 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-3 my-5 w-full">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="rounded-lg w-3/5 h-3" />
                <Skeleton className="rounded-lg w-4/5 h-3" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

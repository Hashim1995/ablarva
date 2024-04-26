/* eslint-disable react/jsx-no-useless-fragment */

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  Image,
  Skeleton
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Empty from '@/components/layout/empty';
import {
  setResetAssistantInner,
  setWaitingForAssistantThreadLoad
} from '@/redux/assistant/assistant-slice';
import { EmaChatService } from '@/services/ema/ema-chat-services';
import { useTranslation } from 'react-i18next';
import { IAssistantThreadHistoryList } from '../../types';

interface IChatHistoryProps {
  isResponsive?: boolean;
}

/**
 * @description `ChatHistory` is a React component that provides a chat history interface.
 * It displays a list of previous chats with the assistant.
 * @component
 * @param {Object} props The properties object.
 * @param {boolean} props.isResponsive A flag indicating whether the component is responsive.
 * @returns {JSX.Element} The rendered `ChatHistory` component.
 */
function ChatHistory({ isResponsive }: IChatHistoryProps): JSX.Element {
  const [threadHistory, setThreadHistory] =
    useState<IAssistantThreadHistoryList[]>();
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [popoversVisible, setPopoversVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch thread history from the server
  const fetchThreadHistory = async () => {
    try {
      const res = await EmaChatService.getInstance().fetchThreadHistory();
      if (res.isSuccess) {
        setThreadHistory(res?.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Remove a thread from the list
  const removeThreadFromList = async (id: string) => {
    setRemoveLoading(true);
    try {
      const res = await EmaChatService.getInstance().removeThread(id);
      if (res.isSuccess) {
        // Refetch the thread history after removing a thread
        fetchThreadHistory();
        setPopoversVisible((prevState: { [key: string]: boolean }) => ({
          ...prevState,
          [id]: false
        }));
        // If the current thread is removed, reset the assistant inner
        if (searchParams.get('threadID') === id) {
          searchParams.delete('threadID');
          navigate('/assistan', { replace: true });
          setTimeout(() => {
            dispatch(setResetAssistantInner(Date.now()));
          }, 500);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setRemoveLoading(false);
  };

  useEffect(() => {
    fetchThreadHistory();
  }, [searchParams.get('threadID')]);
  return (
    <div className="fixed-height border-divider border-l w-[250px] overflow-y-auto remove-scrollbar">
      {!isResponsive && (
        <div className="flex justify-between items-center p-3 h-[60px]">
          <h3 className="font-semibold text-base text-default-800 sm:text-xl dark:text-white">
            {t('previous')} {t('chats')}
          </h3>
        </div>
      )}

      <div
        className={` p-3       lg:h-full  remove-scrollbar ${
          isResponsive ? 'h-full pt-3 pb-14 ' : 'h-[300px] xl:py-3  py-1'
        }`}
      >
        {!loading ? (
          <>
            {threadHistory && threadHistory?.length !== 0 ? (
              threadHistory?.map(day => (
                <div key={day.dateOfChats} className="pb-5">
                  <div className="flex items-center mb-1">
                    <div className="flex-1 border-gray-200 border-t-1" />
                    <span className="px-3 text-[gray] text-sm">
                      {dayjs(new Date(day.dateOfChats).toISOString()).format(
                        'DD.MM.YYYY'
                      )}
                    </span>
                    <div className="flex-1 border-gray-200 border-t-1" />
                  </div>
                  {day?.assistantChats?.map(conv => (
                    <div
                      key={conv?.threadId}
                      className={`${
                        conv?.threadId === searchParams.get('threadID')
                          ? ' border-default-600 border-1 dark:border-white'
                          : 'dark:border-0'
                      } cursor-pointer relative z-10 border-1 border-divider dark:bg-default-50 dark:bg-none backdrop-blur-md mb-2 px-3 py-2  rounded-2xl text-default-800 dark:text-white cursor-pointer"`}
                      aria-hidden
                      onClick={() => {
                        dispatch(setWaitingForAssistantThreadLoad(true));
                        dispatch(setResetAssistantInner(Date.now()));

                        setResetAssistantInner;
                        setSearchParams({
                          threadID: String(conv.threadId)
                        });
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          alt="Woman listing to music"
                          className="rounded-full w-10 h-full object-cover"
                          src={
                            `${
                              import.meta.env.VITE_BASE_URL
                            }${conv?.assistantImagePath}` || ''
                          }
                        />
                        <p className="line-clamp-3 text-default-900 text-sm dark:text-white leading-4">
                          {conv?.assistantName}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <p className="line-clamp-3 text-default-900 text-sm dark:text-white leading-4">
                          {conv?.threadFirstMessage}
                        </p>
                        <Popover
                          key={conv?.threadId}
                          isOpen={popoversVisible[conv?.threadId] || false}
                          onOpenChange={() =>
                            setPopoversVisible({
                              [conv?.threadId]: true
                            })
                          }
                          placement="right"
                        >
                          <PopoverTrigger>
                            <Button
                              size="sm"
                              isIconOnly
                              className="bg-transparent ml-2 rounded-full !w-6 !h-8 !unit-lg"
                              aria-label="Remove chat popover trigger"
                              title="Remove chat popover trigger"
                            >
                              <BsTrash
                                size={16}
                                className="text-default-800 dark:text-white"
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2 text-default-800 dark:text-white">
                              <p>{t('deleteConfirmationPrompt')}</p>
                              <Divider className="my-2" />
                              <div className="flex items-center gap-1 w-full">
                                <Button
                                  size="sm"
                                  className=""
                                  variant="bordered"
                                  isLoading={removeLoading}
                                  onClick={() => {
                                    removeThreadFromList(conv.threadId);
                                  }}
                                  aria-label="Remove thread"
                                  title='Remove thread "Yes"'
                                >
                                  {t('yesTxt')}
                                </Button>
                                <Button
                                  size="sm"
                                  className=""
                                  aria-label="Remove thread"
                                  title='Remove thread "No"'
                                  onClick={() =>
                                    setPopoversVisible({
                                      [conv?.threadId]: false
                                    })
                                  }
                                >
                                  {t('noTxt')}
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <Empty />
            )}
          </>
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

export default ChatHistory;

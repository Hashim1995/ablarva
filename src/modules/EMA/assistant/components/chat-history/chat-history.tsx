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
import { AssistantService } from '@/services/assistant-services/assistant-services';
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
      const res = await AssistantService.getInstance().fetchThreadHistory();
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
      const res = await AssistantService.getInstance().removeThread(id);
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
    <div className="w-[250px] border-l border-divider  overflow-y-auto remove-scrollbar fixed-height">
      {!isResponsive && (
        <div className="flex justify-between items-center  p-3 h-[60px]">
          <h3 className="text-base sm:text-xl text-default-900 dark:text-white font-semibold">
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
                    <div className="flex-1 border-t-1 border-gray-200" />
                    <span className="px-3 text-sm  text-[gray]">
                      {dayjs(new Date(day.dateOfChats).toISOString()).format(
                        'DD.MM.YYYY'
                      )}
                    </span>
                    <div className="flex-1 border-t-1 border-gray-200" />
                  </div>
                  {day?.assistantChats?.map(conv => (
                    <div
                      key={conv?.threadId}
                      aria-hidden
                      onClick={() => {
                        dispatch(setWaitingForAssistantThreadLoad(true));
                        dispatch(setResetAssistantInner(Date.now()));

                        setResetAssistantInner;
                        setSearchParams({
                          threadID: String(conv.threadId)
                        });
                      }}
                      className="  dark:bg-default-50 relative cursor-pointer backdrop-blur-md  dark:bg-none   text-default-900 dark:border-none border-1 border-divider dark:text-white rounded-2xl  mb-2   px-3 py-2 z-10"
                    >
                      <div className="flex  items-center gap-2 mb-2">
                        <Image
                          alt="Woman listing to music"
                          className="object-cover h-full w-10 rounded-full"
                          src={
                            `${
                              import.meta.env.VITE_BASE_URL
                            }${conv?.assistantImagePath}` || ''
                          }
                        />
                        <p className="text-default-900 dark:text-white  leading-4  text-sm line-clamp-3">
                          {conv?.assistantName}
                        </p>
                      </div>

                      <div className="flex  items-center justify-between mb-2">
                        <p className="text-default-900 dark:text-white  leading-4  text-sm line-clamp-3">
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
                              className="bg-transparent rounded-full ml-2 !w-6 !h-8 !unit-lg"
                              aria-label="Remove chat popover trigger"
                              title="Remove chat popover trigger"
                            >
                              <BsTrash
                                size={16}
                                className=" text-default-900 dark:text-white"
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2 text-default-900 dark:text-white">
                              <p>{t('deleteConfirmationPrompt')}</p>
                              <Divider className="my-2" />
                              <div className="w-full flex items-center gap-1">
                                <Button
                                  size="sm"
                                  className=" "
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
                                  className=" "
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

export default ChatHistory;

/* eslint-disable react/jsx-no-useless-fragment */
import {
  setResetChatInner,
  setWaitingForThreadLoad
} from '@/redux/chat/chat-slice';
import { ChatService } from '@/services/chat-services/chat-services';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  Skeleton
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Empty from '@/components/layout/empty';
import { FcFlashOn } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import { IThreadHistoryList } from '../../types';

interface IChatHistoryProps {
  isResponsive?: boolean;
}

/**
 * @description Renders the chat history. This component displays the chat history.
 * @param {boolean} isResponsive - The isResponsive parameter. Indicates whether the component is responsive.
 * @returns The rendered chat history.
 */
function ChatHistory({ isResponsive }: IChatHistoryProps) {
  const [threadHistory, setThreadHistory] = useState<IThreadHistoryList[]>();
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [popoversVisible, setPopoversVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  /**
   * @description Fetches the thread history.
   */
  const fetchThreadHistory = async () => {
    try {
      const res = await ChatService.getInstance().fetchThreadHistory();
      if (res.isSuccess) {
        setThreadHistory(res?.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Removes a thread from the list.
   *
   * @param id - The ID of the thread to be removed.
   */
  const removeThreadFromList = async (id: string) => {
    setRemoveLoading(true);
    try {
      // Call the removeThread method from the ChatService to remove the thread
      const res = await ChatService.getInstance().removeThread(id);
      if (res.isSuccess) {
        // Fetch the updated thread history
        fetchThreadHistory();
        // Hide the popover for the removed thread
        setPopoversVisible((prevState: { [key: string]: boolean }) => ({
          ...prevState,
          [id]: false
        }));
        // If the removed thread is currently selected, reset the chat and navigate to the chat page
        if (searchParams.get('threadID') === id) {
          searchParams.delete('threadID');
          navigate('/chat', { replace: true });
          // Reset the chat inner state after a delay to ensure the chat is fully reset
          setTimeout(() => {
            dispatch(setResetChatInner(Date.now()));
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
    <div className="w-[250px] bg-black/30 backdrop-blur-md overflow-y-auto remove-scrollbar fixed-height">
      {!isResponsive && (
        <div className="flex justify-between items-center  p-3 h-[60px]">
          <h3 className="text-base sm:text-xl text-white font-semibold">
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
                  {day.chats.map(conv => (
                    <div
                      key={conv.chatId}
                      aria-hidden
                      onClick={() => {
                        dispatch(setWaitingForThreadLoad(true));
                        dispatch(setResetChatInner(Date.now()));

                        setResetChatInner;
                        setSearchParams({
                          threadID: String(conv.chatId)
                        });
                      }}
                      className="flex  bg-default-50 relative items-center justify-between cursor-pointer text-white rounded-2xl  mb-2   p-3 z-10"
                    >
                      {conv?.servicePlan === 2 && (
                        <FcFlashOn
                          size={18}
                          className="absolute top-[-5px] right-[-5px]"
                        />
                      )}
                      <p className="text-white  leading-4  text-sm line-clamp-3">
                        {conv.firstMessageOfChat}
                      </p>
                      <Popover
                        key={conv?.chatId}
                        isOpen={popoversVisible[conv?.chatId] || false}
                        onOpenChange={() =>
                          setPopoversVisible({
                            [conv?.chatId]: true
                          })
                        }
                        placement="right"
                      >
                        <PopoverTrigger>
                          <Button
                            size="sm"
                            isIconOnly
                            className="bg-transparent rounded-full ml-2 !w-6 !h-8 !unit-lg"
                            aria-label="Remove chat"
                          >
                            <BsTrash size={16} className=" text-white" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <p>{t('deleteChatConfirmation')}</p>
                            <Divider className="my-2" />
                            <div className="w-full flex items-center gap-1">
                              <Button
                                size="sm"
                                className=" "
                                variant="bordered"
                                isLoading={removeLoading}
                                onClick={() => {
                                  removeThreadFromList(conv.chatId);
                                }}
                                aria-label="Remove thread"
                              >
                                {t('yesTxt')}
                              </Button>
                              <Button
                                size="sm"
                                className=" "
                                aria-label="Remove thread"
                                onClick={() =>
                                  setPopoversVisible({
                                    [conv?.chatId]: false
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

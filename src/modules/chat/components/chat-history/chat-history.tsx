import {
  setResetChatInner,
  setWaitingForThreadLoad
} from '@/redux/chat/chat-slice';
import { ChatService } from '@/services/chat-services/chat-services';
import { dictionary } from '@/utils/constants/dictionary';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Empty from '@/components/layout/empty';
import { IThreadHistoryList } from '../../types';

interface IChatHistoryProps {
  isResponsive?: boolean;
}

function ChatHistory({ isResponsive }: IChatHistoryProps) {
  const [threadHistory, setThreadHistory] = useState<IThreadHistoryList[]>();
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);

  const [popoversVisible, setPopoversVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchThreadHistory = async () => {
    try {
      const res = await ChatService.getInstance().fetchThreadHistory();
      if (res.isSuccess) {
        setThreadHistory(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeThreadFromList = async (id: string) => {
    setRemoveLoading(true);
    try {
      const res = await ChatService.getInstance().removeThread(id);
      if (res.isSuccess) {
        fetchThreadHistory();
        setPopoversVisible((prevState: { [key: string]: boolean }) => ({
          ...prevState,
          [id]: false
        }));
        if (searchParams.get('threadID') === id) {
          searchParams.delete('threadID');
          navigate('/chat', { replace: true });
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
    <div className="w-[250px] bg-darkBlack overflow-y-auto remove-scrollbar fixed-height">
      {!isResponsive && (
        <div className="flex justify-between items-center  p-3 h-[60px]">
          <h3 className="text-base sm:text-xl text-white font-semibold">
            {dictionary.az.previous} {dictionary.az.chats}
          </h3>
        </div>
      )}

      <div
        className={` p-3       lg:h-full  remove-scrollbar ${
          isResponsive ? 'h-full pt-3 pb-14 ' : 'h-[300px] xl:py-3  py-1'
        }`}
      >
        {threadHistory && threadHistory?.length !== 0 ? (
          threadHistory?.map(day => (
            <div key={day.dateOfChats} className="pb-5">
              {/* <div
                className={`text-sm font-medium mb-1  text-info text-[gray]`}
              >
                {dayjs(new Date(day.dateOfChats).toISOString()).format(
                  'DD.MM.YYYY'
                )}
              </div> */}
              <div className="flex items-center">
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
                  className="flex cursor-pointer relative items-center justify-between  text-white rounded-2xl    py-2 z-10"
                >
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
                        <p>Çatı silmək istəyinizə əminsinizmi?</p>
                        <Divider className="my-2" />
                        <div className="w-full flex items-center gap-1">
                          <Button
                            size="sm"
                            className=" "
                            isLoading={removeLoading}
                            onClick={() => {
                              removeThreadFromList(conv.chatId);
                            }}
                            aria-label="Remove thread"
                          >
                            {dictionary.az.yesTxt}
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
                            {dictionary.az.noTxt}
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
      </div>
    </div>
  );
}

export default ChatHistory;

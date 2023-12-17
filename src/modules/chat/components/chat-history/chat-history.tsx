import {
  setResetChatInner,
  setWaitingForThreadLoad
} from '@/redux/chat/chat-slice';
import { ChatService } from '@/services/chat-services/chat-services';
import { dictionary } from '@/utils/constants/dictionary';
import {
  Button,
  Card,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { BsFillFilterCircleFill, BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Empty from '@/components/layout/empty';
import { IThreadHistoryList } from '../../types';

function ChatHistory() {
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
    <Card className="  shadow  h-full ">
      <div className="flex justify-between items-center mb-4 bg-black p-3">
        <h2 className="text-base sm:text-xl text-white font-semibold">
          {dictionary.az.previous} {dictionary.az.chats}
        </h2>
        <Button
          size="sm"
          isIconOnly
          className="bg-white rounded-full"
          aria-label="Filter"
        >
          <BsFillFilterCircleFill size={20} color="#292D32" />
        </Button>
      </div>
      <div className="bg-white  overflow-y-auto rounded-lg shadow h-full  xl:py-3 xl:px-6 py-1 px-2 componentsScrollBar ">
        {threadHistory && threadHistory?.length !== 0 ? (
          threadHistory?.map(day => (
            <div key={day.dateOfChats} className="mb-4">
              <div className="text-black text-sm font-medium	  mb-2">
                {dayjs(new Date(day.dateOfChats).toISOString()).format(
                  'DD.MM.YYYY'
                )}
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
                  className="flex cursor-pointer relative items-center justify-between mb-2 bg-gray-100 rounded-2xl  pl-10 pr-3 py-2 z-10"
                >
                  <div
                    className={`absolute top-[0px] ${
                      conv.servicePlan === 2 ? 'bg-[#31FF90]' : 'bg-[#319CFF]'
                    } left-[0px] rounded-tl-mini rounded-2xl  rounded-tr-none rounded-br-none  w-[26px] h-full`}
                  />
                  <p className="text-black  leading-4  text-sm line-clamp-3">
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
                        className="bg-white rounded-full ml-2 !w-6 !h-8 !unit-lg"
                        aria-label="Remove chat"
                      >
                        <BsTrash size={16} className=" text-gray-500" />
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
    </Card>
  );
}

export default ChatHistory;

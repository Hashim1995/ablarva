import { setCurrentThreadId, setResetChatInner } from '@/redux/chat/chat-slice';
import { RootState } from '@/redux/store';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IThreadHistoryList } from '../../types';

function ChatHistory() {
  const [threadHistory, setThreadHistory] = useState<IThreadHistoryList[]>();
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);

  const [popoversVisible, setPopoversVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const { resetChatInner, currentThreadId } = useSelector(
    (state: RootState) => state.chat
  );

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

  const togglePopover = (id: any) => {
    setPopoversVisible((prevState: { [key: string]: boolean }) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
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
        const queryParams = new URLSearchParams(window.location.search);
        const threadID = queryParams.get('threadID');
        if (threadID === id) {
          searchParams.delete('threadID');
          dispatch(setCurrentThreadId(''));
          dispatch(setResetChatInner(Date.now()));
          navigate('/chat');
        }
      }
    } catch (err) {
      console.log(err);
    }
    setRemoveLoading(false);
  };

  useEffect(() => {
    fetchThreadHistory();
  }, [resetChatInner, currentThreadId]);
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
      <div className="bg-white  rounded-lg shadow  xl:py-3 xl:px-6 py-1 px-2 componentsScrollBar overflow-y-scroll">
        {threadHistory?.map(day => (
          <div key={day.dateOfChats} className="mb-4">
            <div className="text-black text-sm font-medium	  mb-2">
              {dayjs(new Date(day.dateOfChats).toISOString()).format(
                'DD.MM.YYYY'
              )}
            </div>
            {day.chats.map((conv, i) => (
              <div
                key={conv.chatId}
                aria-hidden
                onClick={() => {
                  dispatch(setCurrentThreadId(conv.chatId));

                  setSearchParams({
                    threadID: String(conv.chatId)
                  });
                }}
                className="flex cursor-pointer relative items-center justify-between mb-2 bg-gray-100 rounded-2xl  pl-10 pr-3 py-2 z-10"
              >
                <div className="absolute top-[0px] bg-[#18C964] left-[0px] rounded-tl-mini rounded-2xl  rounded-tr-none rounded-br-none  w-[26px] h-full" />
                <p className="text-black  leading-4  text-sm line-clamp-3">
                  {conv.firstMessageOfChat}
                </p>
                <Popover
                  isOpen={popoversVisible[i] || false}
                  onOpenChange={(isVisible: boolean) =>
                    setPopoversVisible(
                      (prevState: { [key: string]: boolean }) => ({
                        ...prevState,
                        [i]: isVisible
                      })
                    )
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
                          onClick={() => togglePopover(i)}
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
        ))}
      </div>
    </Card>
  );
}

export default ChatHistory;

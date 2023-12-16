/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Chip, useDisclosure } from '@nextui-org/react';
import { SubmitHandler } from 'react-hook-form';
import {
  IChatForm,
  ISendMessagePayload,
  IThreadBubblesItem
} from '@/modules/chat/types';
import { dictionary } from '@/utils/constants/dictionary';
import { TfiFaceSad } from 'react-icons/tfi';

import { BsRecycle } from 'react-icons/bs';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';

import { ChatService } from '@/services/chat-services/chat-services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  setCurrentThreadId,
  setWaitingForResponse,
  setWaitingForThreadLoad
} from '@/redux/chat/chat-slice';
import AiLoder from '@/core/static-components/ai-loader';
import VerifyEmail from '@/core/static-components/verify-email';
import ThinkText from '@/core/static-components/think-text';
import ChatBubble from './chat-bubble/chat-bubble';
import ChatForm from './chat-form';

function ChatInner() {
  const [bubbleList, setBubbleList] = useState<IThreadBubblesItem[]>([]);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastQuestion, setLastQuestion] = useState<string>('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    currentModel,
    currentThreadId,
    waitingForResponse,
    waitingForThreadLoad
  } = useSelector((state: RootState) => state.chat);
  const { verified } = useSelector((state: RootState) => state?.user?.user);
  const dispatch = useDispatch();
  const abortController = useRef(new AbortController());

  const resetAbortController = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
  };

  const onSubmit: SubmitHandler<IChatForm> = async data => {
    const currentAbortController = abortController.current;

    if (!verified) {
      onOpen();
    } else {
      setLastQuestion(data?.message);
      setBubbleList(old => [
        ...old,
        {
          answerId: null,
          content: data.message,
          isClient: true,
          isTyping: false,
          chatHistoryId: null,
          bubbleId: null
        }
      ]);

      dispatch(setWaitingForResponse(true));
      const payload: ISendMessagePayload = {
        servicePlan: Number(currentModel),
        question: data.message,
        chatId: currentThreadId || null
      };
      try {
        const res = await ChatService.getInstance().sendMessage(
          payload,
          undefined,
          currentAbortController.signal
        );
        if (res.isSuccess) {
          dispatch(setCurrentThreadId(res?.data?.chatHistoryId));

          setSearchParams({ threadID: String(res?.data?.chatHistoryId) });

          setBubbleList(old => [
            ...old,
            {
              answerId: res.data.answerId,
              content: res?.data?.content || '',
              isClient: res?.data?.isClient,
              isTyping: res?.data?.isTyping,
              questionId: res?.data?.questionId,
              voiceId: res?.data?.voiceId,
              chatHistoryId: res?.data?.chatHistoryId,
              bubbleId: res?.data?.bubbleId
            }
          ]);
        }
        dispatch(setWaitingForResponse(false));
        setHasError(false);
      } catch (err) {
        setHasError(true);
        dispatch(setWaitingForResponse(false));
      }
    }
  };
  const messengerBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messengerBoxRef.current) {
      messengerBoxRef?.current?.scrollIntoView({ behavior: 'smooth' });
      messengerBoxRef.current.scrollTop = messengerBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [bubbleList, waitingForResponse]);

  useEffect(
    () => () => {
      dispatch(setCurrentThreadId(''));
      setBubbleList([]);
      setHasError(false);
    },
    [searchParams]
  );
  useEffect(() => {
    resetAbortController();

    return () => {
      resetAbortController();
    };
  }, [searchParams, waitingForThreadLoad]);

  useEffect(() => {
    setHasError(false);
  }, [bubbleList]);

  const fetchThreadonUrl = async (id: string) => {
    dispatch(setWaitingForThreadLoad(true));
    try {
      const res = await ChatService.getInstance().fetchBubbleHistory(id);
      if (res.isSuccess) {
        setBubbleList(res?.data);
        dispatch(setWaitingForThreadLoad(false));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchParams.get('threadID')) {
      fetchThreadonUrl(searchParams.get('threadID') || '');
      dispatch(setCurrentThreadId(searchParams.get('threadID')));
    }
  }, [searchParams]);

  useEffect(() => {
    if (waitingForThreadLoad) {
      setBubbleList([]);
    }
  }, [waitingForThreadLoad]);

  return (
    <div className="flex flex-col gap-2 h-full  ">
      <div style={{ paddingBottom: 160 }} className="h-full">
        <ScrollToBottom
          scrollViewClassName="flex-grow flex-1 p-4 "
          followButtonClassName="hidden"
          className="row-span-8 componentsScrollBar overflow-x-auto   overflow-y-auto h-full"
        >
          {bubbleList?.map((item: IThreadBubblesItem) => (
            <ChatBubble
              message={item.content}
              isClient={item.isClient}
              isTyping={item.isTyping}
              // eslint-disable-next-line react/no-array-index-key
              key={window.crypto.randomUUID()}
              bubbleId={item?.bubbleId || ''}
              feedbackStatus={item?.feedbackStatus || null}
            />
          ))}
          {waitingForResponse && (
            <div className=" flex justify-start mt-2 items-center ">
              <AiLoder />
              {/* <div className="loader bg-black p-2 rounded-full flex space-x-3">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
              </div> */}
              <ThinkText />
            </div>
          )}
          {waitingForThreadLoad && (
            <div className="flex items-center justify-center h-full">
              <AiLoder />
            </div>
          )}

          {hasError && (
            <div className=" flex justify-center mt-2 gap-2 items-center ">
              <Chip startContent={<TfiFaceSad size={18} />} color="danger">
                Beynim yandı
              </Chip>
              <Button
                onClick={() => {
                  onSubmit({
                    message: lastQuestion
                  });
                }}
                type="button"
                startContent={
                  <Button
                    type="submit"
                    isIconOnly
                    size="sm"
                    className="bg-black rounded-full"
                  >
                    <BsRecycle size={18} color="white" />
                  </Button>
                }
                size="sm"
                className="bg-black text-white rounded-full pl-[2px]"
              >
                {dictionary.az.regenerate}
              </Button>
            </div>
          )}
        </ScrollToBottom>
      </div>

      <Card className=" flex-shrink-0 h-[120px] sm:h-[150px] row-span-4 absolute w-full bottom-0">
        <ChatForm waitingForResponse={waitingForResponse} onSubmit={onSubmit} />
      </Card>
      {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
    </div>
  );
}

export default ChatInner;

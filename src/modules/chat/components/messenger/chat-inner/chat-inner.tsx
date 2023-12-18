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
import { useSearchParams } from 'react-router-dom';
import {
  setCurrentChatModel,
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
  const [lastQuestion, setLastQuestion] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    currentChatLanguage,
    currentModel,
    waitingForResponse,
    waitingForThreadLoad
  } = useSelector((state: RootState) => state.chat);
  const { verified } = useSelector((state: RootState) => state?.user?.user);

  const dispatch = useDispatch();
  const abortController = useRef(new AbortController());
  const messengerBoxRef = useRef<HTMLDivElement>(null);

  const resetAbortController = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
  };
  const scrollToBottom = () => {
    if (messengerBoxRef.current) {
      messengerBoxRef?.current?.scrollIntoView({ behavior: 'smooth' });
      messengerBoxRef.current.scrollTop = messengerBoxRef.current.scrollHeight;
    }
  };

  const fetchThreadonUrl = async (id: string) => {
    dispatch(setWaitingForThreadLoad(true));
    try {
      const res = await ChatService.getInstance().fetchBubbleHistory(id);
      if (res.isSuccess) {
        setBubbleList(res?.data?.allBubbles);
        dispatch(setWaitingForThreadLoad(false));
        dispatch(setCurrentChatModel(res?.data?.parameters?.servicePlan));
      }
    } catch (err) {
      console.log(err);
    }
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
        language: Number(currentChatLanguage),
        chatId: searchParams.get('threadID') || null
      };
      try {
        const res = await ChatService.getInstance().sendMessage(
          payload,
          undefined,
          currentAbortController.signal
        );
        if (res.isSuccess) {
          setSearchParams({ threadID: String(res?.data?.chatHistoryId) });

          setBubbleList(oldBubbles => [
            ...oldBubbles.map(bubble => ({
              ...bubble,
              isTyping: false
            })),
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

  useEffect(() => {
    resetAbortController();

    return () => {
      resetAbortController();
    };
  }, [searchParams, waitingForThreadLoad]);

  useEffect(() => {
    setHasError(false);
    scrollToBottom();
  }, [bubbleList]);

  useEffect(() => {
    const threadID = searchParams.get('threadID');
    if (threadID) {
      fetchThreadonUrl(threadID);
    }
  }, [searchParams]);

  useEffect(() => {
    if (waitingForThreadLoad) {
      setBubbleList([]);
    }
  }, [waitingForThreadLoad]);

  useEffect(
    () => () => {
      setBubbleList([]);
      setHasError(false);
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col gap-2 h-full  ">
      <div style={{ paddingBottom: 160 }} className="h-full">
        <ScrollToBottom
          scrollViewClassName="flex-grow flex-1 p-4 "
          followButtonClassName="hidden"
          className="row-span-8 componentsScrollBar overflow-x-auto   overflow-y-auto h-full"
        >
          {bubbleList?.map((item: IThreadBubblesItem, index: number) => (
            <ChatBubble
              message={item.content}
              isClient={item.isClient}
              isTyping={item.isTyping}
              // eslint-disable-next-line react/no-array-index-key
              key={item?.bubbleId || index}
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

import { useEffect, useRef, useState } from 'react';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { SubmitHandler } from 'react-hook-form';
import {
  IChatForm,
  ISendMessagePayload,
  IThreadBubblesItem
} from '@/modules/chat/types';
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
import AiEmptyWelcome from '@/core/static-components/ai-empty-welcome';
import ThinkText from '@/core/static-components/think-text';
import { useTranslation } from 'react-i18next';
import ChatBubble from './chat-bubble/chat-bubble';
import ChatForm from './chat-form';

/**
 * `ChatInner` is a React component that renders the inner part of a chat interface.
 *
 * @component
 *
 * @description
 * This component manages the chat interface, including the chat bubbles, the chat form, and the email verification modal.
 *
 * The component uses several hooks from React and other libraries:
 * - `useState` to manage local state variables.
 * - `useEffect` to perform side effects, such as fetching the chat history when the URL changes.
 * - `useRef` to hold mutable values that may change over the lifecycle of the component.
 * - `useDispatch` and `useSelector` from `react-redux` to interact with the Redux store.
 * - `useSearchParams` from `react-router-dom` to read and write URL query parameters.
 * - `useDisclosure` from `@nextui-org/react` to manage the state of the email verification modal.
 * - `useTranslation` from `react-i18next` to translate text.
 *
 * The component maintains several state variables:
 * - `bubbleList`: An array of chat bubbles, each representing a message in the chat.
 * - `hasError`: A boolean indicating if there is an error.
 * - `lastQuestion`: The last question asked by the user.
 * - `searchParams`: The search parameters from the URL.
 * - `isOpen`: A boolean indicating if the email verification modal is open.
 *
 * The component also uses a ref (`messengerBoxRef`) to hold a reference to the chat box DOM element, and another ref (`abortController`) to hold an instance of `AbortController` for aborting fetch requests.
 *
 * The `resetAbortController` function is used to abort any ongoing fetch request and create a new `AbortController` instance.
 *
 * The `scrollToBottom` function is used to scroll the chat box to the bottom.
 *
 * The `fetchThreadonUrl` function is used to fetch the chat history when the URL changes.
 *
 * @returns {JSX.Element} The rendered `ChatInner` component.
 */
function ChatInner(): JSX.Element {
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
  const { t } = useTranslation();

  const { verified } = useSelector((state: RootState) => state?.user?.user);

  const dispatch = useDispatch();
  const abortController = useRef(new AbortController());
  const messengerBoxRef = useRef<HTMLDivElement>(null);

  // Abort any ongoing fetch request and create a new AbortController instance.
  const resetAbortController = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
  };

  // Scroll the chat box to the bottom.
  const scrollToBottom = () => {
    if (messengerBoxRef.current) {
      messengerBoxRef?.current?.scrollIntoView({ behavior: 'smooth' });
      messengerBoxRef.current.scrollTop = messengerBoxRef.current.scrollHeight;
    }
  };

  // Fetch the chat history when the URL changes.
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

  // Submit the chat form and send a message to the chat service.
  const onSubmit: SubmitHandler<IChatForm> = async data => {
    const currentAbortController = abortController.current;

    // If the user is not verified, open the email verification modal.
    if (!verified) {
      onOpen();
    } else {
      // Send the message to the chat service.
      setLastQuestion(data?.message);
      // Add the user's message to the chat bubble list.
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
          // Update the search parameters with the chat history ID.
          setSearchParams({ threadID: String(res?.data?.chatHistoryId) });
          // Add the response to the chat bubble list.
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

  // Scroll to the bottom of the chat box when the chat bubble list changes.
  useEffect(() => {
    setHasError(false);
    scrollToBottom();
  }, [bubbleList]);

  // Fetch the chat history when the URL changes.
  useEffect(() => {
    const threadID = searchParams.get('threadID');
    if (threadID) {
      fetchThreadonUrl(threadID);
    }
  }, [searchParams]);

  // Clear the chat bubble list when waiting for the thread to load.
  useEffect(() => {
    if (waitingForThreadLoad) {
      setBubbleList([]);
    }
  }, [waitingForThreadLoad]);

  // Clear the chat bubble list and reset the error state when the search parameters change.
  useEffect(
    () => () => {
      setBubbleList([]);
      setHasError(false);
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col gap-2 h-full    relative">
      <div className="h-full  pb-[13rem] container">
        <ScrollToBottom
          scrollViewClassName="flex-grow flex-1 p-4 "
          followButtonClassName="hidden"
          className="row-span-8 scroll-to-bottom-wrapper remove-scrollbar  overflow-x-auto   overflow-y-auto h-full"
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
            <div className=" flex justify-start mt-2 mb-5 items-center">
              <AiLoder />
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
                {t('myBrainBroken')}
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
                {t('regenerate')}
              </Button>
            </div>
          )}
          {!waitingForThreadLoad &&
            !hasError &&
            !waitingForResponse &&
            bubbleList?.length < 1 && <AiEmptyWelcome />}
        </ScrollToBottom>
      </div>

      <ChatForm waitingForResponse={waitingForResponse} onSubmit={onSubmit} />
      {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
    </div>
  );
}

export default ChatInner;

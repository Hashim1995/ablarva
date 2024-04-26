import { useEffect, useRef, useState } from 'react';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { SubmitHandler } from 'react-hook-form';

import { TfiFaceSad } from 'react-icons/tfi';

import { BsRecycle } from 'react-icons/bs';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useSearchParams } from 'react-router-dom';
import {
  setCurrentAssistantModel,
  setWaitingForAssistantResponse,
  setWaitingForAssistantThreadLoad
} from '@/redux/assistant/assistant-slice';
import AiLoder from '@/core/static-components/ai-loader';
import VerifyEmail from '@/core/static-components/verify-email';
import AiEmptyWelcome from '@/core/static-components/ai-empty-welcome';
import { EmaChatService } from '@/services/ema/ema-chat-services';
import {
  IAssistantChatForm,
  IAssistantSendMessagePayload,
  IAssistantThreadBubblesItem
} from '@/modules/EMA/chat/types';
import { toast } from 'react-toastify';
import ThinkText from '@/core/static-components/think-text';
import { toastOptions } from '@/configs/global-configs';
import { useTranslation } from 'react-i18next';
import { templateMessageTexts } from '@/utils/constants/texts';
import TempalteMessage from '@/components/layout/template-message';
import ChatBubble from './chat-bubble/chat-bubble';
import ChatForm from './chat-form';

/**
 * `ChatInner` is a React component that handles the chat functionality of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered `ChatInner` component.
 *
 * @example
 * <ChatInner />
 *
 * @description
 * It manages the state of the chat, including the list of chat bubbles, error state, last question asked, and search parameters.
 * It also handles the submission of chat messages, fetching of chat history, and scrolling to the bottom of the chat.
 *
 * The component uses several hooks from React and other libraries:
 * - `useState` for managing local state.
 * - `useEffect` for handling side effects.
 * - `useRef` for referencing DOM elements and mutable variables.
 * - `useDisclosure` for managing the state of disclosure components.
 * - `useSelector` and `useDispatch` for interacting with the Redux store.
 * - `useSearchParams` for accessing and updating the URL search parameters.
 * - `useTranslation` for internationalization.
 *
 * The component dispatches several actions to the Redux store:
 * - `setCurrentAssistantModel` to set the current assistant model.
 * - `setWaitingForAssistantResponse` to indicate whether the assistant is currently processing a response.
 * - `setWaitingForAssistantThreadLoad` to indicate whether the assistant is currently loading a thread.
 *
 * The component also interacts with the `AssistantService` to fetch the chat history and send messages.
 */
function ChatInner(): JSX.Element {
  const { t } = useTranslation();

  const [bubbleList, setBubbleList] = useState<IAssistantThreadBubblesItem[]>(
    []
  );
  const [hasError, setHasError] = useState(false);
  const [lastQuestion, setLastQuestion] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    currentAssistantLanguage,
    currentAssistantModel,
    waitingForAssistantResponse,
    waitingForAssistantThreadLoad
  } = useSelector((state: RootState) => state.assistant);
  const { verified } = useSelector((state: RootState) => state?.user?.user);

  const dispatch = useDispatch();
  const abortController = useRef(new AbortController());
  const messengerBoxRef = useRef<HTMLDivElement>(null);

  // Reset the abort controller when the component is unmounted
  const resetAbortController = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messengerBoxRef.current) {
      messengerBoxRef?.current?.scrollIntoView({ behavior: 'smooth' });
      messengerBoxRef.current.scrollTop = messengerBoxRef.current.scrollHeight;
    }
  };

  // Fetch the chat history from the URL
  const fetchThreadonUrl = async (id: string) => {
    // Set the waiting state to true
    dispatch(setWaitingForAssistantThreadLoad(true));
    try {
      const res = await EmaChatService.getInstance().fetchBubbleHistory(id);
      if (res.isSuccess) {
        // Set the bubble list and assistant model from the response data and set the waiting state to false once the data is fetched successfully
        setBubbleList(res?.data?.allThreadBubbles);
        dispatch(setWaitingForAssistantThreadLoad(false));
        dispatch(
          setCurrentAssistantModel({
            assistantId: res?.data?.assistantParameters?.assistantId,
            assistantImagePath:
              res?.data?.assistantParameters?.assistantImagePath,
            assistantDescription:
              res?.data?.assistantParameters?.assistantDescription,
            assistanName: res?.data?.assistantParameters?.assistantName
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle the submission of chat messages
  const onSubmit: SubmitHandler<IAssistantChatForm> = async data => {
    // Get the current abort controller
    const currentAbortController = abortController.current;

    // If the user is not verified, open the email verification modal
    if (!verified) {
      onOpen();
    } else if (!currentAssistantModel?.assistantId) {
      // If the assistant model is not set, show an error message
      toast.error(
        t('youShouldSelectOneAssistantForConversation'),
        toastOptions
      );
    } else {
      // If the assistant model is set, set the last question and add the user's message to the bubble list
      setLastQuestion(data?.message);
      setBubbleList(old => [
        ...old,
        {
          answerId: null,
          assistantContent: data.message,
          isClient: true,
          isTyping: false,
          assistantThreadId: null,
          assistantBubbleId: null
        }
      ]);

      dispatch(setWaitingForAssistantResponse(true));
      const payload: IAssistantSendMessagePayload = {
        assistantId: currentAssistantModel?.assistantId,
        question: data.message,
        languagesEnum: Number(currentAssistantLanguage),
        threadId: searchParams.get('threadID') || null
      };
      try {
        const res = await EmaChatService.getInstance().sendMessage(
          payload,
          undefined,
          currentAbortController.signal
        );
        if (res.isSuccess) {
          // Set the bubble list and search parameters from the response data and set the waiting state to false once the data is fetched successfully
          setSearchParams({ threadID: String(res?.data?.assistantThreadId) });
          setBubbleList(oldBubbles => [
            ...oldBubbles.map(bubble => ({
              ...bubble,
              isTyping: false
            })),
            {
              assistantContent: res?.data?.assistantContent || '',
              isClient: res?.data?.isClient,
              isTyping: res?.data?.isTyping,
              assistantThreadId: res?.data?.assistantThreadId,
              assistantBubbleId: res?.data?.assistantBubbleId,
              assistantName: res?.data?.assistantName,
              assistantImagePath: res?.data?.assistantImagePath
            }
          ]);
        }
        dispatch(setWaitingForAssistantResponse(false));
        setHasError(false);
      } catch (err) {
        setHasError(true);
        dispatch(setWaitingForAssistantResponse(false));
      }
    }
  };

  // Reset the abort controller when the component is unmounted
  useEffect(() => {
    resetAbortController();
    return () => {
      resetAbortController();
    };
  }, [searchParams, waitingForAssistantThreadLoad]);

  // Scroll to the bottom of the chat when the bubble list changes
  useEffect(() => {
    setHasError(false);
    scrollToBottom();
  }, [bubbleList]);

  // Fetch the chat history from the URL when the thread ID changes
  useEffect(() => {
    const threadID = searchParams.get('threadID');
    if (threadID) {
      fetchThreadonUrl(threadID);
    }
  }, [searchParams]);

  // Clear the bubble list when the assistant thread is loading
  useEffect(() => {
    if (waitingForAssistantThreadLoad) {
      setBubbleList([]);
    }
  }, [waitingForAssistantThreadLoad]);

  // Clear the bubble list and error state when the search parameters change
  useEffect(
    () => () => {
      setBubbleList([]);
      setHasError(false);
    },
    [searchParams]
  );

  return (
    <>
      <div className="flex flex-col flex-1 gap-6 p-6 rounded-t-lg w-full h-full overflow-y-scroll remove-scrollbar scroll-smooth">
        <ScrollToBottom
          scrollViewClassName="flex-grow flex-1  "
          followButtonClassName="hidden"
          className="scroll-to-bottom-wrapper h-full overflow-x-auto overflow-y-auto remove-scrollbar"
        >
          {bubbleList?.map(
            (item: IAssistantThreadBubblesItem, index: number) => (
              <ChatBubble
                assistantContent={item?.assistantContent}
                isClient={item.isClient}
                isTyping={item.isTyping}
                // eslint-disable-next-line react/no-array-index-key
                key={item?.assistantBubbleId || index}
                assistantBubbleId={item?.assistantBubbleId || ''}
                feedbackStatus={item?.feedbackStatus || null}
                assistantImagePath={item?.assistantImagePath}
                assistantName={item?.assistantName}
                assistantThreadId={item?.assistantThreadId}
              />
            )
          )}
          {waitingForAssistantResponse && (
            <div className="flex justify-start items-center mt-2 mb-5">
              <AiLoder />
              <ThinkText />
            </div>
          )}
          {waitingForAssistantThreadLoad && (
            <div className="flex justify-center items-center h-full">
              <AiLoder />
            </div>
          )}
          {hasError && (
            <div className="flex justify-center items-center gap-2 mt-2 text-default-800 dark:text-white">
              <Chip
                startContent={<TfiFaceSad size={18} />}
                className="text-sm"
                color="danger"
              >
                {t('myBrainBroken')}
              </Chip>
              <Button
                title="Regenerate the last question"
                aria-label="Regenerate the last question"
                onClick={() => {
                  onSubmit({
                    message: lastQuestion
                  });
                }}
                type="button"
                startContent={
                  <Button
                    type="submit"
                    aria-label="Regenerate the last question icon"
                    isIconOnly
                    size="sm"
                    className="rounded-full text-default-800 dark:text-white"
                  >
                    <BsRecycle size={18} />
                  </Button>
                }
                size="sm"
                className="pl-[2px] rounded-full text-default-900 dark:text-white"
              >
                {t('regenerate')}
              </Button>
            </div>
          )}
          {!waitingForAssistantThreadLoad &&
            !hasError &&
            !waitingForAssistantResponse &&
            bubbleList?.length < 1 && (
              <div className="flex flex-col justify-between h-full">
                <AiEmptyWelcome />
                {currentAssistantModel?.assistantId ? (
                  <div className="gap-2 grid grid-cols-2 sm:grid-cols-2 mt-5 p-5">
                    {templateMessageTexts?.map((item: string) => (
                      <TempalteMessage
                        key={item}
                        text={item}
                        onSubmit={onSubmit}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            )}
        </ScrollToBottom>
      </div>

      {/* <div className="container"> */}
      <ChatForm
        waitingForResponse={waitingForAssistantResponse}
        onSubmit={onSubmit}
      />
      {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
    </>
  );
}

export default ChatInner;

/* eslint-disable consistent-return */
import Typewriter from '@/components/layout/type-writer';
import { toastOptions } from '@/configs/global-configs';
import {
  IAssistantFeedbackPayload,
  IAssistantThreadBubblesItem
} from '@/modules/assistant/types';
import { RootState } from '@/redux/store';
import { AssistantService } from '@/services/assistant-services/assistant-services';
import { Avatar, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsHandThumbsDownFill } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ChatBubble({
  assistantContent,
  isTyping,
  isClient,
  assistantBubbleId,
  feedbackStatus,
  assistantImagePath
}: IAssistantThreadBubblesItem) {
  const [liked, setLiked] = useState(false);
  const [dislike, setDisliked] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const feedbackBubble = async (type: number) => {
    const payload: IAssistantFeedbackPayload = {
      assistantBubbleId,
      feedbackStatus: type
    };
    try {
      const res = await AssistantService.getInstance().sendFeedback(payload);
      if (res.isSuccess) {
        if (type === 1) {
          setLiked(true);
        } else {
          setDisliked(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => () => {
      setDisliked(false);
      setLiked(false);
    },
    []
  );

  return (
    <div className="bubble  flex sm:gap-5 gap-3 bg-transparent   rounded-lg p-3 my-3">
      <Avatar
        name="Junior"
        src={
          isClient
            ? `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`
            : `${import.meta.env.VITE_BASE_URL}${assistantImagePath}`
        }
      />
      <div className=" flex-1 markdown-table-container overflow-auto">
        {/* <h3 className={` ${isClient ? '' : 'border-b-1 border-white'}  mb-2`}>
          {assistantName}
        </h3> */}
        <Typewriter message={assistantContent} isTyping={isTyping} />
        <div className="flex mt-3 items-center justify-between">
          <div className="flex  gap-2  items-center justify-between">
            {!isClient && (
              <>
                <Button
                  type="button"
                  isIconOnly
                  title="Dislike"
                  aria-label="Dislike"
                  isDisabled={
                    dislike ||
                    liked ||
                    feedbackStatus === 1 ||
                    feedbackStatus === 2
                  }
                  onClick={() => feedbackBubble(1)}
                  size="sm"
                  className={`${
                    liked || feedbackStatus === 1 ? 'bg-black' : 'bg-white'
                  }  rounded-full`}
                >
                  <BsHandThumbsDownFill
                    size={16}
                    color={`${
                      liked || feedbackStatus === 1 ? 'white' : '#292D32'
                    }`}
                  />
                </Button>
                <Button
                  type="submit"
                  title="Like"
                  aria-label="Like"
                  isIconOnly
                  isDisabled={
                    liked ||
                    dislike ||
                    feedbackStatus === 1 ||
                    feedbackStatus === 2
                  }
                  onClick={() => feedbackBubble(2)}
                  size="sm"
                  className={`${
                    dislike || feedbackStatus === 2 ? 'bg-black' : 'bg-white'
                  }  rounded-full`}
                >
                  <BsHandThumbsDownFill
                    size={16}
                    color={`${
                      dislike || feedbackStatus === 2 ? 'white' : '#292D32'
                    }`}
                    className="rotate-180"
                  />
                </Button>
              </>
            )}
          </div>
          <div className="flex  gap-2  items-center justify-between">
            <Button
              type="button"
              title="Copy to Clipboard"
              aria-label="Copy to Clipboard"
              onClick={() => {
                navigator.clipboard.writeText(assistantContent).then(
                  () => {
                    toast.success(
                      t('dataCopiedToClipboardSuccessFully'),
                      toastOptions
                    );
                  },
                  err => {
                    console.error('Async: Could not copy text: ', err);
                  }
                );
              }}
              size="sm"
              className="bg-transparent rounded-full pl-0"
            >
              <FaCopy color="white" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;

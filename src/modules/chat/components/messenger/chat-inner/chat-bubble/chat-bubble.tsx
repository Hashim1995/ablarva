/* eslint-disable consistent-return */
import Typewriter from '@/components/layout/type-writer';
import { toastOptions } from '@/configs/global-configs';
import { IFeedbackPayload } from '@/modules/chat/types';
import { RootState } from '@/redux/store';
import { ChatService } from '@/services/chat-services/chat-services';

import { Avatar, Button } from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsHandThumbsDownFill } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface IBubble {
  message: string;
  isClient: boolean;
  isTyping: boolean;
  feedbackStatus: number | null;
  bubbleId: string;
}

function ChatBubble({
  message,
  isTyping,
  isClient,
  bubbleId,
  feedbackStatus
}: IBubble) {
  const [liked, setLiked] = useState(false);
  const [dislike, setDisliked] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const feedbackBubble = async (type: number) => {
    const payload: IFeedbackPayload = {
      bubbleId,
      feedbackStatus: type
    };
    try {
      const res = await ChatService.getInstance().sendFeedback(payload);
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
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXdOAnEBb4e_d0YITbc9hDL3Ex-EbHzQemJKiJc_xxO7gCR5YLgPcGpMonCKpeMmifJoY&usqp=CAU'
        }
      />
      <div className=" flex-1 markdown-table-container overflow-auto">
        <Typewriter message={message} isTyping={isTyping} />
        <div className="flex mt-3 items-center justify-between">
          <div className="flex  gap-2  items-center justify-between">
            {!isClient && (
              <>
                <Button
                  type="button"
                  title="Dislike"
                  aria-label="Dislike"
                  isIconOnly
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
                navigator.clipboard.writeText(message).then(
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

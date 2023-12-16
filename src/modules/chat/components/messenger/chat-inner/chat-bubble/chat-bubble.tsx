/* eslint-disable consistent-return */
import { toastOptions } from '@/configs/global-configs';
import { IFeedbackPayload } from '@/modules/chat/types';
import { ChatService } from '@/services/chat-services/chat-services';
import { dictionary } from '@/utils/constants/dictionary';
import { markdownOptions } from '@/utils/constants/options';
import { Avatar, Button } from '@nextui-org/react';

import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import { BsHandThumbsDownFill, BsClipboard2CheckFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useReadLocalStorage } from 'usehooks-ts';

interface IBubble {
  message: string;
  isClient: boolean;
  isTyping: boolean;
  feedbackStatus: number | null;
  bubbleId: string;
}
interface ITypewriter {
  message: string;
  isTyping: boolean;
}
const typewriterSound = new Audio(
  'https://assets.codepen.io/162656/audio-old-typewriter.wav'
);

function Typewriter({ message, isTyping }: ITypewriter) {
  const [displayedContent, setDisplayedContent] = useState('');
  const audioEnable = useReadLocalStorage('audioEnable');

  useEffect(() => {
    if (!isTyping) return;

    if (displayedContent.length < message.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedContent(message.slice(0, displayedContent.length + 1));
        audioEnable && typewriterSound.play();
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        typewriterSound.pause();
      };
    }

    // Stop the sound when the full message is displayed
    if (audioEnable) {
      typewriterSound.pause();
      typewriterSound.currentTime = 0;
    }
  }, [displayedContent, message, isTyping]);

  return (
    <Markdown options={markdownOptions}>
      {isTyping ? displayedContent : message}
    </Markdown>
  );
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
    <div className="bubble flex gap-5 bg-[#F0F1F3] rounded-lg p-3 my-3">
      <Avatar name="Junior" />
      <div className=" flex-1 markdown-table-container">
        <Typewriter message={message} isTyping={isTyping} />
        <div className="flex mt-3 items-center justify-between">
          <div className="flex  gap-2  items-center justify-between">
            {!isClient && (
              <>
                <Button
                  type="button"
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
              onClick={() => {
                navigator.clipboard.writeText(message).then(
                  () => {
                    toast.success('Məlumat uğurla kopyalandı', toastOptions);
                  },
                  err => {
                    console.error('Async: Could not copy text: ', err);
                  }
                );
              }}
              startContent={
                <Button
                  type="submit"
                  isIconOnly
                  size="sm"
                  className="bg-foreground-200 rounded-full"
                >
                  <BsClipboard2CheckFill size={16} color="#292D32" />
                </Button>
              }
              size="sm"
              className="bg-white rounded-full pl-0"
            >
              {dictionary.az.copy}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;

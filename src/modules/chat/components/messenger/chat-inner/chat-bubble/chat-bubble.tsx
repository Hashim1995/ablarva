/* eslint-disable consistent-return */
import { dictionary } from '@/utils/constants/dictionary';
import { markdownOptions } from '@/utils/constants/options';
import { Avatar, Button } from '@nextui-org/react';

import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import { BsHandThumbsDownFill, BsClipboard2CheckFill } from 'react-icons/bs';
import { useReadLocalStorage } from 'usehooks-ts';

interface IBubble {
  message: string;
  isTyping: boolean;
}
const typewriterSound = new Audio(
  'https://assets.codepen.io/162656/audio-old-typewriter.wav'
);

function Typewriter({ message, isTyping }: IBubble) {
  const [displayedContent, setDisplayedContent] = useState('');
  const audioEnable = useReadLocalStorage('audioEnable');

  useEffect(() => {
    if (!isTyping) return;

    if (displayedContent.length < message.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedContent(message.slice(0, displayedContent.length + 1));
        audioEnable && typewriterSound.play();
      }, 10);

      return () => clearTimeout(timeoutId);
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

function ChatBubble({ message, isTyping }: IBubble) {
  return (
    <div className="bubble flex gap-5 bg-[#F0F1F3] rounded-lg p-3 my-3">
      <Avatar name="Junior" />
      <div className=" flex-1 markdown-table-container">
        <Typewriter message={message} isTyping={isTyping} />
        <div className="flex mt-3 items-center justify-between">
          <div className="flex  gap-2  items-center justify-between">
            <Button
              type="button"
              isIconOnly
              size="sm"
              className="bg-white rounded-full"
            >
              <BsHandThumbsDownFill size={16} color="#292D32" />
            </Button>
            <Button
              type="submit"
              isIconOnly
              size="sm"
              className="bg-white rounded-full"
            >
              <BsHandThumbsDownFill
                size={16}
                color="#292D32"
                className="rotate-180"
              />
            </Button>
          </div>
          <div className="flex  gap-2  items-center justify-between">
            <Button
              type="button"
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

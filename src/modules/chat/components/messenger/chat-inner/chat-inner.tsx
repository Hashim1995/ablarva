/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import OpenAI from 'openai';
import { Button, Card } from '@nextui-org/react';
import { SubmitHandler } from 'react-hook-form';
import { IChatForm } from '@/modules/chat/types';
import { dictionary } from '@/utils/constants/dictionary';
import { BsRecycle } from 'react-icons/bs';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';

import ChatForm from './chat-form';
import ChatBubble from './chat-bubble/chat-bubble';

interface IBubble {
  message: string;
  isTyping: boolean;
}

function ChatInner() {
  const [bubbleList, setBubbleList] = useState<IBubble[]>([]);
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true
  });

  async function main(message: string) {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      model: 'gpt-3.5-turbo'
    });
    console.log(chatCompletion, 'mudahim');
    return chatCompletion;
  }

  const onSubmit: SubmitHandler<IChatForm> = async data => {
    // Add your own message without the typewriter effect
    setBubbleList(old => [...old, { message: data.message, isTyping: false }]);
    setLoading(true);

    try {
      const res = await main(data.message);

      setBubbleList(old => [
        ...old,
        { message: res.choices[0].message.content || '', isTyping: true }
      ]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const messengerBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    console.log('called');
    if (messengerBoxRef.current) {
      messengerBoxRef?.current?.scrollIntoView({ behavior: 'smooth' });
      messengerBoxRef.current.scrollTop = messengerBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [bubbleList, loading]);

  return (
    <div className="flex flex-col gap-2 h-full  ">
      <div style={{ paddingBottom: 205 }} className="h-full">
        <ScrollToBottom
          scrollViewClassName="flex-grow flex-1 p-4 !h-[300px]"
          followButtonClassName="hidden"
          className="row-span-8 overflow-y-auto h-full"
        >
          {bubbleList?.map((item: IBubble, i) => (
            <ChatBubble
              message={item.message}
              isTyping={item.isTyping}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
            />
          ))}
          {loading && (
            <div className=" flex justify-center mt-2 items-center ">
              <div className="loader bg-black p-2 rounded-full flex space-x-3">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
              </div>
            </div>
          )}
          {!loading && bubbleList?.length > 0 && (
            <div className="flex justify-center mt-3 items-center w-full">
              <Button
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
        <ChatForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
}

export default ChatInner;

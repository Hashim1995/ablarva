/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useRef, useState } from 'react';
import OpenAI from 'openai';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Markdown from 'markdown-to-jsx';
import { Button, Card, Divider, Textarea } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IChatForm } from '@/modules/chat/types';
import { dictionary } from '@/utils/constants/dictionary';
import { BsRecycle } from 'react-icons/bs';
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

      // Add OpenAI's response with the typewriter effect
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
    <div className="xl:h-full h-[600px]  bg-white   ">
      <div
        ref={messengerBoxRef}
        className="messenger-box h-[77%] mb-6 p-4 overflow-y-auto "
      >
        <div>
          {bubbleList?.map((item: IBubble, i) => (
            <ChatBubble
              message={item.message}
              isTyping={item.isTyping}
              key={i}
            />
          ))}
          {loading && (
            <div className="h-full flex justify-center mt-2 items-center ">
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
        </div>
      </div>

      <Card className=" h-[20%] ">
        <ChatForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
}

export default ChatInner;

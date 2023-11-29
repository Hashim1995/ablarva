/* eslint-disable no-unused-vars */
import { useState } from 'react';
import OpenAI from 'openai';
import { Button, Card } from '@nextui-org/react';
import { SubmitHandler } from 'react-hook-form';
import { IChatForm } from '@/modules/chat/types';
import { dictionary } from '@/utils/constants/dictionary';
import { BsRecycle } from 'react-icons/bs';
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
  // const messengerBoxRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   console.log('called');
  //   if (messengerBoxRef.current) {
  //     messengerBoxRef?.current?.scrollIntoView({ behavior: 'smooth' });
  //     messengerBoxRef.current.scrollTop = messengerBoxRef.current.scrollHeight;
  //   }
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [bubbleList, loading]);

  return (
    <div className="flex flex-col gap-2 h-full  ">
      <ScrollToBottom
        scrollViewClassName="flex-grow flex-1 p-4"
        followButtonClassName="hidden"
        className=" flex-grow flex-1 row-span-8 overflow-y-auto h-full"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
        quasi id molestias minus dicta modi numquam quibusdam consequuntur.
        Expedita earum amet nihil libero nam obcaecati vel explicabo? Harum, sit
        atque. Repudiandae rem perferendis dolores distinctio nihil magnam
        eveniet numquam commodi enim beatae, consequatur fugit voluptatem, animi
        impedit harum porro nam perspiciatis vel laborum nesciunt! Hic iusto
        voluptatibus ab minima consequatur? Ullam ducimus, voluptas vel non
        dolor repellendus beatae assumenda cumque est, excepturi sapiente quod
        quos perspiciatis! Officiis eum iusto quaerat, adipisci blanditiis totam
        eos earum optio incidunt itaque sint? Provident! Excepturi, nemo animi
        quasi, dolor consequatur vitae necessitatibus alias molestias, ex culpa
        numquam! Velit, distinctio. Odio velit consequatur eveniet adipisci
        dolorum neque beatae? Fuga expedita perspiciatis, id dignissimos totam
        perferendis. Distinctio a nostrum, corrupti expedita, inventore ad, odit
        ratione iusto sint autem suscipit ea? Dolorum, ad! Minus, ducimus quod
        odio voluptas eligendi veniam fuga natus laudantium deleniti vitae,
        repellendus libero? Aliquam dolorum ex, dignissimos nesciunt enim nobis
        magni consequatur perspiciatis mollitia omnis qui excepturi ab nam
        quibusdam voluptates rerum quos quia ad laborum nulla iure aliquid animi
        necessitatibus sunt. Incidunt! Culpa id et, voluptate deserunt animi
        doloribus aliquam consectetur fugit est dolores. Cum impedit iusto alias
        quasi. Earum nulla dignissimos harum? Eum soluta aut veritatis quod.
        Porro odit aperiam similique. Saepe rem qui nemo, iure facilis commodi
        vero quia minima voluptatibus sunt eum labore similique corrupti tempore
        voluptates. Mollitia, quisquam pariatur ipsam ut commodi est voluptates
        doloribus officiis voluptatum similique? Nobis magni cum aliquam a
        repellat, aperiam fuga consequuntur ipsum quae in laborum eum dicta
        eaque ullam adipisci quaerat non, inventore, consequatur obcaecati enim
        ab vero numquam quod est. Veritatis. Eligendi maiores, accusamus
        reiciendis voluptate neque unde, ullam excepturi, error suscipit in nisi
        earum temporibus exercitationem corporis aliquam impedit esse amet
        culpa. Esse quo magnam, autem quam quaerat qui rerum. Quidem libero illo
        atque fuga reprehenderit quod temporibus facilis consequuntur, mollitia
        iste? Enim itaque voluptas deserunt pariatur? Corporis, suscipit
        voluptates? Nam accusamus ex architecto illum eum minima, dicta
        assumenda recusandae. Quo facere ullam nam nesciunt obcaecati omnis
        quos. Numquam commodi soluta ab, hic voluptate mollitia quibusdam quod
        placeat esse quae iusto, ea accusantium vel unde adipisci, praesentium
        odio molestias. Commodi.
        {/* {bubbleList?.map((item: IBubble, i) => (
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
        )} */}
      </ScrollToBottom>

      <Card className=" flex-shrink-0 h-[170px] row-span-4">
        <ChatForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
}

export default ChatInner;

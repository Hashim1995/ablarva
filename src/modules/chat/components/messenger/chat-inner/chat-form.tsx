/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { BsFillMicFill, BsFillSendFill } from 'react-icons/bs';
import { AiFillSound, AiOutlineSound } from 'react-icons/ai';

import { textAreaConfig } from '@/configs/global-configs';
import { IChatForm } from '@/modules/chat/types';

import { useLocalStorage, useMediaQuery } from 'usehooks-ts';
import audioUrl from './mech-keyboard-02-102918.mp3';

interface IChatFormProps {
  onSubmit: SubmitHandler<IChatForm>;
  waitingForResponse: boolean;
}

function ChatForm({ onSubmit, waitingForResponse }: IChatFormProps) {
  // Initialize the hook form methods
  const { register, handleSubmit, reset } = useForm<IChatForm>();
  const [audioEnable, setAudioEnable] = useLocalStorage<Boolean>(
    'audioEnable',
    true
  );

  const typewriterSound = new Audio(audioUrl);
  const matches = useMediaQuery('(min-width: 468px)');

  return (
    <form
      onSubmit={handleSubmit(z => {
        onSubmit(z);
        reset();
      })}
      className="  bg-[#FBF9F9] shadow  rounded-xl relative   h-full"
    >
      {/* Message Textarea Field */}
      <Textarea
        {...register('message', { required: true })}
        variant="bordered"
        fullWidth
        color="primary"
        placeholder="Type a message..."
        classNames={textAreaConfig}
        className="flex-1 !border-none !shadow-none !outline-none !active:border-none !active:shadow-none !active:outline-none !focus:border-none !focus:shadow-none !focus:outline-none !hover:border-none !hover:shadow-none !hover:outline-none"
        rows={3}
        onKeyDown={e => {
          // Check if the key pressed is 'Enter' and there is no shift key pressed
          if (audioEnable) {
            typewriterSound.currentTime = 0; // Reset the typewriterSound to the start
            typewriterSound.play();
          }

          if (e.key === 'Enter' && !e.shiftKey && !waitingForResponse) {
            e.preventDefault(); // Prevent the default behavior of Enter key in a textarea (which is to insert a new line)
            handleSubmit(onSubmit)(); // Call the submit handler
            reset();
          }
        }}
        maxRows={matches ? 3 : 2}
      />

      <div className="flex w-full px-5 items-center justify-between absolute bottom-0 z-20 bg-[#E2E0E0]  h-10 sm:h-12">
        <Button
          type="button"
          isIconOnly
          size="sm"
          onClick={() => setAudioEnable(z => !z)}
          className="bg-black rounded-full "
        >
          {audioEnable ? (
            <AiFillSound size={16} color="white" />
          ) : (
            <AiOutlineSound size={16} color="white" />
          )}{' '}
        </Button>
        <div className="flex  gap-2  items-center justify-between">
          <Button
            type="button"
            isIconOnly
            size="sm"
            className="bg-black rounded-full"
          >
            <BsFillMicFill size={16} color="white" />
          </Button>
          <Button
            type="submit"
            isIconOnly
            size="sm"
            isDisabled={waitingForResponse}
            className="bg-black rounded-full"
          >
            <BsFillSendFill size={16} color="white" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ChatForm;

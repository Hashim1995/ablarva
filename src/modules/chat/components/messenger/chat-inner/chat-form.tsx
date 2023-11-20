/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { BsFillMicFill, BsFillSendFill } from 'react-icons/bs';
import { textAreaConfig } from '@/configs/global-configs';
import { IChatForm } from '@/modules/chat/types';

interface IChatFormProps {
  onSubmit: SubmitHandler<IChatForm>;
}

function ChatForm({ onSubmit }: IChatFormProps) {
  // Initialize the hook form methods
  const { register, handleSubmit } = useForm<IChatForm>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="  bg-[#FBF9F9] shadow  rounded-xl relative   h-44"
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
        maxRows={3}
      />

      <div className="flex w-full items-center justify-between absolute bottom-0 z-20 bg-[#E2E0E0] rounded-2xl h-12">
        {/* <label htmlFor="file-upload" className="cursor-pointer p-2">
          <BsPaperclip
            size={24}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          />
          <input id="file-upload" type="file" className="hidden" />
        </label> */}
        <div />
        <div className="flex  gap-2 px-5 items-center justify-between">
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

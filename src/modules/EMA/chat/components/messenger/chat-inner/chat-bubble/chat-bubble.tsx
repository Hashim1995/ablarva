/* eslint-disable consistent-return */
import Typewriter from '@/components/layout/type-writer';
import { toastOptions } from '@/configs/global-configs';
import { IAssistantThreadBubblesItem } from '@/modules/EMA/chat/types';
import { RootState } from '@/redux/store';
import { Avatar, Button } from '@nextui-org/react';
import { TbClipboardCopy } from 'react-icons/tb';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ChatBubble({
  assistantContent,
  isTyping,
  isClient,
  assistantImagePath
}: IAssistantThreadBubblesItem) {
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <div
      className={`bubble  flex  gap-1 bg-transparent   rounded-lg p-3 my-3 ${
        isClient ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className="flex flex-col items-center gap-1">
        <Avatar
          name="Junior"
          src={
            isClient
              ? `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`
              : `${import.meta.env.VITE_BASE_URL}${assistantImagePath}`
          }
        />
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
          className="bg-transparent rounded-full"
        >
          <TbClipboardCopy
            className="text-default-900 dark:text-white"
            size={16}
          />
        </Button>
      </div>

      <div
        className={`markdown-table-container p-3 px-4 rounded-3xl max-w-2xl  bg-gradient-to-r from-rose-50 dark:from-inherit dark:to-inherit to-teal-50   dark:bg-default-50/50   w-3/5  overflow-auto ${
          isClient ? 'rounded-tr-none ' : 'rounded-tl-none '
        }`}
      >
        {/* <h3 className={` ${isClient ? '' : 'border-b-1 border-white'}  mb-2`}>
          {assistantName}
        </h3> */}
        <Typewriter message={assistantContent} isTyping={isTyping} />
        <div className="flex justify-between items-center mt-3">
          <div className="flex justify-between items-center gap-2">
            {/* {!isClient && (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;

import { markdownOptions } from '@/utils/constants/options';
import { Avatar, Button, Divider } from '@nextui-org/react';

import Markdown from 'markdown-to-jsx';
import { BsHandThumbsDownFill, BsClipboard2CheckFill } from 'react-icons/bs';

function ChatBubble({ item }: any) {
  return (
    <>
      <div className="bubble flex gap-5 bg-[#F0F1F3] rounded-lg p-3 my-3">
        <Avatar name="Junior" />
        <div className=" flex-1 markdown-table-container">
          <Markdown options={markdownOptions}>{item}</Markdown>
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
                Kopyala
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default ChatBubble;

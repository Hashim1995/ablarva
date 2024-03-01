/* eslint-disable import/no-unresolved */
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Textarea,
  Tabs,
  Tab,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import { BsFillSendFill } from 'react-icons/bs';
import { AiFillSound, AiOutlineSound } from 'react-icons/ai';
import { textAreaConfig } from '@/configs/global-configs';
import { IChatForm } from '@/modules/chat/types';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';
import { setCurrentChatLanguage } from '@/redux/chat/chat-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
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

  const dispatch = useDispatch();

  const typewriterSound = new Audio(audioUrl);
  const matches = useMediaQuery('(min-width: 468px)');
  const { currentChatLanguage } = useSelector(
    (state: RootState) => state?.chat
  );

  const currentLanguageText = (id: string) => {
    switch (id) {
      case '0':
        return 'Qlobal';
      case '1':
        return 'Azərbaycan dilində';
      case '2':
        return 'Türk dilində';
      case '3':
        return 'İngilis dilində';
      case '4':
        return 'Rus dilində';
      default:
        return 'Azərbaycan dilində';
    }
  };
  const currentLanguageFlag = (id: string) => {
    switch (id) {
      case '0':
        return <img width={22} alt="uk flag" src="/flags/global-flag.svg" />;
      case '1':
        return <img width={22} alt="uk flag" src="/flags/az-flag.svg" />;
      case '2':
        return <img width={22} alt="uk flag" src="/flags/tr-flag.svg" />;
      case '3':
        return <img width={22} alt="uk flag" src="/flags/en-flag.svg" />;
      case '4':
        return <img width={22} alt="uk flag" src="/flags/ru-flag.svg" />;
      default:
        return <img width={22} alt="uk flag" src="/flags/global-flag.svg" />;
    }
  };
  return (
    <form
      onSubmit={handleSubmit(z => {
        onSubmit(z);
        reset();
      })}
      className="   shadow-none px-0 absolute container  bottom-0  left-1/2 transform -translate-x-1/2 -translate-y-1/2   shadow-none  "
    >
      <div className="h-full w-full bg-darkBlack   rounded-xl">
        <Textarea
          {...register('message', { required: true })}
          variant="bordered"
          fullWidth
          color="primary"
          rows={3}
          maxRows={3}
          placeholder="Type a message... 💬👨🏻‍💻"
          classNames={textAreaConfig}
          className="flex-1 px-4  !border-none text-white !shadow-none !outline-none !active:border-none !active:shadow-none !active:outline-none !focus:border-none !focus:shadow-none !focus:outline-none !hover:border-none !hover:shadow-none !hover:outline-none"
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
        />
        <div className="flex-1 border-t-1 border-gray-600" />

        <div className="flex  px-5    items-center justify-between   shadow-none  z-20 ">
          <Button
            type="button"
            isIconOnly
            size="sm"
            onClick={() => setAudioEnable(z => !z)}
            className="bg-transparent rounded-full "
          >
            {audioEnable ? (
              <AiFillSound size={16} color="white" />
            ) : (
              <AiOutlineSound size={16} color="white" />
            )}{' '}
          </Button>
          <div className="flex rounded-0 shadow-none   items-center justify-between">
            {
              <Chip className="sm:flex hidden bg-transparent text-[gray] text-sm">
                Aİ-ZADƏ sizə {currentLanguageText(currentChatLanguage)} cavab
                verəcək
              </Chip>
            }

            {matches ? (
              <Dropdown
                classNames={{
                  content: 'min-w-[auto] w-[80px]'
                }}
              >
                <DropdownTrigger>
                  <Button size="sm" className="capitalize bg-transparent">
                    {currentLanguageFlag(currentChatLanguage)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={currentChatLanguage}
                  onSelectionChange={(e: any) =>
                    dispatch(setCurrentChatLanguage(e?.currentKey))
                  }
                >
                  <DropdownItem key="0">
                    <img
                      width={22}
                      alt="uk flag"
                      src="/flags/global-flag.svg"
                    />
                  </DropdownItem>
                  <DropdownItem key="1">
                    <img width={22} alt="uk flag" src="/flags/az-flag.svg" />
                  </DropdownItem>
                  <DropdownItem key="2">
                    <img width={22} alt="uk flag" src="/flags/tr-flag.svg" />
                  </DropdownItem>
                  <DropdownItem key="3">
                    <img width={22} alt="uk flag" src="/flags/en-flag.svg" />
                  </DropdownItem>
                  <DropdownItem key="4">
                    <img width={22} alt="uk flag" src="/flags/ru-flag.svg" />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Tabs
                selectedKey={currentChatLanguage}
                // @ts-ignore
                onSelectionChange={e => dispatch(setCurrentChatLanguage(e))}
                size={'sm'}
                color="primary"
                className="ml-2"
                classNames={{
                  cursor: ' bg-slate-300'
                }}
              >
                <Tab
                  key="0"
                  className="px-1"
                  title={
                    <img
                      width={22}
                      alt="uk flag"
                      src="/flags/global-flag.svg"
                    />
                  }
                />
                <Tab
                  key="1"
                  className="px-1"
                  title={
                    <img width={22} alt="uk flag" src="/flags/az-flag.svg" />
                  }
                />
                <Tab
                  key="2"
                  className="px-1"
                  title={
                    <img width={22} alt="uk flag" src="/flags/tr-flag.svg" />
                  }
                />
                <Tab
                  key="3"
                  className="px-1"
                  title={
                    <img width={22} alt="uk flag" src="/flags/en-flag.svg" />
                  }
                />
                <Tab
                  key="4"
                  className="px-1"
                  title={
                    <img width={22} alt="uk flag" src="/flags/ru-flag.svg" />
                  }
                />
              </Tabs>
            )}

            <Button
              type="submit"
              isIconOnly
              size="sm"
              isDisabled={waitingForResponse}
              className="bg-transparentrounded-full"
            >
              <BsFillSendFill size={16} color="white" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChatForm;

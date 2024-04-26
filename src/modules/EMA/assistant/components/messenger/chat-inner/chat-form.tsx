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
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';
import { setCurrentAssistantLanguage } from '@/redux/assistant/assistant-slice';
import { useDispatch, useSelector } from 'react-redux';
import { IAssistantChatForm } from '@/modules/EMA/assistant/types';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/redux/store';
import { clickKeyBoardSound } from '@/assets/sounds/asset-exporter';

interface IChatFormProps {
  onSubmit: SubmitHandler<IAssistantChatForm>;
  waitingForResponse: boolean;
  templateMessage?: string;
}

/**
 * @description The `ChatForm` component is a React functional component that renders the form for the chat with the Assistant.
 *
 * @param {IChatFormProps} props The props for the ChatForm component.
 * @returns JSX.Element representing the ChatForm component.
 */
function ChatForm({ onSubmit, waitingForResponse }: IChatFormProps) {
  // Initialize the hook form methods
  const { register, handleSubmit, reset } = useForm<IAssistantChatForm>();
  const [audioEnable, setAudioEnable] = useLocalStorage<Boolean>(
    'audioEnable',
    true
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const matches = useMediaQuery('(min-width: 468px)');
  const { currentAssistantLanguage } = useSelector(
    (state: RootState) => state?.assistant
  );

  // Function to get the current language text
  const currentLanguageText = (id: string) => {
    switch (id) {
      case '0':
        return t('asGlobalLang');
      case '1':
        return t('asAzerbaijaniLang');
      case '2':
        return t('asTurkishLang');
      case '3':
        return t('asEnglishLang');
      case '4':
        return t('asRussianLang');
      default:
        return t('asAzerbaijaniLang');
    }
  };
  // Function to get the current language flag
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
      className="z-10 flex flex-col gap-4 dark:bg-transparent px-6 pt-[18px] pb-8 w-full self-end"
    >
      <div className="bg-purple-100/40 dark:bg-black/50 backdrop-blur-lg rounded-xl w-ful h-full">
        <Textarea
          {...register('message', { required: true })}
          variant="bordered"
          fullWidth
          color="primary"
          rows={3}
          maxRows={3}
          placeholder={t('typeAMessage')}
          classNames={textAreaConfig}
          className="flex-1 !shadow-none !hover:shadow-none !focus:shadow-none !active:shadow-none px-4 !border-none !hover:border-none !focus:border-none !active:border-none text-default-800 dark:text-white !outline-none !active:outline-none !focus:outline-none !hover:outline-none"
          onKeyDown={e => {
            // Check if the key pressed is 'Enter' and there is no shift key pressed
            if (audioEnable) {
              clickKeyBoardSound.currentTime = 0; // Reset the clickKeyBoardSound to the start
              clickKeyBoardSound.play();
            }

            if (e.key === 'Enter' && !e.shiftKey && !waitingForResponse) {
              e.preventDefault(); // Prevent the default behavior of Enter key in a textarea (which is to insert a new line)
              handleSubmit(onSubmit)(); // Call the submit handler
              reset();
            }
          }}
        />
        <div className="flex-1 border-gray-600 border-t-1" />

        <div className="z-20 flex justify-between items-center shadow-none px-5">
          <Button
            type="button"
            title="Toggle Audio Enable/Disable"
            aria-label="Toggle Audio Enable/Disable"
            isIconOnly
            size="sm"
            onClick={() => setAudioEnable(z => !z)}
            className="bg-transparent rounded-full"
          >
            {audioEnable ? (
              <AiFillSound
                size={16}
                className="text-default-900 dark:text-white"
              />
            ) : (
              <AiOutlineSound
                className="text-default-900 dark:text-white"
                size={16}
                color="white"
              />
            )}{' '}
          </Button>
          <div className="flex justify-between items-center shadow-none rounded-0">
            {
              <Chip className="sm:flex hidden bg-transparent text-[gray] text-sm">
                {t('willAnswer', {
                  dynamicValue: currentLanguageText(currentAssistantLanguage)
                })}
              </Chip>
            }

            {matches ? (
              <Dropdown
                classNames={{
                  content: 'min-w-[auto] w-[80px]'
                }}
              >
                <DropdownTrigger>
                  <Button
                    aria-label="Assistant Language"
                    size="sm"
                    className="bg-transparent capitalize"
                  >
                    {currentLanguageFlag(currentAssistantLanguage)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={currentAssistantLanguage}
                  onSelectionChange={(e: any) =>
                    dispatch(setCurrentAssistantLanguage(e?.currentKey))
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
                selectedKey={currentAssistantLanguage}
                // @ts-ignore
                onSelectionChange={e =>
                  dispatch(setCurrentAssistantLanguage(e))
                }
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
              title="Send Message"
              aria-label="Send Message"
              isIconOnly
              size="sm"
              isDisabled={waitingForResponse}
              className="bg-transparentrounded-full"
            >
              <BsFillSendFill
                size={16}
                className="text-default-900 dark:text-white"
              />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChatForm;

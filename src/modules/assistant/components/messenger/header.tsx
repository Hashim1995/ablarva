/* eslint-disable no-bitwise */
import VerifyEmail from '@/core/static-components/verify-email';
import { setAssistantsDrawer } from '@/redux/assistant/assistant-slice';
import { RootState } from '@/redux/store';
import {
  Button,
  Tooltip,
  useDisclosure,
  Progress,
  Image
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { BsJustify } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @description The `MessengerHeader` component is a React functional component that renders the header for the messenger for Assistant chat.
 *
 * @returns JSX.Element representing the MessengerHeader component.
 */
function MessengerHeader() {
  const dispatch = useDispatch();
  const { isOpen: modalIsopen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  const { premiumAssistant, basicAssistant } = useSelector(
    (state: RootState) => state?.statisticsCount?.statisticsCount?.data
  );
  const { currentAssistantModel, assistantsDrawer } = useSelector(
    (state: RootState) => state?.assistant
  );
  return (
    <div className=" pt-1 pb-3 h-[60px] flex    ">
      <Button
        size="sm"
        isIconOnly
        onClick={() => dispatch(setAssistantsDrawer(true))}
        className="bg-transparent block  ms-3"
        aria-label="Filter"
        title="Filter"
      >
        <BsJustify
          size={20}
          color="white"
          className={` ${assistantsDrawer ? 'rotate-90' : ''}`}
        />
      </Button>
      <div className="flex justify-between  items-center container">
        <div className="flex justify-between gap-2 sm:gap-5 items-center  ">
          {(premiumAssistant || basicAssistant) && (
            <div className="flex w-[400px] justify-content-between gap-4">
              <Tooltip
                placement="top-start"
                offset={12}
                content={`${t(
                  'general'
                )}: ${basicAssistant?.total}, ${'used'}: ${basicAssistant?.usage}, ${'rest'}: ${basicAssistant?.remainder}`}
              >
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: 'max-w-md',
                    indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                    label: ' text-[11px]  text-white pr-2',
                    value: 'text-[11px] text-white'
                  }}
                  label={t('basicPackage')}
                  value={basicAssistant?.remainder}
                  formatOptions={{}}
                  showValueLabel
                  maxValue={basicAssistant?.total}
                />
              </Tooltip>
              <Tooltip
                placement="top-start"
                offset={12}
                content={`${t(
                  'general'
                )}: ${premiumAssistant?.total}, ${'used'}: ${premiumAssistant?.usage}, ${'rest'}: ${premiumAssistant?.remainder}`}
              >
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: 'max-w-md',
                    indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                    label: ' text-[11px]  text-white pr-2',
                    value: ' text-[11px] text-white'
                  }}
                  label={t('premiumPackage')}
                  value={premiumAssistant?.remainder}
                  formatOptions={{}}
                  showValueLabel
                  maxValue={premiumAssistant?.total}
                />
              </Tooltip>
            </div>
          )}
        </div>

        {currentAssistantModel?.assistanName && (
          <div className="bg-default-50 px-4 py-1 rounded-xl flex items-center gap-2">
            <Image
              alt="Woman listing to music"
              className="object-contain h-full w-10  rounded-full"
              src={
                `${
                  import.meta.env.VITE_BASE_URL
                }${currentAssistantModel?.assistantImagePath}` || ''
              }
            />{' '}
            <h3 className="text-[14px] group-hover:text-black transition-all duration-300 ease-in-out text-left leading-4 mb-1 sm:mb-2">
              {currentAssistantModel?.assistanName}
            </h3>
          </div>
        )}
      </div>
      {modalIsopen && (
        <VerifyEmail onOpenChange={onOpenChange} isOpen={modalIsopen} />
      )}
    </div>
  );
}

export default MessengerHeader;

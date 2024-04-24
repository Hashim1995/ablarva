/* eslint-disable no-bitwise */
import VerifyEmail from '@/core/static-components/verify-email';
import { RootState } from '@/redux/store';
import { Tooltip, useDisclosure, Progress } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

/**
 * @description The `MessengerHeader` component is a React functional component that renders the header for the messenger for Assistant chat.
 *
 * @returns JSX.Element representing the MessengerHeader component.
 */
function MessengerHeader() {
  const { isOpen: modalIsopen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  const { premiumAssistant, basicAssistant } = useSelector(
    (state: RootState) => state?.statisticsCount?.statisticsCount?.data
  );

  return (
    <div className=" pt-1 pb-3 h-[60px] flex    ">
      <div className="flex justify-between  items-center gap-2 sm:gap-5">
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
      </div>
      {modalIsopen && (
        <VerifyEmail onOpenChange={onOpenChange} isOpen={modalIsopen} />
      )}
    </div>
  );
}

export default MessengerHeader;

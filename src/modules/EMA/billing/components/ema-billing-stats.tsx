import { RootState } from '@/redux/store';
import { Progress, Tooltip } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function EmaBillingStats() {
  const { t } = useTranslation();

  const currentQuotaDetailsDto = useSelector(
    (state: RootState) =>
      state?.user?.user?.emailAssistant?.currentQuotaDetailsDto
  );

  const emailQuota = currentQuotaDetailsDto?.emailQuota;
  const leadQuota = currentQuotaDetailsDto?.leadQuota;

  return (
    <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
      <div className="flex flex-col gap-2 w-full h-full">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('packageStats')} 💰
        </h3>
        <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
          <div className="flex justify-between items-center gap-2 sm:gap-5">
            {(emailQuota || leadQuota) && (
              <div className="flex justify-content-between gap-4 w-full">
                <Tooltip
                  placement="top-start"
                  offset={12}
                  classNames={{
                    content: 'text-default-900 dark:text-white'
                  }}
                  content={`${t('general')}: ${emailQuota?.total}, ${t(
                    'used'
                  )}: ${emailQuota?.used}, ${t(
                    'rest'
                  )}: ${emailQuota?.remainder}`}
                >
                  <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                      base: 'max-w-md',
                      indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                      label:
                        ' text-[11px]  text-default-800 dark:text-white pr-2',
                      value: 'text-[11px] text-default-800 dark:text-white'
                    }}
                    label={t('emailQuota')}
                    value={emailQuota?.remainder}
                    formatOptions={{}}
                    showValueLabel
                    maxValue={emailQuota?.total}
                  />
                </Tooltip>
                <Tooltip
                  placement="top-start"
                  offset={12}
                  classNames={{
                    content: 'text-default-900 dark:text-white'
                  }}
                  content={`${t('general')}: ${leadQuota?.total}, ${t(
                    'used'
                  )}: ${leadQuota?.used}, ${t(
                    'rest'
                  )}: ${leadQuota?.remainder}`}
                >
                  <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                      base: 'max-w-md',
                      indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                      label:
                        ' text-[11px]  text-default-800 dark:text-white pr-2',
                      value: ' text-[11px] text-default-800 dark:text-white'
                    }}
                    label={t('leadQuota')}
                    value={leadQuota?.remainder}
                    formatOptions={{}}
                    showValueLabel
                    maxValue={leadQuota?.total}
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmaBillingStats;

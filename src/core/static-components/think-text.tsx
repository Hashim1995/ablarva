import { useTranslation } from 'react-i18next';
import './think-text.scss';

/**
 * Renders a component that displays a list of text elements in a random order.
 */
function ThinkText() {
  const { t } = useTranslation();

  const textList: string[] = t('textList', { returnObjects: true });

  return (
    <div className="pl-6 thinkText-frame">
      <div className="thinkText-center">
        <div className="thinkText-carousel">
          <div className="text-default-800 text-xs sm:text-sm lg:text-base dark:text-white thinkText-pre">
            <strong>{t('aiZadeSay')}: </strong>{' '}
          </div>
          <div className="thinkText-change_outer">
            <div className="text-default-800 dark:text-white thinkText-change_inner">
              {textList
                ?.map((value: string) => ({ value, sort: Math.random() })) // Map operation 1
                .sort((a, b) => a.sort - b.sort) // Sort operation
                .map(
                  (
                    { value } // Map operation 2
                  ) => (
                    <div key={value} className="thinkText-element">
                      {value}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThinkText;

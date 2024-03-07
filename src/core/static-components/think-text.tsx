import { useTranslation } from 'react-i18next';
import './think-text.scss';

function ThinkText() {
  const { t } = useTranslation();

  // Assert the type of textList to be string[] explicitly
  const textList: string[] = t('textList', { returnObjects: true });

  return (
    <div className="thinkText-frame pl-6">
      <div className="thinkText-center">
        <div className="thinkText-carousel">
          <div className="thinkText-pre lg:text-base text-white sm:text-sm text-xs">
            <strong>{t('aiZadeSay')}: </strong>{' '}
          </div>
          <div className="thinkText-change_outer">
            <div className="thinkText-change_inner text-white">
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

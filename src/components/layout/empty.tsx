import { useTranslation } from 'react-i18next';

import { BsDatabaseSlash } from 'react-icons/bs';

interface IEmpty {
  text?: string;
  className?: string;
  size?: number;
}
function Empty({ text, className, size }: IEmpty) {
  const { t } = useTranslation();

  return (
    <div
      className={`bg-black rounded-2xl p-2 shadow-md text-center flex flex-col items-center ${className}`}
    >
      <BsDatabaseSlash color="text-gray-300" size={size || 48} />
      <h3 className="mt-2 text-gray-300 text-lg  ">{text || t('empty')}</h3>
    </div>
  );
}

export default Empty;

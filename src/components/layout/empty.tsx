import { useTranslation } from 'react-i18next';
import React from 'react';

import { BsDatabaseSlash } from 'react-icons/bs';

interface IEmpty {
  text?: string;
  className?: string;
  size?: number;
}

/**
 * Renders an empty component with optional text, className, and size.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display in the component. If not provided, it will use the translation for 'empty'.
 * @param {string} props.className - The additional CSS class name(s) to apply to the component.
 * @param {number} props.size - The size of the component. If not provided, it will default to 48.
 * @returns {React.ReactElement} The rendered Empty component.
 */
function Empty({ text, className, size }: IEmpty): React.ReactElement {
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

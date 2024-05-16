import { useTranslation } from 'react-i18next';
import React from 'react';
import { BsDatabaseSlash } from 'react-icons/bs';

/**
 * A reusable empty state component that displays a message and an icon when no data is available.
 * It uses the `react-i18next` for translation and `react-icons` for icons.
 *
 * @summary A simple component for empty states.
 * @module Empty
 * @exports Empty
 * @example
 * // Example usage:
 * <Empty text="No data found" size={64} className="custom-empty-class" />
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.text] - The custom text message to display when the state is empty.
 * @param {string} [props.className] - Additional custom styles to apply to the empty state container.
 * @param {number} [props.size=48] - The size of the icon to display.
 * @returns {React.ReactElement} The empty state component.
 */

interface IEmpty {
  text?: string;
  className?: string;
  size?: number;
}

function Empty({ text, className, size }: IEmpty): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div
      className={` p-2  text-center flex flex-col items-center ${className}`}
    >
      <BsDatabaseSlash color="text-gray-300" size={size || 48} />
      <h3 className="mt-2 text-gray-300 text-lg">{text || t('empty')}</h3>
    </div>
  );
}

export default Empty;

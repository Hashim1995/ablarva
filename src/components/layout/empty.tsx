import { dictionary } from '@/utils/constants/dictionary';
import { FcDeleteDatabase } from 'react-icons/fc';

interface IEmpty {
  text?: string;
  className?: string;
  size?: number;
}
function Empty({ text, className, size }: IEmpty) {
  return (
    <div
      className={`bg-gray-100 rounded-2xl p-2 shadow-md text-center flex flex-col items-center ${className}`}
    >
      <FcDeleteDatabase size={size || 48} />
      <h3 className="mt-2 text-gray-500 text-lg  ">
        {text || dictionary.az.empty}
      </h3>
    </div>
  );
}

export default Empty;

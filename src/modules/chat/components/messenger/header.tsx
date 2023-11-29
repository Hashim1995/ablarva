/* eslint-disable no-bitwise */
import { dictionary } from '@/utils/constants/dictionary';
import { Button } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import { BsFillFilterCircleFill, BsJustify } from 'react-icons/bs';

interface IMessengerHeaderProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
function MessengerHeader({
  isDrawerOpen,
  setIsDrawerOpen
}: IMessengerHeaderProps) {
  return (
    <div className="flex justify-between  items-center bg-black p-3">
      <div className="flex justify-between  gap-5 items-center ">
        <Button
          size="sm"
          isIconOnly
          onClick={() => setIsDrawerOpen((z: boolean) => !z)}
          className="bg-transparent rounded-full"
          aria-label="Filter"
        >
          <BsJustify
            size={20}
            color="white"
            className={` ${isDrawerOpen ? 'rotate-90' : ''}`}
          />
        </Button>
        <h2 className="text-xl text-white font-semibold">
          {dictionary.az.chat}
        </h2>
      </div>

      <Button
        size="sm"
        isIconOnly
        className="bg-white rounded-full"
        aria-label="Filter"
      >
        <BsFillFilterCircleFill size={20} color="#292D32" />
      </Button>
    </div>
  );
}

export default MessengerHeader;

/* eslint-disable no-bitwise */
import { setCurrentChatModel } from '@/redux/chat/chat-slice';
import { RootState } from '@/redux/store';
import { dictionary } from '@/utils/constants/dictionary';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import { BsFillPlusCircleFill, BsJustify } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

interface IMessengerHeaderProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
function MessengerHeader({
  isDrawerOpen,
  setIsDrawerOpen
}: IMessengerHeaderProps) {
  const dispatch = useDispatch();
  const currentModel = useSelector(
    (state: RootState) => state.chat.currentModel
  );
  const models = [
    {
      label: 'Basic',
      value: '1'
    },
    {
      label: 'Premium',
      value: '2'
    }
  ];

  const handleSelectionChange = (e: any) => {
    dispatch(setCurrentChatModel(e.target.value));
  };

  return (
    <div className="flex justify-between  items-center bg-black p-3">
      <div className="flex justify-between gap-2 sm:gap-5 items-center ">
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
        <h2 className="text-base sm:text-xl text-white font-semibold">
          {dictionary.az.chat}
        </h2>
      </div>

      <div className="flex w-[20%] items-center gap-2">
        <Select
          onChange={handleSelectionChange}
          selectedKeys={[currentModel]}
          isRequired
          size="sm"
        >
          {models.map(z => (
            <SelectItem key={z.value} value={z.value}>
              {z.label}
            </SelectItem>
          ))}
        </Select>
        <Button
          size="sm"
          isIconOnly
          className="bg-white rounded-full"
          aria-label="Filter"
        >
          <BsFillPlusCircleFill size={20} color="#292D32" />
        </Button>
      </div>
    </div>
  );
}

export default MessengerHeader;

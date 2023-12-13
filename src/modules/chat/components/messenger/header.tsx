/* eslint-disable no-unused-vars */
/* eslint-disable no-bitwise */
import { setCurrentThreadId, setResetChatInner } from '@/redux/chat/chat-slice';
import { RootState } from '@/redux/store';
import { dictionary } from '@/utils/constants/dictionary';
import {
  Button,
  Tooltip,
  Tabs,
  Tab,
  PopoverTrigger,
  Popover,
  PopoverContent
} from '@nextui-org/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsFillPlusCircleFill, BsJustify } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IMessengerHeaderProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
function MessengerHeader({
  isDrawerOpen,
  setIsDrawerOpen
}: IMessengerHeaderProps) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { currentModel, currentThreadId, waitingForResponse } = useSelector(
    (state: RootState) => state.chat
  );
  const [selected, setSelected] = useState<string>('2');

  const navigate = useNavigate();

  return (
    <div className="flex justify-between  items-center bg-black p-3">
      <div className="flex justify-between gap-2 sm:gap-5 items-center ">
        {/* <Button
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
        </Button> */}
        <h2 className="text-base sm:text-xl text-white font-semibold">
          {dictionary.az.chat}
        </h2>
      </div>
      <div className="flex w-[26%] items-center justify-between gap-2">
        <Tabs
          selectedKey={selected}
          // @ts-ignore
          onSelectionChange={e => setSelected(e)}
          size={'sm'}
          color="primary"
          classNames={{
            cursor: ' bg-[#292D32]',
            tabContent: 'group-data-[selected=true]:text-[white]'
          }}
        >
          <Tab key="1" title="Basic" isDisabled={Boolean(currentThreadId)} />
          <Tab key="2" title="Premium" isDisabled={Boolean(currentThreadId)} />
        </Tabs>

        {!waitingForResponse ? (
          <Tooltip placement="top-start" offset={12} content={'Yeni Çat'}>
            <Button
              size="sm"
              isIconOnly
              className="bg-white rounded-full"
              aria-label="Filter"
              onClick={() => {
                searchParams.delete('threadID');
                dispatch(setCurrentThreadId(''));
                dispatch(setResetChatInner(Date.now()));
                navigate('/chat');
              }}
            >
              <BsFillPlusCircleFill size={20} color="#292D32" />
            </Button>
          </Tooltip>
        ) : (
          <Popover placement="right">
            <PopoverTrigger>
              <Tooltip placement="top-start" offset={12} content={'Yeni Çat'}>
                <Button
                  size="sm"
                  isIconOnly
                  className="bg-white rounded-full"
                  aria-label="Filter"
                  onClick={() => {
                    searchParams.delete('threadID');
                    dispatch(setCurrentThreadId(''));
                    dispatch(setResetChatInner(Date.now()));
                    navigate('/chat');
                  }}
                >
                  <BsFillPlusCircleFill size={20} color="#292D32" />
                </Button>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">Popover Content</div>
                <div className="text-tiny">This is the popover content</div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default MessengerHeader;

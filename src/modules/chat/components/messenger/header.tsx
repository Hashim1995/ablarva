/* eslint-disable no-unused-vars */
/* eslint-disable no-bitwise */
import VerifyEmail from '@/core/static-components/verify-email';
import { StatisticsUpdateData } from '@/models/common';
import {
  setCurrentChatModel,
  setResetChatInner,
  setWaitingForResponse
} from '@/redux/chat/chat-slice';
import { RootState } from '@/redux/store';
import { dictionary } from '@/utils/constants/dictionary';
import {
  Button,
  Tooltip,
  Tabs,
  Tab,
  PopoverTrigger,
  Popover,
  PopoverContent,
  useDisclosure,
  Badge,
  Progress
} from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  const { isOpen: modalIsopen, onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);

  const { currentModel, waitingForResponse } = useSelector(
    (state: RootState) => state?.chat
  );
  const { premium, basic } = useSelector(
    (state: RootState) => state?.statisticsCount?.statisticsCount?.data
  );
  const { verified } = useSelector((state: RootState) => state?.user?.user);
  const navigate = useNavigate();
  const statisticsData: StatisticsUpdateData = useSelector(
    (state: RootState) => state.statisticsCount.statisticsCount
  );

  return (
    <>
      <div className="flex justify-between  items-center h-[60px] p-3 pb-1">
        <div className="flex justify-between gap-2 sm:gap-5 items-center ">
          <Button
            size="sm"
            isIconOnly
            // onClick={() => setIsDrawerOpen((z: boolean) => !z)}
            className="bg-transparent block "
            aria-label="Filter"
          >
            <BsJustify
              size={20}
              color="white"
              className={` ${isDrawerOpen ? 'rotate-90' : ''}`}
            />
          </Button>
          {(premium || basic) && (
            <div className="flex w-[400px] justify-content-between gap-4">
              <Tooltip
                placement="top-start"
                offset={12}
                content={`Ümumi: ${basic?.total}, İstifadə olunan: ${basic?.usage}, Geriyə qalan: ${basic?.remainder}`}
              >
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: 'max-w-md',
                    indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                    label: ' text-[11px]  text-white pr-2',
                    value: 'text-[11px] text-white'
                  }}
                  label="Sadə paket"
                  value={basic?.remainder}
                  formatOptions={{}}
                  showValueLabel
                  maxValue={basic?.total}
                />
              </Tooltip>
              <Tooltip
                placement="top-start"
                offset={12}
                content={`Ümumi: ${premium?.total}, İstifadə olunan: ${premium?.usage}, Geriyə qalan: ${premium?.remainder}`}
              >
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: 'max-w-md',
                    indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                    label: ' text-[11px]  text-white pr-2',
                    value: ' text-[11px] text-white'
                  }}
                  label="Premium paket"
                  value={premium?.remainder}
                  formatOptions={{}}
                  showValueLabel
                  maxValue={premium?.total}
                />
              </Tooltip>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <Tabs
            selectedKey={currentModel}
            // @ts-ignore
            onSelectionChange={e => dispatch(setCurrentChatModel(e))}
            size={'sm'}
            color="primary"
            className="mr-5"
            classNames={{
              cursor: ' bg-[#292D32]',
              tabContent: 'group-data-[selected=true]:text-[white]'
            }}
          >
            <Tab
              key="1"
              title="Basic"
              isDisabled={Boolean(searchParams.get('threadID'))}
            />
            <Tab
              key="2"
              title="Premium"
              isDisabled={
                Boolean(searchParams.get('threadID')) || premium?.total === 0
              }
            />
          </Tabs>

          {!waitingForResponse ? (
            <Tooltip placement="top-start" offset={12} content={'Yeni Çat'}>
              <Button
                size="sm"
                isIconOnly
                className="bg-transparent rounded-full"
                aria-label="Filter"
                onClick={() => {
                  if (!verified) {
                    onOpen();
                  } else {
                    searchParams.delete('threadID');
                    dispatch(setResetChatInner(Date.now()));
                    navigate('/chat');
                  }
                }}
              >
                <BsFillPlusCircleFill size={24} color="white" />
              </Button>
            </Tooltip>
          ) : (
            <Popover
              isOpen={isOpen}
              onOpenChange={open => setIsOpen(open)}
              placement="bottom"
              offset={6}
            >
              <PopoverTrigger>
                <Button
                  size="sm"
                  isIconOnly
                  className="transparent rounded-full"
                >
                  <BsFillPlusCircleFill size={20} color="white" />
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <div className="px-1 flex flex-col py-2 gap-2">
                  <p>
                    Hal-hazırda cavab gözlənilir. Yeni çata keçək istədiyinizə
                    əminsinizmi?
                  </p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-black text-white"
                      onClick={() => {
                        if (!verified) {
                          onOpen();
                        } else {
                          searchParams.delete('threadID');
                          dispatch(setWaitingForResponse(false));
                          dispatch(setResetChatInner(Date.now()));
                          navigate('/chat');
                        }
                      }}
                      aria-label="Remove thread"
                    >
                      {dictionary.az.yesTxt}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className=" bg-black text-white"
                      aria-label="Remove thread"
                    >
                      {dictionary.az.noTxt}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      {modalIsopen && (
        <VerifyEmail onOpenChange={onOpenChange} isOpen={modalIsopen} />
      )}
    </>
  );
}

export default MessengerHeader;

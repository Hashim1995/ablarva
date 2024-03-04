/* eslint-disable no-unused-vars */
/* eslint-disable no-bitwise */
import VerifyEmail from '@/core/static-components/verify-email';
import { StatisticsUpdateData } from '@/models/common';
import {
  setAssistantsDrawer,
  setResetAssistantInner,
  setWaitingForAssistantResponse
} from '@/redux/assistant/assistant-slice';
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
  Progress,
  Image
} from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BsFillPlusCircleFill, BsJustify } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

function MessengerHeader() {
  const dispatch = useDispatch();
  const { isOpen: modalIsopen, onOpen, onOpenChange } = useDisclosure();

  const { premium, basic } = useSelector(
    (state: RootState) => state?.statisticsCount?.statisticsCount?.data
  );
  const { currentAssistantModel, assistantsDrawer } = useSelector(
    (state: RootState) => state?.assistant
  );
  return (
    <div className=" pt-1 pb-3 h-[60px] flex    ">
      <Button
        size="sm"
        isIconOnly
        onClick={() => dispatch(setAssistantsDrawer(true))}
        className="bg-transparent block  ms-3"
        aria-label="Filter"
      >
        <BsJustify
          size={20}
          color="white"
          className={` ${assistantsDrawer ? 'rotate-90' : ''}`}
        />
      </Button>
      <div className="flex justify-between  items-center container">
        <div className="flex justify-between gap-2 sm:gap-5 items-center  ">
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

        {currentAssistantModel?.assistanName && (
          <div className="bg-default-50 px-4 py-1 rounded-xl flex items-center gap-2">
            <Image
              alt="Woman listing to music"
              className="object-contain h-full w-10  rounded-full"
              src={
                `${
                  import.meta.env.VITE_BASE_URL
                }${currentAssistantModel?.assistantImagePath}` || ''
              }
            />{' '}
            <h3 className="text-[14px] group-hover:text-black transition-all duration-300 ease-in-out text-left leading-4 mb-1 sm:mb-2">
              {currentAssistantModel?.assistanName}
            </h3>
          </div>
        )}

        {/* <div className="flex items-center justify-between gap-2 mr-5">
          {!waitingForAssistanResponse ? (
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
                    dispatch(setResetAssistanInner(Date.now()));
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
                          dispatch(setWaitingForAssistanResponse(false));
                          dispatch(setResetAssistanInner(Date.now()));
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
        </div> */}
      </div>
      {modalIsopen && (
        <VerifyEmail onOpenChange={onOpenChange} isOpen={modalIsopen} />
      )}
    </div>
  );
}

export default MessengerHeader;

/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { IUserSessions } from '@/models/user';
import {
  //  AppDispatch,
  RootState
} from '@/redux/store';
import { Card, Chip, Divider, Skeleton } from '@nextui-org/react';
import { BsAndroid2 } from 'react-icons/bs';
import {
  MdOutlineLaptopMac
  //  MdOutlineLogout
} from 'react-icons/md';
import { TbDeviceIpad } from 'react-icons/tb';
import {
  // useDispatch,
  useSelector
} from 'react-redux';
import { FaWindows, FaLinux, FaApple, FaBlackberry } from 'react-icons/fa';
// import { AuthService } from '@/services/auth-services/auth-services';
// import { IGlobalResponseEmpty } from '@/models/common';
// import { fetchUserData } from '@/redux/auth/auth-slice';
import { useState } from 'react';
import Empty from '@/components/layout/empty';
import { useTranslation } from 'react-i18next';

function Sessions() {
  const { userSessions } = useSelector((state: RootState) => state.user.user);
  // const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const returnDeviceIconByType = (type: number) => {
    switch (type) {
      case 1:
        return (
          <MdOutlineLaptopMac
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      case 2:
        return (
          <FaWindows
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      case 3:
        return (
          <FaLinux
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      case 4:
        return (
          <FaLinux
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      case 5:
        return (
          <FaApple
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      case 6:
        return (
          <FaApple
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      case 7:
        return (
          <FaBlackberry
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      case 8:
        return (
          <BsAndroid2
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
      default:
        return (
          <TbDeviceIpad
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            color="white"
            size={35}
          />
        );
    }
  };

  // const removeSession = async (id: number) => {
  //   setLoading(true);
  //   try {
  //     const res: IGlobalResponseEmpty =
  //       await AuthService.getInstance().removeSession(id);
  //     if (res.isSuccess) {
  //       dispatch(fetchUserData());
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setLoading(false);
  // };

  return (
    <Card className="bg-transparent   h-fulll !shadow-none !rounded-none h-full ">
      <div className="flex justify-between min-h-[48px] sm:min-h-[56px]  items-center  p-2 sm:p-3">
        <div className="text-base sm:text-xl text-default-900 dark:text-white flex flex-row gap-1 sm:gap-0 font-semibold">
          <p>
            {t('active')} {t('sessions')}
          </p>
        </div>
      </div>

      <div className=" rounded-lg  remove-scrollbar overflow-y-auto xl:py-3 xl:px-6 py-1 px-2">
        {!loading ? (
          <div>
            {userSessions?.length > 0 ? (
              userSessions.map((item: IUserSessions) => (
                <div
                  key={item.id}
                  className=" my-2 bg-default-50 rounded-2xl  mb-2   p-5  overflow-hidden "
                >
                  <div className="flex items-center justify-between">
                    <div className="2xl:mr-2 xl:mr-1 mr-2">
                      {returnDeviceIconByType(item.platformType)}
                    </div>
                    <Divider orientation="vertical" className="h-20" />
                    <div className="flex flex-1 justify-between items-center">
                      <div className="2xl:px-4 px-2">
                        <div className="tracking-wide text-[14px] text-default-900 dark:text-white ">
                          <span className=" text-gray-400">
                            {t('system')}:{' '}
                          </span>
                          {item.platformName || t('empty')}
                        </div>
                        <div className="tracking-wide text-[14px] text-default-900 dark:text-white">
                          <span className=" text-gray-400">
                            {t('browser')}:{' '}
                          </span>
                          {item.browserName || t('empty')}
                        </div>
                        <div className="tracking-wide text-[14px] text-default-900 dark:text-white">
                          <span className=" text-gray-400">{t('ip')} : </span>
                          {item.ipAddress || t('empty')}
                        </div>
                        <div className="tracking-wide text-[14px] text-default-900 dark:text-white">
                          <span className=" text-gray-400">
                            {t('loginDate')}:{' '}
                          </span>
                          {item.loginDate || t('empty')}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="font-bold 2xl:px-4 px-2">
                          <Chip
                            className="text-default-900 dark:text-white"
                            color={item?.status ? 'success' : 'danger'}
                          >
                            {item?.status ? 'Aktiv' : item?.status}
                          </Chip>
                        </div>
                        {/* <Divider orientation="vertical" className="h-20" />
                        <div className="2xl:ml-2 ml-2">
                          <MdOutlineLogout
                            className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer"
                            color="red"
                            size={25}
                            aria-hidden
                            onClick={() => {
                              removeSession(item.id);
                            }}
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
        ) : (
          <>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className=" my-5 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

export default Sessions;

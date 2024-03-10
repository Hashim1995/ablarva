import { AssistantService } from '@/services/assistant-services/assistant-services';
import { Button, Skeleton } from '@nextui-org/react';
import {
  setCurrentAssistantModel,
  setResetAssistantInner
} from '@/redux/assistant/assistant-slice';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IAssistantItem } from '../types';

function Home() {
  const [assistansList, setAssistansList] = useState<IAssistantItem[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAssistansList = async () => {
    try {
      const res = await AssistantService.getInstance().fetchAssistantsList();

      setAssistansList(res?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    fetchAssistansList();
  }, []);

  return (
    <div className="py-10 remove-scrollbar  home-container ">
      <div className="flex justify-center mb-3">
        <h1 className=" text-[3rem] font-medium">
          Unlock the Power of{' '}
          <span className="theme-gradient font-bold">AI-ZADE</span> <br />
          with Smartest Assistants
        </h1>
      </div>

      <div className="containerLg  ">
        {!loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 r gap-7 ">
            {assistansList?.map((item: IAssistantItem) => (
              <div className="w-full mx-auto h-96 gradient-bg border-1 relative text-white rounded-xl overflow-hidden">
                <div className="p-10 blur-sm h-36 bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMzczYmF0Y2g1LTIwMy5qcGc.jpg')]  rounded-b-3xl " />
                <img
                  className=" w-28 h-28 items-center rounded-full mx-auto border-5 absolute top-20 left-1/2 transform -translate-x-1/2  border-white"
                  src={
                    `${
                      import.meta.env.VITE_BASE_URL
                    }${item?.assistantImagePath}` || ''
                  }
                  alt="profile"
                />
                <div className="flex justify-center items-center flex-col mt-12">
                  <div className="font-bold text-xl mt-2">
                    {item?.assistantName}
                  </div>
                  <p className="text-base mt-1">Product Design</p>
                </div>
                <div className="h-[2px] w-3/5 mx-auto mt-1 bg-[purple]" />

                <div className="px-6 pt-4 ">
                  <p className="text-sm text-center min-h-[53px]">
                    {item?.assistantDescription}
                  </p>
                </div>
                <div className="flex justify-center mt-2 mb-3 space-x-3">
                  <Button
                    onClick={() => {
                      dispatch(setResetAssistantInner(Date.now()));
                      dispatch(
                        setCurrentAssistantModel({
                          assistantId: item?.assistantId,
                          assistantImagePath: item?.assistantImagePath,
                          assistantDescription: item?.assistantDescription,
                          assistanName: item?.assistantName
                        })
                      );
                      navigate('/assistant');
                    }}
                  >
                    {t('hireMe')}
                  </Button>
                </div>
              </div>
            ))}
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
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

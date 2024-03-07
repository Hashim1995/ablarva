/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { AssistantService } from '@/services/assistant-services/assistant-services';
import { IAssistantItem } from '@/modules/assistant/types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Skeleton } from '@nextui-org/react';
import { RootState } from '@/redux/store';
import { BsJustify } from 'react-icons/bs';
import { setAssistantsDrawer } from '@/redux/assistant/assistant-slice';
import AsistanCard from './asistant';

function AsistantCardList() {
  const [assistansList, setAssistansList] = useState<IAssistantItem[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const { currentAssistantModel } = useSelector(
    (state: RootState) => state?.assistant
  );
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

  useEffect(() => {
    fetchAssistansList();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center  mb-3 remove-scrollba">
        <h1 className="text-white text-xl font-semibold text-center r">
          Asistan
        </h1>
        <Button
          size="sm"
          isIconOnly
          onClick={() => dispatch(setAssistantsDrawer(false))}
          className="bg-transparent block  ms-3"
          aria-label="Filter"
        >
          <BsJustify size={20} color="white" className={` rotate-90`} />
        </Button>
      </div>

      <Divider className="h-[1px] bg-white mb-3" />
      <div className="overflow-y-auto remove-scrollbar">
        {!loading ? (
          <>
            {assistansList?.map((item: IAssistantItem) => (
              <AsistanCard
                currentAssistanModel={currentAssistantModel}
                data={item}
              />
            ))}
          </>
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

export default AsistantCardList;

/* eslint-disable react/button-has-type */
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentAssistantModel,
  setResetAssistantInner
} from '@/redux/assistant/assistant-slice';
import { useTranslation } from 'react-i18next';
import { IAssistantItem } from '../types';

function AssistantHomeCard({ item }: { item: IAssistantItem }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="w-full mx-auto h-96 gradient-bg border-1 relative text-white rounded-xl overflow-hidden">
      <div className="p-10 blur-sm h-36 bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMzczYmF0Y2g1LTIwMy5qcGc.jpg')]  rounded-b-3xl " />
      <img
        className=" w-28 h-28 items-center rounded-full mx-auto border-5 absolute top-20 left-1/2 transform -translate-x-1/2  border-white"
        src={
          `${import.meta.env.VITE_BASE_URL}${item?.assistantImagePath}` || ''
        }
        alt="profile"
      />
      <div className="flex justify-center items-center flex-col mt-12">
        <div className="font-bold text-xl mt-2">{item?.assistantName}</div>
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
  );
}

export default AssistantHomeCard;

/* eslint-disable no-unused-vars */
import { IAsistanItem } from '@/modules/assistan/types';
import { IAsistanCard } from '@/modules/chat/types';
import {
  setCurrentAssistanModel,
  setResetAssistanInner
} from '@/redux/assistan/assistan-slice';
import { Card, Image, Divider, CardFooter, Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AsistanCard({
  data,
  currentAssistanModel
}: {
  data: IAsistanItem;
  currentAssistanModel: string;
}) {
  const {
    assistantId,
    assistantName,
    assistantDescription,
    assistantImagePath,
    assistantServicePlan,
    assistantServicePlanText
  } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      onClick={() => {
        searchParams.delete('threadID');
        dispatch(setResetAssistanInner(Date.now()));
        dispatch(setCurrentAssistanModel(assistantId));
        navigate('/assistan');
      }}
      aria-hidden
      className={`group p-1 flex h-18 ${
        currentAssistanModel === assistantId ? 'bg-white' : 'bg-default-50'
      } bg-default-50 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer rounded-xl items-center justify-between mb-2 gap-4`}
    >
      <Image
        alt="Woman listing to music"
        className="object-contain h-full w-14 sm:w-16 rounded-full"
        src={`${import.meta.env.VITE_BASE_URL}${assistantImagePath}` || ''}
      />
      <div
        className={`${
          currentAssistanModel === assistantId ? 'text-black' : 'text-white'
        } w-full flex h-full justify-between flex-col`}
      >
        <h3 className="text-[14px] group-hover:text-black transition-all duration-300 ease-in-out text-left leading-4 mb-1 sm:mb-2">
          {assistantName}
        </h3>
        <p className="text-[10px] group-hover:text-black transition-all duration-300 ease-in-out text-left">
          {assistantDescription}
        </p>
      </div>
    </div>
  );
}

export default AsistanCard;

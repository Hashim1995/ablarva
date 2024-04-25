/* eslint-disable react/button-has-type */
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';
import {
  setCurrentAssistantModel,
  setResetAssistantInner
} from '@/redux/assistant/assistant-slice';
import { useTranslation } from 'react-i18next';
import { IAssistantItem } from '../types';

/**
 * @description The `AssistantHomeCard` component is a React functional component that renders the assistant home card.
 *
 * @param {IAssistantItem} item The assistant item to be rendered.
 * @returns JSX.Element representing the AssistantHomeCard component.
 */
function AssistantHomeCard({ item }: { item: IAssistantItem }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="w-full mx-auto h-96 gradient-bg border-1 relative text-default-900 dark:text-white rounded-xl overflow-hidden">
      <div className="p-10 blur-sm h-32 bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMzczYmF0Y2g1LTIwMy5qcGc.jpg')]  rounded-b-3xl " />
      <img
        className=" w-28 h-28 items-center rounded-full mx-auto border-5 absolute top-8 left-1/2 transform -translate-x-1/2  border-white"
        src={
          `${import.meta.env.VITE_BASE_URL}${item?.assistantImagePath}` || ''
        }
        alt="profile"
      />
      <div className="flex justify-center items-center flex-col mt-5">
        <div className="font-bold text-xl mt-2">{item?.assistantName}</div>
        <p className="text-base mt-1">{item?.assistantPosition}</p>
      </div>
      <div className="h-[2px] w-3/5 mx-auto mt-1 bg-[purple]" />

      <div className="px-6 pt-4 ">
        <p className="text-sm text-center min-h-[72px]">
          {item?.assistantDescription}
        </p>
      </div>
      <div className="flex justify-center mt-2 mb-3 space-x-3">
        <Button
          aria-label="hire and navigate to assistant page"
          title="hire and navigate to assistant page"
          onClick={() => {
            // if the assistant is active, set the assistant model and navigate to the assistant page
            if (item?.isActive) {
              dispatch(setResetAssistantInner(Date.now()));
              dispatch(
                setCurrentAssistantModel({
                  assistantId: item?.assistantId,
                  assistantImagePath: item?.assistantImagePath,
                  assistantDescription: item?.assistantDescription,
                  assistanName: item?.assistantName,
                  assistantPosition: item?.assistantPosition,
                  isActive: item?.isActive
                })
              );
              navigate('/email-marketing');
            } else {
              toast.success(t('itIsBeingPrepared'), toastOptions);
            }
          }}
        >
          {t('hireMe')}
        </Button>
      </div>
    </div>
  );
}

export default AssistantHomeCard;

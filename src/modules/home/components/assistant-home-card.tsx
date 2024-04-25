/* eslint-disable react/button-has-type */
import { Button, useDisclosure } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';
import {
  setCurrentAssistantModel,
  setResetAssistantInner
} from '@/redux/assistant/assistant-slice';
import { RootState } from '@/redux/store';
import VerifyEmail from '@/core/static-components/verify-email';
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
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onOpenChange: onOpenChangeVerifyModal
  } = useDisclosure();

  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="relative border-1 bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMzczYmF0Y2g1LTIwMy5qcGc.jpg')] mx-auto rounded-xl w-full h-96 text-white overflow-hidden">
      <div className="blur-sm p-10 rounded-b-3xl h-32" />
      <img
        className="top-8 left-1/2 absolute items-center border-5 border-white mx-auto rounded-full w-28 h-28 transform -translate-x-1/2"
        src={
          `${import.meta.env.VITE_BASE_URL}${item?.assistantImagePath}` || ''
        }
        alt="profile"
      />
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="mt-2 font-bold text-white text-xl">
          {item?.assistantName}
        </div>
        <p className="mt-1 text-base :text-white">{item?.assistantPosition}</p>
      </div>
      <div className="bg-[purple] mx-auto mt-1 w-3/5 h-[2px]" />

      <div className="px-6 pt-4">
        <p className="min-h-[72px] text-center text-sm text-white">
          {item?.assistantDescription}
        </p>
      </div>
      <div className="flex justify-center space-x-3 mt-2 mb-3">
        <Button
          aria-label="hire and navigate to assistant page"
          title="hire and navigate to assistant page"
          onClick={() => {
            // if the assistant is active, set the assistant model and navigate to the assistant page
            if (item?.isActive) {
              if (user?.verified) {
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
                onOpenVerifyModal();
              }
            } else {
              toast.success(t('itIsBeingPrepared'), toastOptions);
            }
          }}
        >
          {t('hireMe')}
        </Button>
      </div>
      {isOpenVerifyModal && (
        <VerifyEmail
          onOpenChange={onOpenChangeVerifyModal}
          isOpen={isOpenVerifyModal}
        />
      )}
    </div>
  );
}

export default AssistantHomeCard;

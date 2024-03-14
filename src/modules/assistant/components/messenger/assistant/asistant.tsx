import { IAssistantItem } from '@/modules/assistant/types';
import {
  setCurrentAssistantModel,
  setResetAssistantInner
} from '@/redux/assistant/assistant-slice';
import { Image } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * @description The `AsistantCard` component is a React functional component that renders the card for the Assistant.
 *
 * @param {IAssistantItem} data The data for the AsistantCard component.
 * @returns JSX.Element representing the AsistantCard component.
 */
function AsistantCard({
  data,
  currentAssistanModel
}: {
  data: IAssistantItem;
  currentAssistanModel: IAssistantItem;
}) {
  const {
    assistantId,
    assistantName,
    assistantDescription,
    assistantImagePath,
    assistantPosition,
    isActive
  } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      onClick={() => {
        // delete the threadID from the URL when the assistant is changed to avoid the assistant to be stuck in the same thread.
        searchParams.delete('threadID');
        dispatch(setResetAssistantInner(Date.now()));
        dispatch(
          setCurrentAssistantModel({
            assistantId,
            assistantImagePath,
            assistantDescription,
            assistanName: assistantName,
            assistantPosition,
            isActive
          })
        );
        navigate('/assistant');
      }}
      aria-hidden
      className={`group p-1 flex h-18 ${
        currentAssistanModel?.assistantId === assistantId
          ? 'bg-white'
          : 'bg-default-50'
      } bg-default-50 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer rounded-xl items-center justify-between mb-2 gap-4`}
    >
      <Image
        alt="Woman listing to music"
        className="object-contain h-full w-14 sm:w-16 rounded-full"
        src={`${import.meta.env.VITE_BASE_URL}${assistantImagePath}` || ''}
      />
      <div
        className={`${
          currentAssistanModel?.assistantId === assistantId
            ? 'text-black'
            : 'text-white'
        } w-full flex h-full justify-between flex-col`}
      >
        <h3 className="text-[14px] group-hover:text-black transition-all duration-300 ease-in-out text-left leading-4 mb-1 sm:mb-2">
          {assistantName}
        </h3>
        <p className="text-[10px] group-hover:text-black transition-all duration-300 ease-in-out text-left line-clamp-2">
          {assistantDescription}
        </p>
      </div>
    </div>
  );
}

export default AsistantCard;

/* eslint-disable no-unused-vars */
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { Button, ButtonGroup, Chip, Tooltip } from '@nextui-org/react';
import { t } from 'i18next';
import {
  FcFlashOn,
  FcAddColumn,
  FcAddDatabase,
  FcDeleteDatabase
} from 'react-icons/fc';
import { IPendingListItem } from '../types';

interface IProps {
  item: IPendingListItem;
}

function PendingMailsItem({ item }: IProps) {
  const {
    to,
    campaignName,
    language,
    templateType,
    title,
    description,
    createdAt
  } = item;
  return (
    <div className="border-1 border-divider bg-transparent shadow-lg rounded-2xl w-full">
      <div className="flex">
        <div className="flex flex-col gap-3 border-divider py-5 pl-3 border-r-1 w-1/4">
          <Chip variant="bordered" className="h-7" size="md">
            {to}
          </Chip>
          <Chip variant="bordered" className="h-7" size="md">
            {campaignName}
          </Chip>
          <Chip variant="bordered" className="h-7" size="md">
            {language}
          </Chip>
          <Chip variant="bordered" className="h-7" size="md">
            {templateType}
          </Chip>
          <Chip variant="bordered" className="h-7" size="md">
            {createdAt}
          </Chip>
        </div>
        <div className="right flex flex-col justify-between py-3 pr-3 pl-3 w-full">
          <h1 className="border-divider py-2 border-b-1 text-[1.5em]">
            {title}
          </h1>
          <p className="py-2 text-2xl">{description}</p>
          <div className="flex justify-between border-divider pt-2 border-t-1">
            <AppHandledSolidButton>Hello</AppHandledSolidButton>
            <div className="flex gap-3">
              <AppHandledSolidButton>Hello</AppHandledSolidButton>
              <AppHandledSolidButton>Hello</AppHandledSolidButton>
              <AppHandledSolidButton>Hello</AppHandledSolidButton>
              <AppHandledSolidButton>Hello</AppHandledSolidButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingMailsItem;

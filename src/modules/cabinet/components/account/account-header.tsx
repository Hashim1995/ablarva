import { setState } from '@/models/common';

import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { BsPencilSquare, BsFolder2 } from 'react-icons/bs';
import { IoKeyOutline } from 'react-icons/io5';

import { useTranslation } from 'react-i18next';
import ChangePassword from './change-password';

interface IAccountHeaderProps {
  setFieldsIsDisable: setState;
  fieldsIsDisable: boolean;
  isLoading: boolean;
}
function AccountHeader({
  fieldsIsDisable,
  isLoading,
  setFieldsIsDisable
}: IAccountHeaderProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  return (
    <div className="flex justify-between min-h-[48px] items-center p-2 sm:p-3">
      <div className="text-base sm:text-xl text-white flex flex-row gap-1 sm:gap-0 font-semibold">
        <p>
          {t('account')} {t('infos')}
        </p>
      </div>
      <div className="flex gap-5">
        <Tooltip placement="left" content={t('changePassWord')}>
          <Button
            size="sm"
            title="Change Password"
            isIconOnly
            onClick={onOpen}
            className=" rounded-full"
            aria-label="Change Password"
            type="button"
          >
            <IoKeyOutline
              size={20}
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              color="white"
            />
          </Button>
        </Tooltip>
        <Tooltip placement="left" content={t('editAccount')}>
          <Button
            size="sm"
            isIconOnly
            title="Edit Account"
            isDisabled={isLoading}
            onClick={() => setFieldsIsDisable(z => !z)}
            className="rounded-full"
            aria-label="Edit Account"
            type="button"
          >
            <BsPencilSquare
              size={20}
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              color="WHITE"
            />
          </Button>
        </Tooltip>
        {!fieldsIsDisable && (
          <Tooltip placement="left" content={t('save')}>
            <Button
              size="sm"
              isLoading={isLoading}
              isIconOnly
              form="account-form"
              className="rounded-full"
              aria-label="Save"
              title="Save"
              type="submit"
            >
              <BsFolder2
                size={20}
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                color="WHITE"
              />
            </Button>
          </Tooltip>
        )}
      </div>
      {isOpen && <ChangePassword onOpenChange={onOpenChange} isOpen={isOpen} />}
    </div>
  );
}

export default AccountHeader;

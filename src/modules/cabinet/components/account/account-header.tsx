import { setState } from '@/models/common';
import { dictionary } from '@/utils/constants/dictionary';
import { Button, Card, Tooltip, useDisclosure } from '@nextui-org/react';
import { BsPencilSquare, BsFolder2 } from 'react-icons/bs';
import { IoKeyOutline } from 'react-icons/io5';

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

  return (
    <Card className="rounded-b-none  bg-transparent shadow-none">
      <div className="flex justify-between items-center  bg-transparent p-2 sm:p-3">
        <div className="text-base sm:text-xl flex flex-row gap-1 sm:gap-0 text-white font-semibold">
          <p>
            {dictionary.az.account} {dictionary.az.infos}
          </p>
        </div>
        <div className="flex gap-5">
          <Tooltip placement="left" content={dictionary.az.changePassWord}>
            <Button
              size="sm"
              isIconOnly
              onClick={onOpen}
              className=" rounded-full"
              aria-label="submit"
              type="button"
            >
              <IoKeyOutline
                size={20}
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                color="white"
              />
            </Button>
          </Tooltip>
          <Tooltip placement="left" content={dictionary.az.editAccount}>
            <Button
              size="sm"
              isIconOnly
              isDisabled={isLoading}
              onClick={() => setFieldsIsDisable(z => !z)}
              className="rounded-full"
              aria-label="submit"
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
            <Tooltip placement="left" content={dictionary.az.save}>
              <Button
                size="sm"
                isLoading={isLoading}
                isIconOnly
                form="account-form"
                className="rounded-full"
                aria-label="submit"
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
      </div>
      {isOpen && <ChangePassword onOpenChange={onOpenChange} isOpen={isOpen} />}
    </Card>
  );
}

export default AccountHeader;

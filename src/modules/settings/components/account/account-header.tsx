import { setState } from '@/models/common';
import { dictionary } from '@/utils/constants/dictionary';
import { Button, Card, Tooltip, useDisclosure } from '@nextui-org/react';
import { BsPencilSquare, BsFillKeyFill, BsFolderFill } from 'react-icons/bs';
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
    <Card className="rounded-b-none">
      <div className="flex justify-between items-center  bg-black p-2 sm:p-3">
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
              className="bg-white rounded-full"
              aria-label="submit"
              type="button"
            >
              <BsFillKeyFill
                size={20}
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                color="#292D32"
              />
            </Button>
          </Tooltip>
          <Tooltip placement="left" content={dictionary.az.editAccount}>
            <Button
              size="sm"
              isIconOnly
              isDisabled={isLoading}
              onClick={() => setFieldsIsDisable(z => !z)}
              className="bg-white rounded-full"
              aria-label="submit"
              type="button"
            >
              <BsPencilSquare
                size={20}
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                color="#292D32"
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
                className="bg-white rounded-full"
                aria-label="submit"
                type="submit"
              >
                <BsFolderFill
                  size={20}
                  className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                  color="#292D32"
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

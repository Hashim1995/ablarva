import { useState } from 'react';
import { Tooltip, Button, useDisclosure } from '@nextui-org/react';
import { BsPencilSquare, BsFolder2 } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { IoKeyOutline } from 'react-icons/io5';
import ChangePassword from './change-password';
import AccountForm from './account-form';

function Account() {
  const [fieldsIsDisable, setFieldsIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-between">
        <h3 className="font-semibold text-default-900 text-xl dark:text-white">
          {t('account')} {t('infos')} 🪪
        </h3>
        <div className="flex gap-5">
          <Tooltip
            placement="left"
            classNames={{
              content: 'text-default-900 dark:text-white'
            }}
            content={t('changePassWord')}
          >
            <Button
              size="sm"
              title="Change Password"
              isIconOnly
              onClick={onOpen}
              className="rounded-full"
              aria-label="Change Password"
              type="button"
            >
              <IoKeyOutline className="text-default-900 dark:text-white" />
            </Button>
          </Tooltip>
          <Tooltip
            placement="left"
            classNames={{
              content: 'text-default-900 dark:text-white'
            }}
            content={t('editAccount')}
          >
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
              <BsPencilSquare className="text-default-900 dark:text-white" />
            </Button>
          </Tooltip>
          {!fieldsIsDisable && (
            <Tooltip
              placement="left"
              classNames={{
                content: 'text-default-900 dark:text-white'
              }}
              content={t('save')}
            >
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
                <BsFolder2 className="text-default-900 dark:text-white" />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
        <AccountForm
          setIsLoading={setIsLoading}
          fieldsIsDisable={fieldsIsDisable}
        />
      </div>
      {isOpen && <ChangePassword onOpenChange={onOpenChange} isOpen={isOpen} />}
    </div>
  );
}

export default Account;

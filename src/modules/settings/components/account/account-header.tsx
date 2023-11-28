import { setState } from '@/models/common';
import { dictionary } from '@/utils/constants/dictionary';
import { Button } from '@nextui-org/react';
import { BsPencilSquare, BsFolderFill } from 'react-icons/bs';

interface IAccountHeaderProps {
  setFieldsIsDisable: setState;
  fieldsIsDisable: boolean;
}
function AccountHeader({
  setFieldsIsDisable,
  fieldsIsDisable
}: IAccountHeaderProps) {
  return (
    <div className="">
      <div className="flex justify-between items-center  bg-black p-3">
        <h2 className="text-xl text-white font-semibold">
          {dictionary.az.account} <br /> {dictionary.az.infos}
        </h2>
        {fieldsIsDisable ? (
          <Button
            size="sm"
            isIconOnly
            onClick={() => setFieldsIsDisable(z => !z)}
            className="bg-white rounded-full"
            aria-label="submit"
            type="button"
          >
            <BsPencilSquare size={20} color="#292D32" />
          </Button>
        ) : (
          <Button
            size="sm"
            isIconOnly
            form="account-form"
            className="bg-white rounded-full"
            aria-label="submit"
            type={'submit'}
          >
            <BsFolderFill size={20} color="#292D32" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default AccountHeader;

import { Card } from '@nextui-org/react';
import { useState } from 'react';
import AccountHeader from './account-header';
import AccountForm from './account-form';

function Account() {
  const [fieldsIsDisable, setFieldsIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Card className="overflow-visible  !bg-transparent h-1/3  min-h-[300px] flex !shadow-none !rounded-none">
      <AccountHeader
        fieldsIsDisable={fieldsIsDisable}
        setFieldsIsDisable={setFieldsIsDisable}
        isLoading={isLoading}
      />
      <AccountForm
        setIsLoading={setIsLoading}
        fieldsIsDisable={fieldsIsDisable}
      />
    </Card>
  );
}

export default Account;

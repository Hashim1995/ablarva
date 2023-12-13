import { Card } from '@nextui-org/react';
import { useState } from 'react';
import AccountHeader from './account-header';
import AccountForm from './account-form';

function Account() {
  const [fieldsIsDisable, setFieldsIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Card className="h-full overflow-visible !bg-white flex rounded-lg sm:rounded-2xl bg-transparent  shadow-md">
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

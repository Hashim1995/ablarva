import { Card } from '@nextui-org/react';
import { useState } from 'react';
import AccountHeader from './account-header';
import AccountForm from './account-form';

function Account() {
  const [fieldsIsDisable, setFieldsIsDisable] = useState(true);

  return (
    <Card className="h-full !bg-white overflow-y-auto  rounded-2xl bg-transparent  shadow-md">
      <AccountHeader
        fieldsIsDisable={fieldsIsDisable}
        setFieldsIsDisable={setFieldsIsDisable}
      />
      <AccountForm fieldsIsDisable={fieldsIsDisable} />
    </Card>
  );
}

export default Account;

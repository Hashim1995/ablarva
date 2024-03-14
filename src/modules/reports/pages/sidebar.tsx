/* eslint-disable jsx-a11y/anchor-is-valid */
import { Listbox, ListboxItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { BsEnvelope } from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * Renders the sidebar component for the reports page. This component contains the links to the different reports pages.
 */
function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full max-w-[260px]  py-2 rounded-small ">
        <h1 className="text-center mb-2">{t('reports')}</h1>

        <Listbox variant="flat" aria-label="Listbox menu with descriptions">
          <ListboxItem
            onClick={() => {
              navigate('/reports');
            }}
            key={2}
            className="bg-default-100 rounded-lg p-3 mb-2"
            startContent={<FaMoneyBill />}
          >
            {t('paymentHistory')}
          </ListboxItem>

          <ListboxItem
            onClick={() => {
              navigate('/reports/email-reports');
            }}
            key={2}
            className="bg-default-100 rounded-lg p-3 mb-2"
            startContent={<BsEnvelope />}
          >
            {t('emailReports')}
          </ListboxItem>
        </Listbox>
      </div>
    </div>
  );
}

export default Sidebar;

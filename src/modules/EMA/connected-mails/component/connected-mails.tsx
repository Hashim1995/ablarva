/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { selectPlaceholderText } from '@/utils/constants/texts';
import {
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  CircularProgress,
  Chip,
  Switch,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import { t } from 'i18next';
import { useForm, useWatch } from 'react-hook-form';
import gmail from '@assets/icons/gmail.svg';
import amazon from '@assets/icons/amazon.svg';
import { BsTrash3 } from 'react-icons/bs';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '@/redux/store';
import microsoft from '@assets/icons/microsoft.svg';
import { EmaConnectedMailsService } from '@/services/ema/ema-connected-mails-services';
import { IHTTPSParams } from '@/services/adapter-config/config';
import Empty from '@/components/layout/empty';
import { useLocation, useNavigate } from 'react-router-dom';
import { toastOptions } from '@/configs/global-configs';
import AppHandledRemoveModal from '@/components/layout/remove-modal';
import {
  IConnectedMailItem,
  IConnectedMailListResponse,
  IConnectedMailValidateUrl
} from '../types';
import ConnectMailsModal from './connect-mails-modal';
import useHandleUrlCallback from './usehandleUrlCallback';

const returnIcon = (emailProviderType: number) => {
  switch (emailProviderType) {
    case 1:
      return <img className="h-5" alt="gmail" src={gmail} />;
    case 2:
      return <img className="h-5" alt="microsoft" src={microsoft} />;
    default:
      return <img className="h-5" alt="amazon" src={amazon} />;
  }
};

function ConnectedMails() {
  const [data, setData] = useState<IConnectedMailListResponse['data']>([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [selectedItem, setselectedItem] = useState<IConnectedMailItem>();
  const navigate = useNavigate();
  const location = useLocation();

  const successDetails = useHandleUrlCallback();
  const {
    control,
    formState: { errors }
  } = useForm();

  const selectedSender = useWatch({
    control,
    name: 'sender' // make sure this is the name of your select field
  });

  const {
    isOpen: removeIsOpen,
    onOpen: removeOnOpen,
    onOpenChange: removeOnOpenChange,
    onClose: removeOnClose
  } = useDisclosure();

  const { senderInformationList } = useSelector(
    (state: RootState) => state.ema
  );

  const {
    isOpen: connectModalIsOpen,
    onOpen: connectModalOnOpen,
    onOpenChange: connectModalOnOpenChange
  } = useDisclosure();

  const handleSwitchChange = async (id: number) => {
    setToggleLoading(true);
    try {
      await EmaConnectedMailsService.getInstance().toggleStatus({
        id
      });
    } catch (err) {
      console.log(err); // You might want to handle errors, such as showing a notification
    } finally {
      setToggleLoading(false);
    }
  };

  const fetchConnectedMails = async (query?: IHTTPSParams[]) => {
    setLoading(true);

    try {
      const res = await EmaConnectedMailsService.getInstance().getList(query);
      if (res?.isSuccess) {
        setData(res?.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeSenderInformation = async () => {
    setRemoveLoading(true);
    try {
      const res =
        await EmaConnectedMailsService.getInstance().removeConnectedMail(
          selectedItem?.id
        );
      if (res.isSuccess) {
        fetchConnectedMails();
        removeOnClose();
      }
    } catch (err) {
      console.log(err);
    }
    setRemoveLoading(false);
  };

  const validateUrl = async (par: IConnectedMailValidateUrl) => {
    setLoading(true);
    const payload: IConnectedMailValidateUrl = {
      code: par?.code,
      scope: par?.scope,
      state: par?.state
    };
    try {
      const res = await EmaConnectedMailsService.getInstance().validateUrl(
        payload
      );
      if (res.isSuccess) {
        fetchConnectedMails();
        toast.success(t('successTxt'), toastOptions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      navigate(location.pathname, { replace: true });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (successDetails) {
      validateUrl(successDetails);
    }
  }, [successDetails]);
  useEffect(() => {
    if (selectedSender) {
      fetchConnectedMails([{ name: 'senderId', value: selectedSender }]);
    } else {
      fetchConnectedMails();
    }
  }, [selectedSender]);
  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex items-center">
            <h1 className="font-semibold text-[2em] text-default-800 dark:text-white">
              {t('connectedMails')}
            </h1>
            <AppHandledBorderedButton
              buttonProps={{
                disableAnimation: true
              }}
              className="ml-4 cursor-default"
              size="sm"
            >
              {data?.length}/3
            </AppHandledBorderedButton>
          </div>

          <Divider className="my-4" />
          <div className="flex justify-between">
            <form>
              <AppHandledSelect
                className="w-80"
                isInvalid={Boolean(errors.sender?.message)}
                selectProps={{
                  id: 'sender',
                  isLoading: !senderInformationList?.data,
                  isDisabled: !senderInformationList?.data
                }}
                name="sender"
                options={senderInformationList?.data}
                label={selectPlaceholderText(t('sender'))}
                control={control}
                errors={errors}
              />
            </form>
            <AppHandledSolidButton
              onClick={connectModalOnOpen}
              title="Add"
              aria-label="Add"
              buttonProps={{
                isDisabled: data?.length >= 3
              }}
            >
              {t('connect')}
            </AppHandledSolidButton>
          </div>
          <div className="bg-transparent py-6 rounded-2xl w-full">
            <Table
              removeWrapper
              classNames={{
                th: ' !py-5 dark:!bg-[#303642]',
                td: ' !py-5'
              }}
              className="border-collapse text-default-800 dark:text-white"
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>{t('email').toLocaleUpperCase()}</TableColumn>
                <TableColumn>{t('senderName').toLocaleUpperCase()}</TableColumn>
                <TableColumn>
                  {t('dailyEmailCapacity').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>
                  {t('accountHealth').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>{t('status').toLocaleUpperCase()}</TableColumn>
                <TableColumn> </TableColumn>
              </TableHeader>
              <TableBody
                isLoading={loading}
                items={data}
                emptyContent={<Empty />}
                loadingContent={<Spinner />}
              >
                {(item: IConnectedMailItem) => (
                  <TableRow
                    className="border-divider border-b-1"
                    key={item?.id}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {returnIcon(item?.emailProviderType)} {item?.email}
                      </div>
                    </TableCell>

                    <TableCell>{item?.senderName}</TableCell>

                    <TableCell>
                      <Chip color="secondary">{item?.capacity}</Chip>
                    </TableCell>
                    <TableCell>
                      <CircularProgress
                        size="lg"
                        color={
                          item?.accountHealth < 30
                            ? 'danger'
                            : item?.accountHealth < 70
                            ? 'warning'
                            : 'success'
                        }
                        value={item?.accountHealth}
                        showValueLabel
                        classNames={{
                          value: ' text-default-800 dark:text-white'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        isDisabled={toggleLoading}
                        size="sm"
                        defaultSelected={item?.status}
                        onChange={() => handleSwitchChange(item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="relative flex justify-end items-center gap-2">
                        <Tooltip
                          classNames={{
                            content: 'text-default-800 dark:text-white'
                          }}
                          content={t('delete')}
                        >
                          <span
                            aria-hidden
                            onClick={() => {
                              setselectedItem(item);

                              removeOnOpen();
                            }}
                            className="active:opacity-50 text-danger text-lg cursor-pointer"
                          >
                            <BsTrash3 color="danger" size={16} />
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {connectModalIsOpen && (
        <ConnectMailsModal
          onOpenChange={connectModalOnOpenChange}
          isOpen={connectModalIsOpen}
        />
      )}
      {removeIsOpen && (
        <AppHandledRemoveModal
          isLoading={removeLoading}
          onRemove={removeSenderInformation}
          onOpenChange={removeOnOpenChange}
          isOpen={removeIsOpen}
        />
      )}
    </div>
  );
}

export default ConnectedMails;

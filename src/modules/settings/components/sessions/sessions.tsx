/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { dictionary } from '@/utils/constants/dictionary';
import { Button, Card, Chip, Divider } from '@nextui-org/react';
import { BsFillFilterCircleFill } from 'react-icons/bs';
import {
  MdOutlineLaptopMac,
  MdOutlineLogout,
  MdOutlinePhoneIphone
} from 'react-icons/md';
import { TbDeviceIpad } from 'react-icons/tb';

interface ISessionsListItem {
  type: number;
  os: string;
  browser: string;
  ip: string;
  loginDate: string;
  status: number;
  id: number | string;
}

function Sessions() {
  const sessionHistory: ISessionsListItem[] = [
    {
      id: 1,
      type: 1,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    },
    {
      id: 2,
      type: 2,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    },
    {
      id: 3,
      type: 3,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    },

    {
      id: 4,
      type: 2,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    },
    {
      id: 5,
      type: 3,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    },
    {
      id: 6,
      type: 3,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    },
    {
      id: 7,
      type: 3,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    },
    {
      id: 8,
      type: 3,
      os: 'MAC OS X',
      browser: 'Chrome 119.0.0.0',
      ip: '109.205.166.185',
      loginDate: '20.11.2023 14:00',
      status: 1
    }
  ];

  const returnDeviceIconByType = (type: number) => {
    switch (type) {
      case 1:
        return <MdOutlineLaptopMac size={35} />;
      case 2:
        return <MdOutlinePhoneIphone size={35} />;
      case 3:
        return <TbDeviceIpad size={35} />;
      default:
        return <TbDeviceIpad size={35} />;
    }
  };
  return (
    <Card className="  shadow  h-full ">
      <div className="flex justify-between items-center mb-4 bg-black p-3">
        <h2 className="text-xl text-white font-semibold">
          {dictionary.az.active} <br /> {dictionary.az.sessions}
        </h2>
        <Button
          size="sm"
          isIconOnly
          className="bg-white rounded-full"
          aria-label="Filter"
        >
          <BsFillFilterCircleFill size={20} color="#292D32" />
        </Button>
      </div>
      <div className="bg-white  rounded-lg   xl:py-3 xl:px-6 py-1 px-2 overflow-y-scroll">
        {sessionHistory.map((item: ISessionsListItem) => (
          <div
            key={item.id}
            className=" my-3 border-1  px-5 py-3  rounded-xl overflow-hidden "
          >
            <div className="md:flex items-center justify-between">
              <div className="2xl:mr-2 xl:mr-1">
                {' '}
                {returnDeviceIconByType(item.type)}
              </div>
              <Divider orientation="vertical" className="h-20" />
              <div className="flex flex-1 justify-between items-center">
                <div className="2xl:px-4 xl:px-1">
                  <div className="tracking-wide text-[14px] text-black ">
                    <span className="font-bold"> Sistem:</span> {item.os}
                  </div>
                  <div className="tracking-wide text-[14px] text-black">
                    <span className="font-bold">Brauzer: </span>
                    {item.browser}
                  </div>
                  <div className="tracking-wide text-[14px] text-black">
                    <span className="font-bold">IP:</span> {item.ip}
                  </div>
                  <div className="tracking-wide text-[14px] text-black">
                    <span className="font-bold">Giriş tarixi:</span>{' '}
                    {item.loginDate}
                  </div>
                </div>
                <div className="font-bold 2xl:px-4 xl:px-1">
                  {' '}
                  <Chip
                    className="text-white"
                    color={
                      item.status === 1
                        ? 'success'
                        : item.status === 2
                        ? 'danger'
                        : 'default'
                    }
                  >
                    {item.status === 1
                      ? 'Aktiv'
                      : item.status === 2
                      ? 'Deaktiv'
                      : ''}
                  </Chip>
                </div>
              </div>
              <Divider orientation="vertical" className="h-20" />
              <div className="2xl:ml-2 xl:ml-1">
                <MdOutlineLogout color="red" size={25} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Sessions;

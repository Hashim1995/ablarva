import { Button, Card } from '@nextui-org/react';
import { BsFillFilterCircleFill, BsTrash } from 'react-icons/bs';

function ChatHistory() {
  const messageHistory = [
    {
      date: 'today',
      conversations: [
        {
          id: 1,
          message:
            'Mənə yalnız mavi tonlardan istifadə edərək, parfümeriya nız mavi tonlardan istifadə edərək, parfümeriya manız mavi tonlardan istifadə edərək, parfümeriya manız mavi tonlardan istifadə edərək, parfümeriya manız mavi tonlardan istifadə edərək, parfümeriya manız mavi tonlardan istifadə edərək, parfümeriya manız mavi tonlardan istifadə edərək, parfümeriya mamağazası üçün minimalist post dizaynı verin',
          date: 'Bugün'
        },
        {
          id: 2,
          message:
            'Mənə yalnız mavi tonlardan istifadə edərək, parfümeriya mağazası üçün minimalist post dizaynı verin',
          date: 'Bugün'
        },
        {
          id: 3,
          message:
            'Mənə yalnız mavi tonlardan istifadə edərək, parfümeriya mağazası üçün minimalist post dizaynı verin',
          date: 'Bugün'
        }
      ]
    },
    {
      date: 'yesterday',
      conversations: [
        {
          id: 1,
          message: 'Mənə yalnız mavi tonlardan istifadə edərək',
          date: 'Bugün'
        },
        {
          id: 2,
          message:
            'Mənə yalnız mavi tonlardan istifadə edərək, parfümeriya mağazası üçün minimalist post dizaynı verin',
          date: 'Bugün'
        },
        {
          id: 3,
          message:
            'Mənə yalnız mavi tonlardan istifadə edərək, parfümeriya mağazası üçün minimalist post dizaynı verin',
          date: 'Bugün'
        }
      ]
    }
  ];

  return (
    <Card className="  shadow  h-full ">
      <div className="flex justify-between items-center mb-4 bg-black p-3">
        <h2 className="xl:text-xl lg:text-sm text-white font-semibold">
          Əvvəlki <br /> Söhbətlər
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
      <div className="bg-white rounded-lg shadow  xl:py-3 xl:px-6 lg:py-1 lg:px-2 overflow-y-scroll">
        {messageHistory.map(day => (
          <div key={day.date} className="mb-4">
            <div className="text-black text-sm font-medium	  mb-2">
              {day.date}
            </div>
            {day.conversations.map(conv => (
              <div
                key={conv.id}
                className="flex relative items-center justify-between mb-2 bg-gray-100 rounded-2xl  pl-10 pr-3 py-2 z-10"
              >
                <div className="absolute top-[0px] bg-[#18C964] left-[0px] rounded-tl-mini rounded-2xl  rounded-tr-none rounded-br-none  w-[26px] h-full" />
                <p className="text-black  leading-4  text-sm line-clamp-3">
                  {conv.message}
                </p>
                <Button
                  size="sm"
                  isIconOnly
                  className="bg-white rounded-full !w-6 !h-8 !unit-lg"
                  aria-label="Remove chat"
                >
                  <BsTrash size={16} className=" text-gray-500" />
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ChatHistory;

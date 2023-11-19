import { IAsistanCard } from '@/modules/chat/types';
import { Card, Image, Divider, CardFooter, Button } from '@nextui-org/react';

interface IAsistanCardProps extends IAsistanCard {
  activeId: number | string;
}

function AsistanCard({
  title,
  img,
  id,
  description,
  activeId
}: IAsistanCardProps) {
  console.log(activeId === id);
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className={`border-none  h-24 relative my-2 grayscale hover:grayscale-0 cursor-pointer ${
        activeId === id ? '!grayscale-0' : ''
      } `}
    >
      <Image
        alt="Woman listing to music"
        className=" object-contain h-full w-full "
        src={img || ''}
      />
      <Divider />
      <CardFooter className=" items-start bg-black/50  flex-col justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large  w-full shadow-small h-full z-10">
        <p className="text-[13px] text-white/80 font-bold ">{title || ''}</p>
        <p className="text-[11px] italic leading-4 text-white/80 my-1">
          {description || ''}
        </p>
        <Button
          className="text-tiny text-white bg-black/20 "
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Switch to
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AsistanCard;

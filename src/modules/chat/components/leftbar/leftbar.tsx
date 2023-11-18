import { BsPlusLg } from 'react-icons/bs';
import { Button } from '@nextui-org/react';

function LeftBar() {
  return (
    <div className="flex items-center justify-center h-full">
      <Button isIconOnly className="bg-black rounded-full" size="sm">
        <BsPlusLg size={23} color="white" />
      </Button>
    </div>
  );
}

export default LeftBar;

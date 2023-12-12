import { BsPlusLg } from 'react-icons/bs';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react';

function LeftBar() {
  return (
    <div className="flex items-center justify-center h-full">
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            className="bg-black rounded-full w-[28px] h-[28px] sm:w-[48px] sm:h-[48px]"
          >
            <BsPlusLg
              className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]"
              color="white"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">Yeni Çat - sadə</DropdownItem>
          <DropdownItem key="copy">Yeni Çat - Premium</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default LeftBar;

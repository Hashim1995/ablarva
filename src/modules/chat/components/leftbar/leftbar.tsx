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
          <Button isIconOnly className="bg-black rounded-full" size="sm">
            <BsPlusLg size={23} color="white" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">New Chat</DropdownItem>
          <DropdownItem key="copy">New Assistan</DropdownItem>
          <DropdownItem key="edit">New somesthing</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default LeftBar;

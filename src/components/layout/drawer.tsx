import React, { ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

function Drawer({ isOpen, className, children }: DrawerProps) {
  return (
    <div
      className={`transition-width duration-1000 ease overflow-hidden
                ${isOpen ? 'w-72' : 'w-0'} ${className}`}
    >
      {
        <div
          className={`p-4 overflow-y-auto h-full
                  transition-transform duration-[3s] ease
                  ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          {isOpen && children}
        </div>
      }
    </div>
  );
}

export default Drawer;

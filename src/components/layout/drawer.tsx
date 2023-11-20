import React, { ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

function Drawer({ isOpen, className, children }: DrawerProps) {
  return (
    <div
      className={`transition-width duration-300 ease-in-out overflow-hidden
                  ${isOpen ? `w-64` : 'w-0'} ${className}`}
    >
      {isOpen && <div className="p-4 overflow-y-auto h-full">{children}</div>}
    </div>
  );
}

export default Drawer;

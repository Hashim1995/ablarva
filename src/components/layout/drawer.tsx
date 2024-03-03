import React, { useState, useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

function Drawer({ isOpen, className, children }: DrawerProps) {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(children);
    }
  }, [isOpen]);

  return (
    <div
      className={`transition-width duration-1000  ease overflow-hidden
                ${isOpen ? 'w-[400px]' : 'w-0'} ${className}`}
    >
      <div
        className={`p-4 remove-scrollbar overflow-y-auto h-full
                  transition-transform duration-[3s] ease
                  ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {content}
      </div>
    </div>
  );
}

export default React.memo(Drawer);

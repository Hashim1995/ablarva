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
    } else {
      // Optionally, you could also clear the content or perform other actions when the drawer is closed
      // setContent(null);
    }
  }, [isOpen, children]);

  return (
    <div
      className={`fixed  h-full  transition-[left] 
                ${isOpen ? 'left-0' : 'left-[-100%]'} ${className}`}
      style={{ width: '250px' }} // Set the drawer width here
    >
      <div className={`p-4 h-full overflow-y-auto remove-scrollbar`}>
        {content}
      </div>
    </div>
  );
}

export default React.memo(Drawer);

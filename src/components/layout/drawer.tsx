import React, { useState, useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

// q:  we are using React.memo here?
// a: React.memo is a higher order component that memoizes the rendered output of the component. This means that if the component is re-rendered with the same props, React will reuse the previously rendered output instead of rendering the component again. This can help improve performance by reducing the number of re-renders that occur.
/**
 * Renders a drawer component.
 *
 * @param isOpen - Indicates whether the drawer is open or closed.
 * @param className - Additional CSS class names for the drawer.
 * @param children - The content to be rendered inside the drawer.
 * @returns The rendered drawer component.
 */
function Drawer({ isOpen, className, children }: DrawerProps): JSX.Element {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(children);
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

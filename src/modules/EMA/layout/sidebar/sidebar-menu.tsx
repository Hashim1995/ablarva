import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export function SidebarMenu({ title, children }: Props) {
  return (
    <div className="flex gap-2 flex-col">
      <span className="text-sm font-normal ">{title}</span>
      {children}
    </div>
  );
}

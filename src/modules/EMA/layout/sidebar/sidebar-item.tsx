import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export function SidebarItem({ icon, title, isActive, href = '' }: Props) {
  return (
    <Link to={href} className="bg-none max-w-full">
      <div
        className={`flex ${
          isActive ? 'bg-default-200' : ''
        }   hover:bg-default-100 gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 `}
        aria-hidden
        onClick={() => console.log('a')}
      >
        {icon}
        <span className="text-[14px] text-default-900">{title}</span>
      </div>
    </Link>
  );
}

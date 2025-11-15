import React from 'react';
import { MobileSidebar } from './sidebar-nav';
import { UserProfile } from './user-profile';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6">
      <MobileSidebar />
      <h1 className="flex-1 text-lg font-semibold md:text-2xl font-headline">{title}</h1>
      <UserProfile />
    </header>
  );
}

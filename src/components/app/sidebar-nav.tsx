
'use client';

import {
  BookOpen,
  Bot,
  LayoutDashboard,
  Settings,
  Swords,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center p-4">
        <Button
          variant="ghost"
          className="flex h-auto w-auto items-center gap-2 p-0 text-primary hover:bg-transparent"
          asChild
        >
          <Link href="/dashboard">
            <Swords className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">
              Skillforge
            </span>
          </Link>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard')}
              tooltip="Dashboard"
            >
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/competencies')}
              tooltip="Competencies"
            >
              <Link href="/dashboard">
                <BookOpen />
                <span>Competencies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/tutor')}
              tooltip="AI Tutor"
            >
              <Link href="/dashboard">
                <Bot />
                <span>AI Tutor</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/settings')}
              tooltip="Settings"
            >
              <Link href="/dashboard">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export function MobileSidebar() {
  return (
    <div className="md:hidden">
      <SidebarTrigger />
    </div>
  );
}

'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/app/sidebar-nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // REMOVED: The useEffect that forced a redirect to /login.
  // The application is now public by default.

  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

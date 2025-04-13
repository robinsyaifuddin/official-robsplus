
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar } from "@/components/ui/sidebar";
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex h-screen flex-col bg-dark text-white">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-dark p-6">
          <ScrollArea className="h-full">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

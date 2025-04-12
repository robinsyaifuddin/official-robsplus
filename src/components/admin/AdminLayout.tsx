
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, FileText, Image, Users, LogOut, Menu, X, 
  ChevronDown, Search, Bell, Package, Globe, FileCode, Inbox, ShoppingCart, Database
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check admin auth on load and window resize for mobile responsiveness
  useEffect(() => {
    checkAuth();
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkAuth = () => {
    const auth = localStorage.getItem("robsplus_admin_auth");
    if (!auth) {
      navigate("/admin");
      return;
    }
    
    const authData = JSON.parse(auth);
    if (!authData.isAdmin) {
      navigate("/admin");
      return;
    }
    
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("robsplus_admin_auth");
    toast.success("Logout berhasil");
    navigate("/admin");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-dark text-white">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-700 bg-dark-secondary transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyberpunk">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ROBsPlus Admin</span>
            </div>
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2">
              <div className="mb-4">
                <p className="px-3 text-xs font-semibold uppercase text-gray-400">Dashboard</p>
                <div className="mt-2 space-y-1">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/dashboard')}
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Overview
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <p className="px-3 text-xs font-semibold uppercase text-gray-400">Konten</p>
                <div className="mt-2 space-y-1">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/dashboard/pages')}
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Halaman
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/dashboard/products')}
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Produk
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/dashboard/portfolio')}
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Image className="mr-2 h-5 w-5" />
                    Portofolio
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <p className="px-3 text-xs font-semibold uppercase text-gray-400">Pengaturan</p>
                <div className="mt-2 space-y-1">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/dashboard/users')}
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Pengguna
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/dashboard/website')}
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Website
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/dashboard/integration')}
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <FileCode className="mr-2 h-5 w-5" />
                    Integrasi
                  </Button>
                </div>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-700 p-4">
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex h-16 items-center border-b border-gray-700 bg-dark-secondary px-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSidebarOpen(true)}
                  className="mr-2 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Cari..."
                  className="rounded-md border border-gray-700 bg-dark pl-10 pr-4 py-2 text-sm focus:border-cyberpunk focus:outline-none focus:ring-1 focus:ring-cyberpunk"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative text-gray-400 hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-gray-700">
                  <AvatarFallback className="bg-cyberpunk text-white">RA</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-dark p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

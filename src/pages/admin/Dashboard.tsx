
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, Users, ShoppingCart, Image, TrendingUp, ArrowUpRight, 
  ArrowDownRight, Eye, Clock, Calendar, Loader2
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    visitors: 0,
    products: 0,
    portfolios: 0,
    users: 0
  });
  
  useEffect(() => {
    console.log("Dashboard rendered", { user: user?.email });
    
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Periksa koneksi Supabase
        console.log("Verifying Supabase connection from Dashboard");
        const { error: connectionError } = await supabase.from('settings').select('id').limit(1);
        
        if (connectionError) {
          console.error("Supabase connection error in Dashboard:", connectionError);
          toast.error("Koneksi database gagal", {
            description: "Gagal memuat data dashboard dari Supabase"
          });
          return;
        }
        
        // Simulasikan pengambilan data statistik (dalam implementasi sebenarnya, ini akan mengambil data dari Supabase)
        const mockData = {
          visitors: 24895,
          products: 45,
          portfolios: 32,
          users: 5
        };
        
        setStats(mockData);
        console.log("Dashboard data loaded successfully");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Gagal memuat data", {
          description: "Terjadi kesalahan saat mengambil data dashboard"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  // Mock data for visitors chart
  const visitorsData = [
    { month: 'Jan', visitors: 450 },
    { month: 'Feb', visitors: 520 },
    { month: 'Mar', visitors: 490 },
    { month: 'Apr', visitors: 670 },
    { month: 'May', visitors: 730 },
    { month: 'Jun', visitors: 890 },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, activity: 'Halaman Beranda Diperbarui', time: '2 jam yang lalu', user: 'Administrator' },
    { id: 2, activity: 'Produk Baru Ditambahkan', time: 'Kemarin', user: 'Administrator' },
    { id: 3, activity: 'Portofolio Diperbarui', time: '3 hari yang lalu', user: 'Administrator' },
    { id: 4, activity: 'Pengaturan Website Diubah', time: '1 minggu yang lalu', user: 'Administrator' },
  ];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p>Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <p className="mt-1 text-sm text-gray-400">Selamat datang kembali, Administrator</p>
        </div>
        <div className="mt-4 flex md:mt-0">
          <Tabs defaultValue="hari-ini" className="w-full md:w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hari-ini">Hari Ini</TabsTrigger>
              <TabsTrigger value="minggu-ini">Minggu Ini</TabsTrigger>
              <TabsTrigger value="bulan-ini">Bulan Ini</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-700 bg-dark-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Pengunjung</CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors.toLocaleString()}</div>
            <div className="mt-1 flex items-center text-xs">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">12%</span>
              <span className="ml-1 text-gray-400">dibanding bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 bg-dark-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Produk</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
            <div className="mt-1 flex items-center text-xs">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">5%</span>
              <span className="ml-1 text-gray-400">dibanding bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 bg-dark-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Portofolio</CardTitle>
            <Image className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.portfolios}</div>
            <div className="mt-1 flex items-center text-xs">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">8%</span>
              <span className="ml-1 text-gray-400">dibanding bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 bg-dark-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Pengguna</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <div className="mt-1 flex items-center text-xs">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">0%</span>
              <span className="ml-1 text-gray-400">dibanding bulan lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-700 bg-dark-secondary">
          <CardHeader>
            <CardTitle className="text-lg">Statistik Pengunjung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f1f1f', 
                      border: '1px solid #333' 
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="visitors" fill="#9B30FF" radius={4} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-dark-secondary">
          <CardHeader>
            <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-cyberpunk/20">
                    <Clock className="h-4 w-4 text-cyberpunk" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.activity}</p>
                    <div className="mt-1 flex items-center text-xs text-gray-400">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{activity.time}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

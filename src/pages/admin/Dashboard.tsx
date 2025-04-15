
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, Users, ShoppingCart, Image, TrendingUp, ArrowUpRight, 
  ArrowDownRight, Eye, Clock, Calendar, Loader2, Database, RefreshCw
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hari-ini');
  const [stats, setStats] = useState({
    visitors: 0,
    products: 0,
    portfolios: 0,
    users: 0
  });
  const [databaseStatus, setDatabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Check Supabase connection
      console.log("Verifying Supabase connection from Dashboard");
      const { error: connectionError } = await supabase.from('settings').select('id').limit(1);
      
      if (connectionError) {
        console.error("Supabase connection error in Dashboard:", connectionError);
        setDatabaseStatus('error');
        toast.error("Koneksi database gagal", {
          description: "Gagal memuat data dashboard dari Supabase"
        });
        setIsLoading(false);
        return;
      }
      
      setDatabaseStatus('connected');
      
      // Fetch actual product count
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id')
        .limit(1000);
      
      // Fetch actual portfolio count
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('portfolio')
        .select('id')
        .limit(1000);
      
      if (productsError) {
        console.error("Error fetching products:", productsError);
      }
      
      if (portfolioError) {
        console.error("Error fetching portfolio items:", portfolioError);
      }
      
      // Use real counts or default to simulated data
      const dashboardData = {
        visitors: 24895, // Simulated since we don't track visitors yet
        products: productsData ? productsData.length : 45,
        portfolios: portfolioData ? portfolioData.length : 32,
        users: 5 // Simulated since we don't have a users table yet
      };
      
      setStats(dashboardData);
      console.log("Dashboard data loaded successfully:", dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDatabaseStatus('error');
      toast.error("Gagal memuat data", {
        description: "Terjadi kesalahan saat mengambil data dashboard"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    console.log("Dashboard rendered", { user: user?.email });
    fetchDashboardData();
  }, [user]);

  // Data for visitors chart - adjusted based on tab selection
  const getVisitorsData = () => {
    if (activeTab === 'hari-ini') {
      return [
        { time: '08:00', visitors: 150 },
        { time: '10:00', visitors: 220 },
        { time: '12:00', visitors: 390 },
        { time: '14:00', visitors: 270 },
        { time: '16:00', visitors: 430 },
        { time: '18:00', visitors: 350 },
        { time: '20:00', visitors: 290 },
      ];
    } else if (activeTab === 'minggu-ini') {
      return [
        { time: 'Sen', visitors: 950 },
        { time: 'Sel', visitors: 820 },
        { time: 'Rab', visitors: 1090 },
        { time: 'Kam', visitors: 870 },
        { time: 'Jum', visitors: 1230 },
        { time: 'Sab', visitors: 1450 },
        { time: 'Min', visitors: 1290 },
      ];
    } else {
      return [
        { time: 'Minggu 1', visitors: 4150 },
        { time: 'Minggu 2', visitors: 5220 },
        { time: 'Minggu 3', visitors: 6390 },
        { time: 'Minggu 4', visitors: 7270 },
      ];
    }
  };

  // Data for product categories
  const productCategoriesData = [
    { name: 'Hardware', value: 35 },
    { name: 'Software', value: 40 },
    { name: 'Services', value: 25 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, activity: 'Halaman Beranda Diperbarui', time: '2 jam yang lalu', user: 'Administrator' },
    { id: 2, activity: 'Produk Baru Ditambahkan', time: 'Kemarin', user: 'Administrator' },
    { id: 3, activity: 'Portofolio Diperbarui', time: '3 hari yang lalu', user: 'Administrator' },
    { id: 4, activity: 'Pengaturan Website Diubah', time: '1 minggu yang lalu', user: 'Administrator' },
    { id: 5, activity: 'Koneksi Supabase Diverifikasi', time: 'Baru saja', user: 'System' },
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

  if (databaseStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Database className="h-16 w-16 text-red-500" />
        <h2 className="text-xl font-bold">Koneksi Database Bermasalah</h2>
        <p className="text-gray-400 text-center max-w-lg">
          Tidak dapat terhubung ke database Supabase. Periksa koneksi internet Anda atau coba beberapa saat lagi.
        </p>
        <Button 
          onClick={fetchDashboardData} 
          className="mt-4 flex items-center gap-2 bg-cyberpunk hover:bg-cyberpunk-light"
        >
          <RefreshCw className="h-4 w-4" />
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <p className="mt-1 text-sm text-gray-400">Selamat datang kembali, {user?.email || 'Administrator'}</p>
        </div>
        <div className="mt-4 flex md:mt-0">
          <Tabs defaultValue="hari-ini" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-[400px]">
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
                <LineChart data={getVisitorsData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="time" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f1f1f', 
                      border: '1px solid #333' 
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#9B30FF" 
                    strokeWidth={2}
                    dot={{ fill: '#9B30FF', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="text-lg">Kategori Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productCategoriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {productCategoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f1f1f', 
                        border: '1px solid #333' 
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[200px] overflow-auto pr-2">
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

      {/* Database Connection Status */}
      <Card className="border-gray-700 bg-dark-secondary">
        <CardHeader>
          <CardTitle className="text-lg">Status Koneksi Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
              <Database className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium text-green-400">Terhubung ke Supabase</p>
              <p className="text-sm text-gray-400">Database berhasil terhubung dan berjalan normal</p>
            </div>
            <div className="ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-gray-700 text-gray-300"
                onClick={fetchDashboardData}
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

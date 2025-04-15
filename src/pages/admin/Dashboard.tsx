
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, Users, ShoppingCart, Image, TrendingUp, ArrowUpRight, 
  ArrowDownRight, Eye, Clock, Calendar
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

const Dashboard = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("Dashboard rendered", { user: user?.email });
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
            <div className="text-2xl font-bold">24,895</div>
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
            <div className="text-2xl font-bold">45</div>
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
            <div className="text-2xl font-bold">32</div>
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
            <div className="text-2xl font-bold">5</div>
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

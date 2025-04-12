
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Database, Key, Lock, ShieldCheck, Server, Globe, RefreshCw,
  CheckCircle2, Info, AlertCircle, MailCheck, CheckCheck, Upload, FileText
} from 'lucide-react';
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const IntegrationAdmin = () => {
  // Mock data for database tables
  const databaseTables = [
    { name: 'users', description: 'User data and authentication', rows: 15 },
    { name: 'products', description: 'Product catalog information', rows: 45 },
    { name: 'portfolio', description: 'Portfolio items and projects', rows: 32 },
    { name: 'pages', description: 'Website page content', rows: 5 },
    { name: 'settings', description: 'Website settings and configuration', rows: 8 },
  ];

  // Mock API status
  const apiStatus = {
    authentication: true,
    storage: true,
    functions: true,
    database: true,
    realtime: false,
  };

  const [supbaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [emailServiceKey, setEmailServiceKey] = useState("");
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectSupabase = () => {
    setIsConnecting(true);
    setTimeout(() => {
      toast.success("Berhasil terhubung ke Supabase", {
        description: "Database dan API sekarang aktif"
      });
      setIsConnecting(false);
    }, 1500);
  };

  const handleGenerateKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      setSupabaseKey("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvYnNwbHVzZGIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4MDEyMzQ1NiwiZXhwIjoxOTk1Njk5NDU2fQ");
      setIsGeneratingKey(false);
      toast.success("API Key berhasil dibuat");
    }, 1500);
  };

  const handleCreateTable = () => {
    toast.success("Tabel baru berhasil dibuat");
  };

  const handleSaveWebhook = () => {
    toast.success("Webhook URL berhasil disimpan");
  };

  const handleSaveEmailService = () => {
    toast.success("Email service berhasil dikonfigurasi");
  };

  const handleExportData = () => {
    toast.success("Data berhasil diekspor");
  };

  const handleImportData = () => {
    toast.success("Data berhasil diimpor");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Integrasi & Database</h1>
        <p className="mt-1 text-sm text-gray-400">Kelola integrasi Supabase dan database untuk website</p>
      </div>

      <Tabs defaultValue="database" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>

        {/* Database Tab */}
        <TabsContent value="database" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Koneksi Database
              </CardTitle>
              <CardDescription>
                Kelola koneksi database Supabase untuk aplikasi ini
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="supabase-url" className="text-sm font-medium text-gray-300">
                    Supabase URL
                  </label>
                  <Input
                    id="supabase-url"
                    value={supbaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://your-project.supabase.co"
                    className="bg-dark border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="supabase-key" className="text-sm font-medium text-gray-300">
                    Supabase API Key
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="supabase-key"
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      type="password"
                      placeholder="your-api-key"
                      className="flex-1 bg-dark border-gray-700"
                    />
                    <Button 
                      onClick={handleGenerateKey}
                      variant="outline" 
                      className="border-gray-700 text-white"
                      disabled={isGeneratingKey}
                    >
                      {isGeneratingKey ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Key className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleConnectSupabase}
                className="bg-cyberpunk hover:bg-cyberpunk-light mt-4"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Server className="mr-2 h-4 w-4" />
                    Connect to Supabase
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle>Database Tables</CardTitle>
              <CardDescription>
                Table structure and data management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-gray-700">
                  <div className="grid grid-cols-4 border-b border-gray-700 bg-gray-800 p-3 font-medium">
                    <div>Table Name</div>
                    <div className="col-span-2">Description</div>
                    <div className="text-right">Rows</div>
                  </div>
                  {databaseTables.map((table) => (
                    <div key={table.name} className="grid grid-cols-4 border-b border-gray-700 p-3 last:border-0">
                      <div className="font-medium">{table.name}</div>
                      <div className="col-span-2 text-gray-400">{table.description}</div>
                      <div className="text-right">{table.rows}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700 flex justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleCreateTable}
                  className="border-gray-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Table
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleExportData}
                  className="border-gray-700 text-white"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
              <Button 
                variant="outline" 
                onClick={handleImportData}
                className="border-gray-700 text-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                API Status
              </CardTitle>
              <CardDescription>
                Status layanan API dan endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                  <div className="flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5 text-gray-400" />
                    <span>Authentication API</span>
                  </div>
                  <div>
                    {apiStatus.authentication ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                  <div className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-gray-400" />
                    <span>Database API</span>
                  </div>
                  <div>
                    {apiStatus.database ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-gray-400" />
                    <span>Storage API</span>
                  </div>
                  <div>
                    {apiStatus.storage ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                  <div className="flex items-center">
                    <Server className="mr-2 h-5 w-5 text-gray-400" />
                    <span>Functions API</span>
                  </div>
                  <div>
                    {apiStatus.functions ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                  <div className="flex items-center">
                    <RefreshCw className="mr-2 h-5 w-5 text-gray-400" />
                    <span>Realtime API</span>
                  </div>
                  <div>
                    {apiStatus.realtime ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-yellow-500">
                        <Info className="mr-1 h-4 w-4" />
                        <span>Not Configured</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button className="bg-cyberpunk hover:bg-cyberpunk-light">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Status
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>
                Configure external webhooks for event notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="webhook-url" className="text-sm font-medium text-gray-300">
                  Webhook URL
                </label>
                <Input
                  id="webhook-url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-webhook-receiver.com/notify"
                  className="bg-dark border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Events to Trigger
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="event-insert" 
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="event-insert" className="text-sm text-gray-300">
                      Insert
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="event-update" 
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="event-update" className="text-sm text-gray-300">
                      Update
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="event-delete" 
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="event-delete" className="text-sm text-gray-300">
                      Delete
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="event-auth" 
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="event-auth" className="text-sm text-gray-300">
                      Authentication
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button 
                onClick={handleSaveWebhook}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Save Webhook
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Authentication Tab */}
        <TabsContent value="authentication" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Authentication Settings
              </CardTitle>
              <CardDescription>
                Configure authentication methods and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Authentication Providers
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                    <div className="flex items-center">
                      <MailCheck className="mr-2 h-5 w-5 text-gray-400" />
                      <span>Email & Password</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      <span>Enabled</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                    <div className="flex items-center">
                      <svg className="mr-2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span>Google</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Info className="mr-1 h-4 w-4" />
                      <span>Not Configured</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                    <div className="flex items-center">
                      <svg className="mr-2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9 21.59 18.03 20.39 19.62 18.58C21.2 16.78 22.13 14.47 22.13 12.06C22.13 6.53 17.63 2.04 12.13 2.04H12Z" />
                      </svg>
                      <span>Facebook</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Info className="mr-1 h-4 w-4" />
                      <span>Not Configured</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                    <div className="flex items-center">
                      <svg className="mr-2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Info className="mr-1 h-4 w-4" />
                      <span>Not Configured</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Authentication Settings
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="email-confirmation" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="email-confirmation" className="text-sm text-gray-300">
                      Require email confirmation
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="password-recovery" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="password-recovery" className="text-sm text-gray-300">
                      Enable password recovery
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="jwt-expiry" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="jwt-expiry" className="text-sm text-gray-300">
                      JWT expiry after 7 days
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email-service" className="text-sm font-medium text-gray-300">
                  Email Service Configuration
                </label>
                <div className="space-y-2">
                  <Input
                    id="email-service"
                    placeholder="Email Service API Key"
                    type="password"
                    value={emailServiceKey}
                    onChange={(e) => setEmailServiceKey(e.target.value)}
                    className="bg-dark border-gray-700"
                  />
                  <Textarea
                    placeholder="Email template for notifications"
                    className="min-h-[100px] bg-dark border-gray-700"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button 
                onClick={handleSaveEmailService}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Save Authentication Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Database Settings
              </CardTitle>
              <CardDescription>
                Advanced database settings and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Row-Level Security (RLS)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="enable-rls" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="enable-rls" className="text-sm text-gray-300">
                      Enable Row-Level Security
                    </label>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Row-Level Security (RLS) restricts which rows of data a user can access based on their role.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Database Backups
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="daily-backups" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="daily-backups" className="text-sm text-gray-300">
                      Enable daily backups
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="point-in-time" 
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="point-in-time" className="text-sm text-gray-300">
                      Enable point-in-time recovery
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Database Performance
                </label>
                <select
                  className="w-full rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                >
                  <option value="small">Small (1GB, 2 CPU)</option>
                  <option value="medium">Medium (4GB, 4 CPU)</option>
                  <option value="large">Large (8GB, 8 CPU)</option>
                  <option value="extra">Extra Large (16GB, 16 CPU)</option>
                </select>
                <p className="mt-1 text-xs text-gray-400">
                  Select the performance tier for your database based on your needs.
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button className="bg-cyberpunk hover:bg-cyberpunk-light">
                <CheckCheck className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle>Data Migration</CardTitle>
              <CardDescription>
                Tools for migrating data between environments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">Import Data</h3>
                  <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-gray-700 bg-dark">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-500" />
                      <p className="text-sm text-gray-500">Drag & drop SQL or CSV file</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">Export Format</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="format-sql" 
                        name="export-format" 
                        checked
                        className="h-4 w-4 border-gray-700 bg-dark text-cyberpunk"
                      />
                      <label htmlFor="format-sql" className="text-sm text-gray-300">
                        SQL Dump
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="format-csv" 
                        name="export-format" 
                        className="h-4 w-4 border-gray-700 bg-dark text-cyberpunk"
                      />
                      <label htmlFor="format-csv" className="text-sm text-gray-300">
                        CSV
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="format-json" 
                        name="export-format" 
                        className="h-4 w-4 border-gray-700 bg-dark text-cyberpunk"
                      />
                      <label htmlFor="format-json" className="text-sm text-gray-300">
                        JSON
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleImportData}
                className="border-gray-700 text-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button 
                onClick={handleExportData}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export All Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationAdmin;


import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const PagesManagement = lazy(() => import("./pages/admin/PagesManagement"));
const ProductsManagement = lazy(() => import("./pages/admin/ProductsManagement"));
const PortfolioManagement = lazy(() => import("./pages/admin/PortfolioManagement"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const WebsiteSettings = lazy(() => import("./pages/admin/WebsiteSettings"));
const IntegrationAdmin = lazy(() => import("./pages/admin/IntegrationAdmin"));
const AuthGuard = lazy(() => import("./components/admin/AuthGuard"));
const SetupAdmin = lazy(() => import("./pages/SetupAdmin"));
const GenerateSetupToken = lazy(() => import("./pages/GenerateSetupToken"));

// Loading component for lazy-loaded pages
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-dark">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
      <p className="text-white">Memuat halaman...</p>
    </div>
  </div>
);

// Configure React Query for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Setup Admin Route */}
            <Route path="/setup-admin" element={<SetupAdmin />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="pages" element={<PagesManagement />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="portfolio" element={<PortfolioManagement />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="website" element={<WebsiteSettings />} />
              <Route path="integration" element={<IntegrationAdmin />} />
              <Route path="generate-token" element={<GenerateSetupToken />} />
            </Route>
            
            {/* Nested Admin Routes with proper paths */}
            <Route 
              path="/admin/pages" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<PagesManagement />} />
            </Route>
            
            <Route 
              path="/admin/products" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<ProductsManagement />} />
            </Route>
            
            <Route 
              path="/admin/portfolio" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<PortfolioManagement />} />
            </Route>
            
            <Route 
              path="/admin/users" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<UsersManagement />} />
            </Route>
            
            <Route 
              path="/admin/website" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<WebsiteSettings />} />
            </Route>
            
            <Route 
              path="/admin/integration" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<IntegrationAdmin />} />
            </Route>
            
            <Route 
              path="/admin/generate-token" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<GenerateSetupToken />} />
            </Route>
            
            {/* Redirect /admin/* to Dashboard */}
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

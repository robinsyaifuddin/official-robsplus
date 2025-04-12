
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./components/ContactPage"; // Note: This should be moved to pages/ folder in a refactoring
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PagesManagement from "./pages/admin/PagesManagement";
import ProductsManagement from "./pages/admin/ProductsManagement";
import PortfolioManagement from "./pages/admin/PortfolioManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import WebsiteSettings from "./pages/admin/WebsiteSettings";
import IntegrationAdmin from "./pages/admin/IntegrationAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<PagesManagement />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="portfolio" element={<PortfolioManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="website" element={<WebsiteSettings />} />
            <Route path="integration" element={<IntegrationAdmin />} />
          </Route>
          
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Link } from "react-router-dom";
import { ChevronRight, Mail, Instagram, Globe, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const orderFormSchema = z.object({
  fullName: z.string().min(3, { message: "Nama harus minimal 3 karakter" }),
  phoneNumber: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  category: z.enum(["Tugas", "Digital", "Belajar"]),
  serviceType: z.string().min(1, { message: "Silakan pilih jenis layanan" }),
  description: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const serviceTypes = {
  Tugas: ["Tugas Kuliah", "Tugas Sekolah", "Proyek Penelitian", "Laporan Praktikum"],
  Digital: ["Desain Grafis", "Pengembangan Web", "Aplikasi Mobile", "Digital Marketing"],
  Belajar: ["Bimbingan Akademik", "Kursus Programming", "Tutorial Design", "Konsultasi Projek"]
};

const Footer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"Tugas" | "Digital" | "Belajar" | null>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      category: "Tugas",
      serviceType: "",
      description: "",
    },
  });

  const handleCategoryChange = (category: "Tugas" | "Digital" | "Belajar") => {
    setSelectedCategory(category);
    form.setValue("category", category);
    form.setValue("serviceType", "");
  };

  const onSubmit = (data: OrderFormValues) => {
    // Format WhatsApp message
    const message = `Halo ROBsPlus! Saya ingin memesan layanan dengan detail berikut:
    
*Nama:* ${data.fullName}
*No Telepon:* ${data.phoneNumber}
*Kategori:* ${data.category}
*Jenis Layanan:* ${data.serviceType}
*Keterangan:* ${data.description || "-"}

Mohon informasi lebih lanjut mengenai layanan ini. Terima kasih!`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/6285768192419?text=${encodedMessage}`, "_blank");
    
    // Close form and show success message
    setIsFormOpen(false);
    toast.success("Pesanan Anda telah dikirim ke WhatsApp!");
    
    // Reset form
    form.reset();
  };

  return (
    <footer className="bg-dark-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-bold font-poppins text-white flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/3fb5da8a-be09-49f5-8f5e-cfe405af7e9e.png" 
                alt="ROBsPlus Logo" 
                className="h-10 w-auto" 
              />
              <span className="text-cyberpunk">ROBsPlus</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Menyediakan solusi digital terdepan untuk membantu bisnis Anda berkembang di era modern dengan pendekatan yang inovatif dan efektif.
            </p>
            <div className="flex gap-4">
              <a 
                href="mailto:hello.robsplus@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail size={18} className="text-white" />
              </a>
              <a 
                href="https://wa.me/6285768192419" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <Phone size={18} className="text-white" />
              </a>
              <a 
                href="https://instagram.com/ofc.robsplus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a 
                href="https://robsplus.web.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 hover:-translate-y-1"
                aria-label="Website"
              >
                <Globe size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Link Penting
              <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-cyberpunk"></span>
            </h3>
            <ul className="space-y-3">
              {['Home', 'Tentang Kami', 'Layanan', 'Portofolio', 'Kontak'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 hover:text-cyberpunk flex items-center transition-all duration-300"
                  >
                    <ChevronRight size={16} className="mr-2" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Layanan Kami
              <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-cyberpunk"></span>
            </h3>
            <ul className="space-y-3">
              {['Layanan Tugas', 'Layanan Digital', 'Layanan Belajar', 'Konsultasi', 'Support'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/services#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 hover:text-cyberpunk flex items-center transition-all duration-300"
                  >
                    <ChevronRight size={16} className="mr-2" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Newsletter
              <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-cyberpunk"></span>
            </h3>
            <p className="text-gray-300 mb-4">
              Berlangganan newsletter kami untuk mendapatkan update terbaru tentang layanan kami dan industri digital.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-2 rounded-l-lg bg-dark border border-gray-700 focus:outline-none focus:border-cyberpunk text-white"
              />
              <button
                type="submit"
                className="bg-cyberpunk text-white px-4 py-2 rounded-r-lg hover:bg-cyberpunk-light transition-all duration-300"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ROBsPlus. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-cyberpunk text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-cyberpunk text-sm">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-cyberpunk text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Order Form Sheet */}
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="bg-dark-secondary border-l border-cyberpunk/30 overflow-y-auto" side="right">
          <SheetHeader>
            <SheetTitle className="text-white text-2xl">Pesan Layanan</SheetTitle>
            <SheetDescription className="text-gray-300">
              Silakan isi formulir berikut untuk melakukan pemesanan layanan ROBsPlus
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} className="bg-dark border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="cth: 08123456789" {...field} className="bg-dark border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Kategori Pesanan</FormLabel>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Tugas", "Digital", "Belajar"] as const).map((category) => (
                        <Button
                          key={category}
                          type="button"
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={selectedCategory === category ? "bg-cyberpunk border-cyberpunk" : "text-white"}
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Jenis Layanan</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedCategory && serviceTypes[selectedCategory].map((service) => (
                        <Button
                          key={service}
                          type="button"
                          variant={field.value === service ? "default" : "outline"}
                          className={`justify-start ${field.value === service ? "bg-cyberpunk border-cyberpunk" : "text-white"}`}
                          onClick={() => form.setValue("serviceType", service)}
                        >
                          {service}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detail tambahan tentang pesanan Anda" 
                        {...field} 
                        className="bg-dark border-gray-700 text-white min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-cyberpunk hover:bg-cyberpunk-light">
                Pesan Sekarang
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </footer>
  );
};

export default Footer;

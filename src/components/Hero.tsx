
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
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

const Hero = () => {
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
    
    // Show success message
    toast.success("Pesanan Anda telah dikirim ke WhatsApp!");
    
    // Reset form
    form.reset();
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="lg:flex lg:items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Modern Solutions for the</span><br />
              <span className="text-cyberpunk bg-clip-text bg-gradient-to-r from-cyberpunk to-cyberpunk-light">Digital Age</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              ROBsPlus adalah agensi digital penyedia layanan kebutuhan Anda dengan solusi inovatif yang mentransformasi bisnis dan memikat audiens.
            </p>

            <div className="flex flex-wrap gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="cyberpunk-button flex items-center gap-2 text-lg">
                    Mulai Pesanan <ArrowRight size={18} />
                  </Button>
                </SheetTrigger>
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
              <Link to="/portfolio" className="bg-transparent border border-cyberpunk text-cyberpunk hover:bg-cyberpunk/10 font-medium py-2 px-4 rounded transition-all duration-300 text-lg">
                View Portfolio
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative">
              <div className="border border-cyberpunk/30 rounded-xl bg-dark-secondary/50 backdrop-blur-lg p-8 transition-all duration-500 hover:-translate-y-2">
                <div className="flex justify-between mb-8">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="w-12 h-12 rounded-full bg-cyberpunk/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-cyberpunk"></div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="h-6 bg-cyberpunk/10 rounded-md w-full"></div>
                  ))}
                  <div className="h-6 bg-cyberpunk/10 rounded-md w-3/4"></div>
                </div>

                <div className="mt-8 p-4 bg-dark/40 rounded-lg border border-cyberpunk/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-cyberpunk/30"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-cyberpunk/20 rounded-md w-1/3 mb-2"></div>
                      <div className="h-4 bg-cyberpunk/10 rounded-md w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-cyberpunk/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-cyberpunk/10 rounded-full filter blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="border-2 border-white/20 rounded-full p-2">
          <ArrowRight size={20} className="rotate-90 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

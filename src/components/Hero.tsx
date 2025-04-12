import React, { useState } from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Hero = () => {
  // Data untuk kategori layanan dan jenisnya
  const serviceCategories = {
    "Layanan Tugas": ["Tugas Sekolah", "Tugas Kuliah", "Tugas Kantor"],
    "Layanan Digital": ["Desain Grafis", "Website", "Aplikasi", "Social Media Management"],
    "Layanan Belajar": ["Privat", "Kelompok", "Online Course"]
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    category: "",
    service: "",
    notes: ""
  });

  const handleInputChange = (field, value) => {
    setOrderDetails({
      ...orderDetails,
      [field]: value
    });

    if (field === "category") {
      setSelectedCategory(value);
      setOrderDetails({
        ...orderDetails,
        category: value,
        service: ""
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format pesan WhatsApp
    const message = `Halo ROBsPlus! Saya ingin memesan:\n\nNama: ${orderDetails.name}\nNo. Telepon: ${orderDetails.phone}\nKategori: ${orderDetails.category}\nLayanan: ${orderDetails.service}\nKeterangan: ${orderDetails.notes}`;
    
    // Encode pesan untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(message);
    
    // Buka WhatsApp dengan pesan yang sudah disiapkan
    window.open(`https://wa.me/6285768192419?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="lg:flex lg:items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Layanan Terbaik</span><br />
              <span className="text-cyberpunk bg-clip-text bg-gradient-to-r from-cyberpunk to-cyberpunk-light">Penuhi Kebutuhan Anda</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              ROBsPlus adalah agensi digital penyedia layanan kebutuhan Anda dengan solusi inovatif yang mentransformasi bisnis dan memikat audiens.
            </p>

            <div className="flex flex-wrap gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="cyberpunk-button flex items-center gap-2 text-lg">
                    Mulai Pesanan <ArrowRight size={18} />
                  </button>
                </SheetTrigger>
                <SheetContent className="bg-dark-secondary border-l border-cyberpunk/30">
                  <SheetHeader>
                    <SheetTitle className="text-white">Formulir Pemesanan</SheetTitle>
                    <SheetDescription className="text-gray-300">
                      Silahkan isi formulir dibawah ini untuk memulai pesanan.
                    </SheetDescription>
                  </SheetHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <label htmlFor="name-hero" className="text-sm font-medium text-white">Nama Lengkap</label>
                      <Input 
                        id="name-hero" 
                        className="bg-dark border-gray-700 text-white"
                        value={orderDetails.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone-hero" className="text-sm font-medium text-white">No Telepon</label>
                      <Input 
                        id="phone-hero" 
                        type="tel"
                        className="bg-dark border-gray-700 text-white"
                        value={orderDetails.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category-hero" className="text-sm font-medium text-white">Kategori Pesanan</label>
                      <Select 
                        value={orderDetails.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger id="category-hero" className="bg-dark border-gray-700 text-white">
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-secondary text-white">
                          {Object.keys(serviceCategories).map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="service-hero" className="text-sm font-medium text-white">Jenis Layanan</label>
                      <Select 
                        value={orderDetails.service} 
                        onValueChange={(value) => handleInputChange("service", value)}
                        disabled={!selectedCategory}
                      >
                        <SelectTrigger id="service-hero" className="bg-dark border-gray-700 text-white">
                          <SelectValue placeholder={selectedCategory ? "Pilih Layanan" : "Pilih Kategori Dulu"} />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-secondary text-white">
                          {selectedCategory && serviceCategories[selectedCategory].map((service) => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="notes-hero" className="text-sm font-medium text-white">Keterangan</label>
                      <Textarea 
                        id="notes-hero"
                        className="bg-dark border-gray-700 text-white min-h-[100px]"
                        placeholder="Jelaskan detail kebutuhan Anda"
                        value={orderDetails.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full cyberpunk-button mt-4"
                    >
                      Pesan Sekarang
                    </button>
                  </form>
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


import { Link } from "react-router-dom";
import { ChevronRight, Mail, Instagram, Globe, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Footer = () => {
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
    <footer className="bg-dark-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-bold font-poppins text-white flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/a67d8107-f890-4209-b488-428e15485798.png" 
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
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 transform hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://wa.me/6285768192419" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://instagram.com/ofc.robsplus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://robsplus.web.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300 transform hover:scale-110"
                aria-label="Website"
              >
                <Globe className="w-5 h-5 text-white" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-300">
                <strong>Lokasi:</strong> Way Kandis, Bandar Lampung, Indonesia 35143
              </p>
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
    </footer>
  );
};

export default Footer;

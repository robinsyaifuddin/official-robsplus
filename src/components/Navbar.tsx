import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
  const handleSubmit = e => {
    e.preventDefault();

    // Format pesan WhatsApp
    const message = `Halo ROBsPlus! Saya ingin memesan:\n\nNama: ${orderDetails.name}\nNo. Telepon: ${orderDetails.phone}\nKategori: ${orderDetails.category}\nLayanan: ${orderDetails.service}\nKeterangan: ${orderDetails.notes}`;

    // Encode pesan untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(message);

    // Buka WhatsApp dengan pesan yang sudah disiapkan
    window.open(`https://wa.me/6285768192419?text=${encodedMessage}`, '_blank');
  };
  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Services',
    path: '/services'
  }, {
    name: 'Portfolio',
    path: '/portfolio'
  }, {
    name: 'About Us',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);
  return <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-secondary/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold font-poppins text-white flex items-center gap-2">
          <img src="/lovable-uploads/a67d8107-f890-4209-b488-428e15485798.png" alt="ROBsPlus Logo" className="h-10 w-auto" />
          
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(item => <Link key={item.name} to={item.path} className={`text-sm tracking-wide transition-all duration-300 hover:text-cyberpunk ${location.pathname === item.path ? 'text-cyberpunk font-medium' : 'text-gray-300'}`}>
              {item.name}
            </Link>)}
          <Sheet>
            <SheetTrigger asChild>
              <button className="cyberpunk-button">
                Mulai Pesanan
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
                  <label htmlFor="name" className="text-sm font-medium text-white">Nama Lengkap</label>
                  <Input id="name" className="bg-dark border-gray-700 text-white" value={orderDetails.name} onChange={e => handleInputChange("name", e.target.value)} required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white">No Telepon</label>
                  <Input id="phone" type="tel" className="bg-dark border-gray-700 text-white" value={orderDetails.phone} onChange={e => handleInputChange("phone", e.target.value)} required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium text-white">Kategori Pesanan</label>
                  <Select value={orderDetails.category} onValueChange={value => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-dark border-gray-700 text-white">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary text-white">
                      {Object.keys(serviceCategories).map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-white">Jenis Layanan</label>
                  <Select value={orderDetails.service} onValueChange={value => handleInputChange("service", value)} disabled={!selectedCategory}>
                    <SelectTrigger className="bg-dark border-gray-700 text-white">
                      <SelectValue placeholder={selectedCategory ? "Pilih Layanan" : "Pilih Kategori Dulu"} />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary text-white">
                      {selectedCategory && serviceCategories[selectedCategory].map(service => <SelectItem key={service} value={service}>{service}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium text-white">Keterangan</label>
                  <Textarea id="notes" className="bg-dark border-gray-700 text-white min-h-[100px]" placeholder="Jelaskan detail kebutuhan Anda" value={orderDetails.notes} onChange={e => handleInputChange("notes", e.target.value)} />
                </div>
                
                <button type="submit" className="w-full cyberpunk-button mt-4">
                  Pesan Sekarang
                </button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-dark-secondary/95 backdrop-blur-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-10px] opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navItems.map(item => <Link key={item.name} to={item.path} className={`py-2 transition-colors duration-300 ${location.pathname === item.path ? 'text-cyberpunk font-medium' : 'text-gray-300'}`}>
              {item.name}
            </Link>)}
          <Sheet>
            <SheetTrigger asChild>
              <button className="cyberpunk-button w-full text-center mt-4">
                Mulai Pesanan
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
                  <label htmlFor="name-mobile" className="text-sm font-medium text-white">Nama Lengkap</label>
                  <Input id="name-mobile" className="bg-dark border-gray-700 text-white" value={orderDetails.name} onChange={e => handleInputChange("name", e.target.value)} required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone-mobile" className="text-sm font-medium text-white">No Telepon</label>
                  <Input id="phone-mobile" type="tel" className="bg-dark border-gray-700 text-white" value={orderDetails.phone} onChange={e => handleInputChange("phone", e.target.value)} required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category-mobile" className="text-sm font-medium text-white">Kategori Pesanan</label>
                  <Select value={orderDetails.category} onValueChange={value => handleInputChange("category", value)}>
                    <SelectTrigger id="category-mobile" className="bg-dark border-gray-700 text-white">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary text-white">
                      {Object.keys(serviceCategories).map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="service-mobile" className="text-sm font-medium text-white">Jenis Layanan</label>
                  <Select value={orderDetails.service} onValueChange={value => handleInputChange("service", value)} disabled={!selectedCategory}>
                    <SelectTrigger id="service-mobile" className="bg-dark border-gray-700 text-white">
                      <SelectValue placeholder={selectedCategory ? "Pilih Layanan" : "Pilih Kategori Dulu"} />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary text-white">
                      {selectedCategory && serviceCategories[selectedCategory].map(service => <SelectItem key={service} value={service}>{service}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="notes-mobile" className="text-sm font-medium text-white">Keterangan</label>
                  <Textarea id="notes-mobile" className="bg-dark border-gray-700 text-white min-h-[100px]" placeholder="Jelaskan detail kebutuhan Anda" value={orderDetails.notes} onChange={e => handleInputChange("notes", e.target.value)} />
                </div>
                
                <button type="submit" className="w-full cyberpunk-button mt-4">
                  Pesan Sekarang
                </button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>;
};
export default Navbar;
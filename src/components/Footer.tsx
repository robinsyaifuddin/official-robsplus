
import { Link } from "react-router-dom";
import { ChevronRight, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-bold font-poppins text-white flex items-center gap-2 mb-4">
              <span className="text-cyberpunk">Cyber</span>Agency
            </Link>
            <p className="text-gray-300 mb-4">
              Menyediakan solusi digital terdepan untuk membantu bisnis Anda berkembang di era modern dengan pendekatan yang inovatif dan efektif.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300"
                >
                  <div className="w-4 h-4 bg-white/50 rounded-sm"></div>
                </a>
              ))}
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
            © {new Date().getFullYear()} CyberAgency. All rights reserved.
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

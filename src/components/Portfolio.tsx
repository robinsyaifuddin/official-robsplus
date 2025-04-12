
import { useState } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ["All", "Web", "Design", "Digital"];

const portfolioItems = [
  {
    title: "Modern Web App",
    category: "Web",
    image: "bg-gradient-to-br from-purple-700 to-indigo-900",
    description: "Pengembangan aplikasi web modern dengan teknologi terkini."
  },
  {
    title: "Brand Identity",
    category: "Design",
    image: "bg-gradient-to-br from-pink-500 to-red-600",
    description: "Perancangan identitas merek yang kuat dan konsisten."
  },
  {
    title: "E-commerce Platform",
    category: "Web",
    image: "bg-gradient-to-br from-blue-600 to-cyan-700",
    description: "Platform e-commerce dengan pengalaman pengguna yang optimal."
  },
  {
    title: "Marketing Campaign",
    category: "Digital",
    image: "bg-gradient-to-br from-green-500 to-emerald-700",
    description: "Kampanye pemasaran digital dengan hasil terukur."
  },
  {
    title: "Mobile Application",
    category: "Web",
    image: "bg-gradient-to-br from-amber-500 to-orange-700",
    description: "Aplikasi mobile dengan tampilan menarik dan performa tinggi."
  },
  {
    title: "UI/UX Design System",
    category: "Design",
    image: "bg-gradient-to-br from-violet-600 to-purple-800",
    description: "Sistem desain UI/UX komprehensif untuk produk digital."
  }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);
  
  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">Portofolio Kami</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Eksplor karya dan proyek terbaik kami yang telah berhasil membantu klien mencapai tujuan mereka dengan solusi digital yang inovatif.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-cyberpunk text-white'
                  : 'bg-dark-secondary text-gray-300 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="cyberpunk-card group overflow-hidden"
            >
              <div className={`h-48 ${item.image} rounded-md mb-4 relative overflow-hidden group-hover:scale-105 transition-all duration-500`}>
                <div className="absolute inset-0 bg-cyberpunk/0 group-hover:bg-cyberpunk/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white text-dark p-2 rounded-full">
                    <Eye size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="px-2 py-1 text-xs rounded bg-cyberpunk/20 text-cyberpunk">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                <Link 
                  to={`/portfolio/${index + 1}`} 
                  className="inline-flex items-center text-cyberpunk hover:underline transition-all group-hover:translate-x-1 duration-300"
                >
                  View Details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/portfolio" className="cyberpunk-button inline-flex items-center">
            Lihat Semua Portofolio <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

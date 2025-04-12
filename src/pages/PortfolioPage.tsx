
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene";
import { Eye, ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "Modern Web App",
    category: "Web",
    image: "bg-gradient-to-br from-purple-700 to-indigo-900",
    description: "Pengembangan aplikasi web modern dengan teknologi terkini untuk sebuah startup fintech.",
    client: "FinTech Solutions",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    year: 2023
  },
  {
    title: "Brand Identity",
    category: "Design",
    image: "bg-gradient-to-br from-pink-500 to-red-600",
    description: "Perancangan identitas merek yang kuat dan konsisten untuk perusahaan retail lokal yang sedang berkembang.",
    client: "Local Retail Co.",
    technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
    year: 2023
  },
  {
    title: "E-commerce Platform",
    category: "Web",
    image: "bg-gradient-to-br from-blue-600 to-cyan-700",
    description: "Platform e-commerce dengan pengalaman pengguna yang optimal dan fitur manajemen toko yang lengkap.",
    client: "ShopEasy",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redux"],
    year: 2022
  },
  {
    title: "Marketing Campaign",
    category: "Digital",
    image: "bg-gradient-to-br from-green-500 to-emerald-700",
    description: "Kampanye pemasaran digital dengan hasil terukur untuk meningkatkan awareness brand kosmetik lokal.",
    client: "Glow Cosmetics",
    technologies: ["Google Ads", "Facebook Ads", "Instagram", "Analytics"],
    year: 2022
  },
  {
    title: "Mobile Application",
    category: "Web",
    image: "bg-gradient-to-br from-amber-500 to-orange-700",
    description: "Aplikasi mobile dengan tampilan menarik dan performa tinggi untuk layanan food delivery.",
    client: "QuickBite",
    technologies: ["React Native", "Firebase", "Redux", "Google Maps API"],
    year: 2023
  },
  {
    title: "UI/UX Design System",
    category: "Design",
    image: "bg-gradient-to-br from-violet-600 to-purple-800",
    description: "Sistem desain UI/UX komprehensif untuk produk digital sebuah perusahaan teknologi kesehatan.",
    client: "HealthTech Inc.",
    technologies: ["Figma", "Sketch", "Adobe XD", "Zeplin"],
    year: 2022
  },
  {
    title: "Company Website",
    category: "Web",
    image: "bg-gradient-to-br from-teal-500 to-cyan-600",
    description: "Website perusahaan yang modern dan responsif untuk sebuah konsultan bisnis internasional.",
    client: "Global Consulting",
    technologies: ["WordPress", "Elementor", "PHP", "MySQL"],
    year: 2022
  },
  {
    title: "Social Media Management",
    category: "Digital",
    image: "bg-gradient-to-br from-red-500 to-pink-600",
    description: "Pengelolaan media sosial untuk meningkatkan engagement dan konversi untuk brand fashion.",
    client: "Urban Style",
    technologies: ["Facebook", "Instagram", "TikTok", "Content Calendar"],
    year: 2023
  },
  {
    title: "Educational Platform",
    category: "Web",
    image: "bg-gradient-to-br from-indigo-500 to-purple-600",
    description: "Platform pembelajaran online dengan fitur interaktif dan sistem manajemen kursus yang komprehensif.",
    client: "EduLearn",
    technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC"],
    year: 2023
  }
];

const categories = ["All", "Web", "Design", "Digital"];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  
  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <ThreeScene />
      <Navbar />
      
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Portofolio <span className="text-cyberpunk">Kami</span>
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
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
                  onClick={() => setSelectedItem(item)}
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
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <button 
                      className="inline-flex items-center text-cyberpunk hover:underline transition-all group-hover:translate-x-1 duration-300"
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details <ExternalLink size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Portfolio Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">{selectedItem.title}</h2>
                  <button 
                    className="p-2 hover:bg-dark rounded-full"
                    onClick={() => setSelectedItem(null)}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className={`${selectedItem.image} h-64 md:h-80 rounded-lg mb-6`}></div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Project Description</h3>
                    <p className="text-gray-300 mb-6">
                      {selectedItem.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-4">Challenges & Solutions</h3>
                    <p className="text-gray-300 mb-6">
                      Dalam proyek ini, kami menghadapi tantangan dalam {selectedItem.category === 'Web' ? 'mengoptimalkan performa aplikasi' : selectedItem.category === 'Design' ? 'menciptakan identitas visual yang unik' : 'mengintegrasikan berbagai platform digital'}.
                      Kami berhasil mengatasi tantangan tersebut dengan pendekatan yang inovatif dan solusi teknis yang tepat.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-4">Results</h3>
                    <p className="text-gray-300">
                      Proyek ini berhasil {selectedItem.category === 'Web' ? 'meningkatkan performa website sebesar 40%' : selectedItem.category === 'Design' ? 'meningkatkan brand recognition sebesar 35%' : 'meningkatkan engagement di media sosial sebesar 60%'} 
                      dan memberikan dampak positif terhadap bisnis klien kami.
                    </p>
                  </div>
                  
                  <div>
                    <div className="bg-dark p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm text-gray-400 mb-1">Client</h4>
                          <p>{selectedItem.client}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-gray-400 mb-1">Year</h4>
                          <p>{selectedItem.year}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-gray-400 mb-1">Category</h4>
                          <p>{selectedItem.category}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-gray-400 mb-1">Technologies</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedItem.technologies.map((tech, i) => (
                              <span key={i} className="px-2 py-1 bg-cyberpunk/10 text-cyberpunk text-xs rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-700">
                        <button className="cyberpunk-button w-full">
                          Visit Project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioPage;

// Temporary XIcon for the modal close button
const X = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

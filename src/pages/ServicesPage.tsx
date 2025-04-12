
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene";
import { Monitor, BookOpen, FileDigit, Code, Layout, Cpu, Database, PenTool, GraduationCap } from "lucide-react";

const ServicesPage = () => {
  const serviceCategories = [
    {
      title: "Layanan Tugas",
      icon: <Monitor className="w-8 h-8 text-cyberpunk" />,
      description: "Solusi komprehensif untuk berbagai kebutuhan tugas akademik dan profesional dengan pendekatan yang terstruktur dan hasil berkualitas tinggi.",
      services: [
        {
          title: "Konsultasi Tugas",
          icon: <PenTool size={20} className="text-cyberpunk" />,
          description: "Layanan konsultasi untuk membantu menyelesaikan tugas dengan panduan dari ahli di bidangnya."
        },
        {
          title: "Pengerjaan Proyek",
          icon: <Code size={20} className="text-cyberpunk" />,
          description: "Pengerjaan proyek dari awal hingga akhir dengan metode yang efisien dan profesional."
        },
        {
          title: "Revisi & Pengecekan",
          icon: <Layout size={20} className="text-cyberpunk" />,
          description: "Layanan revisi dan pengecekan untuk memastikan kualitas hasil pekerjaan yang optimal."
        }
      ]
    },
    {
      title: "Layanan Digital",
      icon: <FileDigit className="w-8 h-8 text-cyberpunk" />,
      description: "Solusi digital terdepan untuk membantu bisnis berkembang di era modern dengan pendekatan yang inovatif dan berkelanjutan.",
      services: [
        {
          title: "Web Development",
          icon: <Code size={20} className="text-cyberpunk" />,
          description: "Pengembangan website dengan teknologi terkini yang responsif dan user-friendly."
        },
        {
          title: "Digital Marketing",
          icon: <Layout size={20} className="text-cyberpunk" />,
          description: "Strategi pemasaran digital untuk meningkatkan visibilitas dan konversi bisnis Anda."
        },
        {
          title: "UI/UX Design",
          icon: <PenTool size={20} className="text-cyberpunk" />,
          description: "Desain antarmuka pengguna yang intuitif dan pengalaman pengguna yang optimal."
        }
      ]
    },
    {
      title: "Layanan Belajar",
      icon: <BookOpen className="w-8 h-8 text-cyberpunk" />,
      description: "Program pembelajaran interaktif yang dirancang untuk meningkatkan keterampilan dan pengetahuan dengan metode yang efektif dan menyenangkan.",
      services: [
        {
          title: "Tutorial Online",
          icon: <Cpu size={20} className="text-cyberpunk" />,
          description: "Tutorial langkah demi langkah untuk mempelajari berbagai keterampilan dan pengetahuan baru."
        },
        {
          title: "Mentoring Profesional",
          icon: <Database size={20} className="text-cyberpunk" />,
          description: "Program mentoring one-on-one dengan profesional berpengalaman di bidangnya."
        },
        {
          title: "Workshop Interaktif",
          icon: <GraduationCap size={20} className="text-cyberpunk" />,
          description: "Workshop interaktif untuk belajar dengan cara yang lebih hands-on dan kolaboratif."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <ThreeScene />
      <Navbar />
      
      <main className="pt-20">
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Layanan <span className="text-cyberpunk">Kami</span>
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Kami menawarkan berbagai layanan profesional untuk memenuhi kebutuhan digital dan akademik Anda dengan pendekatan yang modern dan efektif.
              </p>
            </div>
            
            {serviceCategories.map((category, index) => (
              <div 
                key={index} 
                id={category.title.toLowerCase().replace(/\s+/g, '-')}
                className={`mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} md:flex items-start gap-10`}
              >
                <div className="md:w-1/3 mb-8 md:mb-0">
                  <div className="bg-dark-secondary p-8 rounded-lg border border-cyberpunk/20 sticky top-24">
                    <div className="p-4 bg-cyberpunk/10 inline-block rounded-lg mb-6">
                      {category.icon}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                    <p className="text-gray-300 mb-8">{category.description}</p>
                    <button className="cyberpunk-button w-full">
                      Konsultasi Sekarang
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="cyberpunk-card hover:translate-y-[-5px] transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-cyberpunk/10 rounded-lg mr-4">
                            {service.icon}
                          </div>
                          <h3 className="text-xl font-semibold">{service.title}</h3>
                        </div>
                        <p className="text-gray-300">{service.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 bg-dark-secondary p-8 rounded-lg border border-cyberpunk/20">
                    <h3 className="text-2xl font-semibold mb-6">Mengapa Memilih {category.title} Kami?</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {[
                        "Tim profesional berpengalaman",
                        "Hasil berkualitas tinggi",
                        "Harga yang kompetitif",
                        "Pengerjaan tepat waktu",
                        "Revisi dan dukungan pasca-layanan",
                        "Metode yang terstruktur dan sistematis"
                      ].map((point, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-cyberpunk mr-2"></div>
                          <p className="text-gray-300">{point}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border border-cyberpunk/30 rounded-lg bg-dark/60">
                      <p className="italic text-gray-300 text-center">
                        "Kami berkomitmen untuk memberikan layanan terbaik yang memenuhi kebutuhan dan melampaui harapan klien kami."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;

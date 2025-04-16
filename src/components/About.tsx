
import { Users2, Target, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="section-padding bg-dark-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">Tentang Kami</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Selamat datang di ROBsPlus, agensi yang didirikan pada tahun 2021 dengan misi untuk memberdayakan mahasiswa, masyarakat, pemerintah, dan profesional melalui layanan jasa tugas, digital, dan pembelajaran yang inovatif.
          </p>
        </div>
        
        <div className="md:flex gap-12 items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <div className="bg-dark/70 backdrop-blur-sm rounded-lg p-6 border border-cyberpunk/20 transition-all duration-300 hover:-translate-y-2 hover:rotate-1">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[1, 2, 3, 4].map((num) => (
                    <div 
                      key={num}
                      className={`aspect-square rounded-lg ${
                        num % 2 === 0 ? 'bg-cyberpunk/20' : 'bg-dark-secondary'
                      } flex items-center justify-center transform transition-all duration-500 hover:scale-105`}
                    >
                      <div className={`w-10 h-10 rounded-full ${
                        num % 3 === 0 ? 'bg-cyberpunk/40' : 'bg-cyberpunk/20'  
                      } animate-pulse-light`}></div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="h-3 bg-cyberpunk/10 rounded w-full"></div>
                  <div className="h-3 bg-cyberpunk/10 rounded w-5/6"></div>
                  <div className="h-3 bg-cyberpunk/10 rounded w-4/6"></div>
                </div>
              </div>
              
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyberpunk/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyberpunk/10 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">ROBsPlus</h3>
            <p className="text-gray-300 mb-6">
              Di ROBsPlus, kami percaya bahwa setiap individu memiliki potensi yang luar biasa. Namun, seringkali, kesibukan dan tuntutan hidup dapat menghalangi mereka untuk mencapai tujuan tersebut. Itulah sebabnya kami hadir dengan solusi yang dirancang khusus untuk membantu Anda mengatasi berbagai tantangan.
            </p>
            <p className="text-gray-300 mb-8">
              Dengan pengalaman dan dedikasi, kami berkomitmen untuk memberikan layanan yang tidak hanya memenuhi harapan, tetapi juga melampauinya. Kami memahami bahwa setiap klien adalah mitra, dan kami berusaha untuk membangun hubungan yang saling menguntungkan.
            </p>
            <Link to="/about" className="cyberpunk-button">
              Lebih Lanjut Tentang Kami
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users2 size={36} className="text-cyberpunk" />,
              title: "Visi Kami",
              description: "Menjadi agensi terkemuka yang memberdayakan individu dan organisasi untuk mencapai potensi maksimal mereka melalui solusi digital dan pembelajaran inovatif."
            },
            {
              icon: <Target size={36} className="text-cyberpunk" />,
              title: "Misi Kami",
              description: "Menyediakan layanan berkualitas tinggi yang membantu klien mengatasi tantangan, mengembangkan keterampilan, dan memanfaatkan teknologi digital."
            },
            {
              icon: <Cpu size={36} className="text-cyberpunk" />,
              title: "Cara Kerja Kami",
              description: "Pendekatan yang personal dan profesional, fokus pada hasil terukur, dan membangun hubungan jangka panjang dengan setiap klien."
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-dark/60 backdrop-blur-sm rounded-lg p-6 border border-cyberpunk/20 transition-all duration-300 hover:-translate-y-2 hover:border-cyberpunk/40 hover:rotate-1"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_center,rgba(155,48,255,0.05),transparent_70%)]"></div>
    </section>
  );
};

export default About;

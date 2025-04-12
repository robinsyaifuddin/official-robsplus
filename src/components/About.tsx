
import { Users2, Target, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="section-padding bg-dark-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">Tentang Kami</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Kami adalah tim profesional berdedikasi yang fokus memberikan solusi digital inovatif untuk membantu bisnis Anda tumbuh dan berkembang.
          </p>
        </div>
        
        <div className="md:flex gap-12 items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <div className="bg-dark rounded-lg p-6 border border-cyberpunk/30">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[1, 2, 3, 4].map((num) => (
                    <div 
                      key={num}
                      className={`aspect-square rounded-lg ${
                        num % 2 === 0 ? 'bg-cyberpunk/20' : 'bg-dark-secondary'
                      } flex items-center justify-center`}
                    >
                      <div className={`w-12 h-12 rounded-full ${
                        num % 3 === 0 ? 'bg-cyberpunk/40' : 'bg-cyberpunk/20'  
                      } animate-pulse`}></div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="h-3 bg-cyberpunk/10 rounded w-full"></div>
                  <div className="h-3 bg-cyberpunk/10 rounded w-5/6"></div>
                  <div className="h-3 bg-cyberpunk/10 rounded w-4/6"></div>
                </div>
              </div>
              
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyberpunk/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyberpunk/30 rounded-full blur-3xl"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Tim Yang Berdedikasi</h3>
            <p className="text-gray-300 mb-6">
              Kami adalah tim yang terdiri dari para ahli di bidangnya masing-masing, mulai dari developer, designer, hingga marketing specialist. Dengan kombinasi keterampilan dan pengalaman yang luas, kami siap membantu Anda mencapai tujuan bisnis Anda.
            </p>
            <p className="text-gray-300 mb-8">
              Kami percaya bahwa keberhasilan klien adalah keberhasilan kami. Itulah mengapa kami berkomitmen untuk memberikan layanan terbaik dengan pendekatan yang personal dan profesional.
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
              description: "Menjadi pemimpin dalam industri digital yang memberikan solusi inovatif dan berkualitas tinggi."
            },
            {
              icon: <Target size={36} className="text-cyberpunk" />,
              title: "Misi Kami",
              description: "Membantu klien mencapai tujuan mereka melalui layanan profesional dan pendekatan yang personal."
            },
            {
              icon: <Cpu size={36} className="text-cyberpunk" />,
              title: "Cara Kerja Kami",
              description: "Proses transparan, komunikasi efektif, dan fokus pada hasil yang terukur dan berkelanjutan."
            }
          ].map((item, index) => (
            <div key={index} className="cyberpunk-card">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_center,rgba(155,48,255,0.1),transparent_70%)]"></div>
    </section>
  );
};

export default About;

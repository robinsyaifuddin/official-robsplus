
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene";
import { Users2, Target, Cpu, Clock, CheckCircle, TrendingUp } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "bg-gradient-to-br from-indigo-500 to-purple-700",
    },
    {
      name: "Sarah Williams",
      role: "Creative Director",
      image: "bg-gradient-to-br from-pink-500 to-red-600",
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "bg-gradient-to-br from-blue-500 to-cyan-700",
    },
    {
      name: "Jessica Lee",
      role: "Marketing Specialist",
      image: "bg-gradient-to-br from-green-500 to-emerald-700",
    },
  ];

  const values = [
    {
      icon: <CheckCircle size={40} className="text-cyberpunk" />,
      title: "Excellence",
      description: "Kami selalu berusaha untuk memberikan hasil terbaik dalam setiap proyek yang kami kerjakan."
    },
    {
      icon: <TrendingUp size={40} className="text-cyberpunk" />,
      title: "Innovation",
      description: "Kami terus berinovasi dan mengikuti perkembangan teknologi terkini untuk memberikan solusi yang relevan."
    },
    {
      icon: <Users2 size={40} className="text-cyberpunk" />,
      title: "Collaboration",
      description: "Kami percaya bahwa kolaborasi yang baik akan menghasilkan karya yang luar biasa."
    },
    {
      icon: <Clock size={40} className="text-cyberpunk" />,
      title: "Punctuality",
      description: "Kami menghargai waktu klien kami dan selalu berusaha untuk menyelesaikan proyek tepat waktu."
    },
  ];

  const workProcess = [
    {
      number: "01",
      title: "Discovery",
      description: "Kami mulai dengan memahami kebutuhan dan tujuan bisnis Anda untuk merancang solusi yang tepat."
    },
    {
      number: "02",
      title: "Planning",
      description: "Kami merencanakan strategi dan pendekatan yang akan digunakan untuk mencapai tujuan proyek."
    },
    {
      number: "03",
      title: "Execution",
      description: "Kami mengeksekusi rencana dengan presisi dan perhatian terhadap detail untuk hasil yang optimal."
    },
    {
      number: "04",
      title: "Delivery",
      description: "Kami mengirimkan hasil proyek yang sesuai dengan harapan dan memberikan dukungan berkelanjutan."
    },
  ];

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <ThreeScene />
      <Navbar />
      
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tentang <span className="text-cyberpunk">Kami</span>
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Mengenal lebih dekat tentang siapa kami, visi dan misi kami, serta bagaimana kami bekerja untuk membantu klien mencapai tujuan mereka.
              </p>
            </div>
            
            <div className="md:flex items-center gap-12 mb-20">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
                <p className="text-gray-300 mb-4">
                  CyberAgency didirikan pada tahun 2020 dengan visi untuk menjadi pemimpin dalam industri digital yang memberikan solusi inovatif dan berkualitas tinggi. Kami mulai dengan tim kecil yang berdedikasi dan sekarang telah berkembang menjadi tim yang terdiri dari berbagai ahli di bidangnya.
                </p>
                <p className="text-gray-300 mb-4">
                  Sejak awal, kami berkomitmen untuk memberikan layanan terbaik dengan pendekatan yang personal dan profesional. Kami percaya bahwa keberhasilan klien adalah keberhasilan kami dan itulah mengapa kami selalu berusaha untuk melampaui harapan dalam setiap proyek yang kami kerjakan.
                </p>
                <p className="text-gray-300">
                  Saat ini, kami telah berhasil menyelesaikan ratusan proyek untuk klien dari berbagai industri dan ukuran bisnis. Pengalaman ini telah memperkuat kemampuan dan pengetahuan kami dalam memberikan solusi yang tepat untuk setiap tantangan digital.
                </p>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">4+</h3>
                      <p className="text-gray-300">Tahun Pengalaman</p>
                    </div>
                  </div>
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">200+</h3>
                      <p className="text-gray-300">Proyek Selesai</p>
                    </div>
                  </div>
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">50+</h3>
                      <p className="text-gray-300">Klien Puas</p>
                    </div>
                  </div>
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">15+</h3>
                      <p className="text-gray-300">Profesional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Visi & Misi Kami</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Kami didorong oleh visi dan misi yang jelas untuk memberikan yang terbaik dalam setiap layanan kami.
                </p>
              </div>
              
              <div className="md:flex gap-8">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <div className="cyberpunk-card h-full flex flex-col">
                    <div className="mb-6">
                      <Users2 size={40} className="text-cyberpunk" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Visi</h3>
                    <p className="text-gray-300 mb-4 flex-grow">
                      Menjadi pemimpin dalam industri digital yang memberikan solusi inovatif dan berkualitas tinggi, serta menjadi mitra tepercaya bagi klien dalam menghadapi tantangan era digital.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Inovasi berkelanjutan</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Keunggulan dalam layanan</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Kepercayaan klien</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="cyberpunk-card h-full flex flex-col">
                    <div className="mb-6">
                      <Target size={40} className="text-cyberpunk" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Misi</h3>
                    <p className="text-gray-300 mb-4 flex-grow">
                      Membantu klien mencapai tujuan mereka melalui layanan profesional dan pendekatan yang personal, dengan fokus pada hasil yang terukur dan berkelanjutan untuk kesuksesan jangka panjang.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Memberikan solusi terbaik</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Mengutamakan kepuasan klien</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Mengembangkan teknologi berkelanjutan</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Kenali profesional berbakat di balik keberhasilan setiap proyek kami.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="cyberpunk-card group">
                    <div className={`${member.image} h-64 rounded-lg mb-6 relative overflow-hidden group-hover:scale-105 transition-all duration-500`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-cyberpunk mb-4">{member.role}</p>
                    <div className="flex gap-3">
                      {['facebook', 'twitter', 'linkedin'].map((social) => (
                        <a 
                          key={social}
                          href={`#${social}`}
                          className="w-8 h-8 rounded-full bg-dark flex items-center justify-center hover:bg-cyberpunk transition-all duration-300"
                        >
                          <div className="w-4 h-4 bg-white/50 rounded-sm"></div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Nilai-Nilai Kami</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Nilai-nilai yang menjadi landasan dalam setiap aspek pekerjaan kami.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="cyberpunk-card">
                    <div className="mb-6">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Proses Kerja Kami</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Pendekatan sistematis kami untuk memastikan keberhasilan setiap proyek.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-cyberpunk/30 hidden md:block"></div>
                
                {workProcess.map((step, index) => (
                  <div 
                    key={index} 
                    className={`relative md:flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyberpunk rounded-full z-10 hidden md:block"></div>
                    
                    <div className="md:w-1/2 mb-6 md:mb-0">
                      <div className="cyberpunk-card">
                        <span className="text-5xl font-bold text-cyberpunk/30 mb-6 block">{step.number}</span>
                        <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

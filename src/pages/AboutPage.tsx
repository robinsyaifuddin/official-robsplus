import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene";
import { 
  Users2, 
  Target, 
  Cpu, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Github, 
  Linkedin, 
  Instagram,
  Mail
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutPage = () => {
  const ceoProfile = {
    name: "Robin Syaifuddin",
    role: "CEO & Founder",
    image: "/lovable-uploads/5f8808a6-725b-4a91-b863-f201bc713ceb.png",
    description: "Seorang penggiat digital dan pengembangan diri yang berdedikasi untuk memberdayakan individu dan organisasi melalui solusi digital inovatif.",
    socials: [
      { icon: <Github size={18} />, url: "#github" },
      { icon: <Linkedin size={18} />, url: "#linkedin" },
      { icon: <Instagram size={18} />, url: "#instagram" },
      { icon: <Mail size={18} />, url: "#email" }
    ]
  };

  const values = [
    {
      icon: <CheckCircle size={40} className="text-cyberpunk" />,
      title: "Kualitas",
      description: "Kami berkomitmen untuk memberikan layanan berkualitas tinggi yang memenuhi bahkan melampaui harapan klien."
    },
    {
      icon: <TrendingUp size={40} className="text-cyberpunk" />,
      title: "Inovasi",
      description: "Kami terus berinovasi untuk menghadirkan solusi terbaik dan terkini dalam semua layanan yang kami tawarkan."
    },
    {
      icon: <Users2 size={40} className="text-cyberpunk" />,
      title: "Kolaborasi",
      description: "Kami percaya bahwa kolaborasi yang baik dengan klien akan menghasilkan hasil yang luar biasa."
    },
    {
      icon: <Clock size={40} className="text-cyberpunk" />,
      title: "Ketepatan Waktu",
      description: "Kami menghargai waktu klien dan berkomitmen untuk menyelesaikan proyek tepat waktu."
    },
  ];

  const workProcess = [
    {
      number: "01",
      title: "Konsultasi",
      description: "Kami memulai dengan memahami kebutuhan dan tujuan Anda untuk merancang solusi yang tepat."
    },
    {
      number: "02",
      title: "Perencanaan",
      description: "Kami merencanakan strategi dan pendekatan yang akan digunakan untuk mencapai tujuan proyek."
    },
    {
      number: "03",
      title: "Eksekusi",
      description: "Kami mengeksekusi rencana dengan presisi dan perhatian terhadap detail untuk hasil yang optimal."
    },
    {
      number: "04",
      title: "Evaluasi",
      description: "Kami melakukan evaluasi dan memberikan dukungan berkelanjutan untuk memastikan kepuasan klien."
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
                Tentang <span className="text-cyberpunk">ROBsPlus</span>
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Selamat datang di ROBsPlus, agensi yang didirikan pada tahun 2021 dengan misi untuk memberdayakan mahasiswa, masyarakat, pemerintah, dan profesional melalui layanan jasa tugas, digital, dan pembelajaran yang inovatif.
              </p>
            </div>
            
            <div className="md:flex items-center gap-12 mb-20">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Card className="bg-dark-secondary border-cyberpunk/20 shadow-lg shadow-cyberpunk/5">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-cyberpunk">Cerita Kami</CardTitle>
                    <CardDescription className="text-gray-300">Perjalanan ROBsPlus sejak 2021</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      ROBsPlus didirikan pada tahun 2021 dengan visi untuk memberdayakan individu dan organisasi melalui layanan jasa tugas, digital, dan pembelajaran yang inovatif. Dipimpin oleh CEO dan Founder kami, Robin Syaifuddin, seorang penggiat digital dan pengembangan diri, ROBsPlus hadir untuk menjawab tantangan yang dihadapi oleh berbagai kalangan di era modern ini.
                    </p>
                    <p className="text-gray-300">
                      Di ROBsPlus, kami percaya bahwa setiap individu memiliki potensi yang luar biasa. Namun, seringkali, kesibukan dan tuntutan hidup dapat menghalangi mereka untuk mencapai tujuan tersebut. Itulah sebabnya kami hadir dengan solusi yang dirancang khusus untuk membantu Anda mengatasi berbagai tantangan, baik dalam dunia akademis, profesional, maupun pengembangan diri.
                    </p>
                    <p className="text-gray-300">
                      Dengan pengalaman dan dedikasi, kami berkomitmen untuk memberikan layanan yang tidak hanya memenuhi harapan, tetapi juga melampauinya. Kami memahami bahwa setiap klien adalah mitra, dan kami berusaha untuk membangun hubungan yang saling menguntungkan. Dengan pendekatan yang personal dan profesional, kami siap mendukung Anda dalam setiap langkah perjalanan Anda.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:rotate-3">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">3+</h3>
                      <p className="text-gray-300">Tahun Pengalaman</p>
                    </div>
                  </div>
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:-rotate-3">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">100+</h3>
                      <p className="text-gray-300">Proyek Selesai</p>
                    </div>
                  </div>
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:-rotate-3">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">50+</h3>
                      <p className="text-gray-300">Klien Puas</p>
                    </div>
                  </div>
                  <div className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 aspect-square flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:rotate-3">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-cyberpunk mb-2">5+</h3>
                      <p className="text-gray-300">Layanan Profesional</p>
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
                  <div className="cyberpunk-card h-full flex flex-col transform transition-all duration-300 hover:scale-105 hover:rotate-1">
                    <div className="mb-6">
                      <Users2 size={40} className="text-cyberpunk" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Visi</h3>
                    <p className="text-gray-300 mb-4 flex-grow">
                      Menjadi agensi terkemuka yang memberdayakan individu dan organisasi untuk mencapai potensi maksimal mereka melalui solusi digital dan pembelajaran inovatif.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Pemberdayaan melalui teknologi</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Inovasi berkelanjutan</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Kualitas tanpa kompromi</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="cyberpunk-card h-full flex flex-col transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
                    <div className="mb-6">
                      <Target size={40} className="text-cyberpunk" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Misi</h3>
                    <p className="text-gray-300 mb-4 flex-grow">
                      Menyediakan layanan berkualitas tinggi yang membantu klien mengatasi tantangan, mengembangkan keterampilan, dan memanfaatkan teknologi digital untuk mencapai kesuksesan.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Memberikan solusi terukur</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Membangun hubungan berkelanjutan</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                        <span className="text-gray-300">Mengembangkan potensi digital</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">CEO & Founder</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Dipimpin oleh visioner dengan dedikasi tinggi dalam bidang digital dan pengembangan diri.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto px-4">
                <Card className="bg-dark-secondary/80 backdrop-blur-lg border-cyberpunk/20 overflow-hidden shadow-xl shadow-cyberpunk/5 hover:shadow-cyberpunk/10 transition-all duration-500">
                  <div className="md:flex items-center gap-8 p-8">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyberpunk to-cyberpunk-light rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative overflow-hidden rounded-lg transform perspective-1000 group-hover:rotate-y-12 transition-all duration-500">
                          <img 
                            src={ceoProfile.image} 
                            alt={ceoProfile.name}
                            className="w-full h-auto rounded-lg transform transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-cyberpunk/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyberpunk/20 to-transparent blur-xl opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white">{ceoProfile.name}</h3>
                        <p className="text-cyberpunk text-lg font-semibold">{ceoProfile.role}</p>
                        <p className="text-gray-300">{ceoProfile.description}</p>
                        <div className="flex gap-4 pt-4">
                          {ceoProfile.socials.map((social, index) => (
                            <a 
                              key={index}
                              href={social.url}
                              className="w-10 h-10 rounded-full bg-dark-secondary flex items-center justify-center hover:bg-cyberpunk hover:scale-110 transition-all duration-300"
                            >
                              {social.icon}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Nilai-Nilai Kami</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Nilai-nilai yang menjadi landasan dalam setiap aspek pekerjaan kami.
                </p>
              </div>
              
              <Carousel
                opts={{ loop: true }}
                className="max-w-5xl mx-auto"
              >
                <CarouselContent>
                  {values.map((value, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
                      <div className="p-2">
                        <Card className="bg-dark-secondary border-cyberpunk/20 shadow-lg shadow-cyberpunk/5 transform transition-all duration-300 hover:scale-105 hover:rotate-1">
                          <CardHeader>
                            <div className="mb-2">{value.icon}</div>
                            <CardTitle>{value.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300">{value.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
                  <CarouselNext className="relative static translate-y-0 right-0" />
                </div>
              </Carousel>
            </div>
            
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Proses Kerja Kami</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Pendekatan sistematis kami untuk memastikan keberhasilan setiap proyek.
                </p>
              </div>
              
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-cyberpunk/30 hidden md:block"></div>
                
                {workProcess.map((step, index) => (
                  <div 
                    key={index} 
                    className={`relative md:flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyberpunk rounded-full z-10 hidden md:block"></div>
                    
                    <div className="md:w-1/2 mb-6 md:mb-0">
                      <div className="cyberpunk-card transform transition-all duration-300 hover:scale-105 hover:rotate-1">
                        <span className="text-5xl font-bold text-cyberpunk/30 mb-6 block">{step.number}</span>
                        <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Bergabunglah dengan kami di ROBsPlus dan rasakan perbedaan dalam cara Anda menyelesaikan tugas, mengembangkan keterampilan, dan memanfaatkan potensi digital Anda. Bersama-sama, kita akan menciptakan masa depan yang lebih cerah dan penuh peluang!
                </p>
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

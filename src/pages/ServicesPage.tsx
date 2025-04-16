
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene";
import { Book, FileText, PenTool, Presentation, FileCheck, HelpCircle, Globe, Image, Video, Users, XCircle, GraduationCap, Layout, Database, ArrowRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const ServicesPage = () => {
  const services = [
    {
      id: "jasa-tugas",
      title: "Jasa Tugas",
      icon: <Book className="w-8 h-8 text-cyberpunk" />,
      description: "Solusi komprehensif untuk berbagai kebutuhan tugas akademik dengan pendekatan profesional dan hasil berkualitas tinggi.",
      packages: [
        {
          name: "Paket Dasar",
          price: "Rp 5.000 - Rp 50.000",
          features: [
            "Esai pendek dan laporan sederhana",
            "Tata bahasa yang baik dan struktur rapi",
            "Parafrasa dasar untuk menurunkan plagiasi",
            "Perapihan format tugas",
            "1x revisi"
          ]
        },
        {
          name: "Paket Menengah",
          price: "Rp 50.000 - Rp 100.000",
          features: [
            "Makalah dan proposal kompleks",
            "Penelitian mendalam dan analisis data",
            "Penurunan plagiasi tingkat lanjut",
            "PPT presentasi profesional",
            "2x revisi"
          ]
        },
        {
          name: "Paket Lanjutan",
          price: "Rp 100.000 - Rp 150.000+",
          features: [
            "KTI dan jurnal penelitian",
            "Penelitian ekstensif dengan analisis statistik",
            "Standar akademik tinggi",
            "Konsultasi intensif",
            "Revisi tidak terbatas"
          ]
        }
      ],
      services: [
        {
          icon: <FileText size={20} />,
          name: "Karya Tulis Ilmiah (KTI)",
          description: "Penulisan KTI dengan standar akademik tinggi dan metodologi penelitian yang tepat."
        },
        {
          icon: <Book size={20} />,
          name: "Makalah & Esai",
          description: "Penulisan makalah dan esai dengan struktur yang baik dan argumentasi yang kuat."
        },
        {
          icon: <FileCheck size={20} />,
          name: "Laporan & Proposal",
          description: "Penyusunan laporan dan proposal yang profesional dan terstruktur."
        },
        {
          icon: <Presentation size={20} />,
          name: "Presentasi PowerPoint",
          description: "Pembuatan slide presentasi yang menarik dan informatif."
        },
        {
          icon: <PenTool size={20} />,
          name: "Parafrasa/Penurunan Plagiasi",
          description: "Teknik penurunan plagiasi dengan tetap mempertahankan makna asli."
        },
        {
          icon: <HelpCircle size={20} />,
          name: "Konsultasi Tugas",
          description: "Bimbingan dan konsultasi untuk pengerjaan tugas akademik."
        }
      ]
    },
    {
      id: "jasa-digital",
      title: "Jasa Digital",
      icon: <Globe className="w-8 h-8 text-cyberpunk" />,
      description: "Solusi digital terdepan untuk membantu bisnis Anda berkembang di era modern dengan pendekatan yang inovatif.",
      packages: [
        {
          name: "Paket Pemula",
          price: "Rp 50.000 - Rp 100.000",
          features: [
            "Website statis dengan template dasar",
            "Logo atau poster sederhana",
            "Editing video pendek",
            "Peningkatan followers terbatas",
            "1x revisi"
          ]
        },
        {
          name: "Paket Profesional",
          price: "Rp 100.000 - Rp 350.000",
          features: [
            "Website dinamis dengan fitur custom",
            "Desain logo/poster kompleks",
            "Video dengan efek khusus",
            "Peningkatan engagement signifikan",
            "3x revisi"
          ]
        },
        {
          name: "Paket Premium",
          price: "Rp 350.000 - Rp 650.000",
          features: [
            "Website E-commerce lengkap",
            "Branding sosial media komprehensif",
            "Film/iklan komersil profesional",
            "Penanganan akun bermasalah",
            "Revisi tidak terbatas"
          ]
        }
      ],
      services: [
        {
          icon: <Globe size={20} />,
          name: "Pembuatan Website",
          description: "Pembuatan website profesional dengan desain responsif dan fitur modern."
        },
        {
          icon: <Image size={20} />,
          name: "Desain Logo/Poster",
          description: "Desain grafis profesional untuk kebutuhan branding bisnis Anda."
        },
        {
          icon: <Video size={20} />,
          name: "Editing Video/Film",
          description: "Editing video profesional untuk konten promosi atau dokumentasi."
        },
        {
          icon: <Users size={20} />,
          name: "Peningkatan Media Sosial",
          description: "Strategi peningkatan engagement dan followers media sosial."
        },
        {
          icon: <XCircle size={20} />,
          name: "Pelaporan Akun",
          description: "Bantuan penanganan dan pelaporan akun media sosial bermasalah."
        }
      ]
    },
    {
      id: "jasa-pembelajaran",
      title: "Jasa Pembelajaran",
      icon: <GraduationCap className="w-8 h-8 text-cyberpunk" />,
      description: "Program pembelajaran interaktif untuk meningkatkan keterampilan digital Anda dengan metode yang efektif.",
      packages: [
        {
          name: "Sesi Individual",
          price: "Rp 75.000 - Rp 150.000",
          features: [
            "Pembelajaran one-on-one",
            "Fokus pada topik spesifik",
            "Sesi tanya jawab",
            "Latihan praktis",
            "Materi dasar"
          ]
        },
        {
          name: "Paket Dasar",
          price: "Rp 150.000 - Rp 250.000",
          features: [
            "Kursus singkat terstruktur",
            "Materi pembelajaran lengkap",
            "Akses online/offline",
            "Latihan project",
            "Level menengah"
          ]
        },
        {
          name: "Paket Lanjutan",
          price: "Rp 250.000 - Rp 400.000+",
          features: [
            "Kursus intensif mendalam",
            "Mentoring berkelanjutan",
            "Project praktik kompleks",
            "Sertifikat keahlian",
            "Level advanced"
          ]
        }
      ],
      services: [
        {
          icon: <Globe size={20} />,
          name: "Pembuatan Website",
          description: "Pembelajaran pembuatan website dari dasar hingga advanced."
        },
        {
          icon: <Layout size={20} />,
          name: "Desain Grafis",
          description: "Kursus desain grafis untuk kebutuhan profesional."
        },
        {
          icon: <Database size={20} />,
          name: "Digital Marketing",
          description: "Pembelajaran strategi pemasaran digital yang efektif."
        },
        {
          icon: <Users size={20} />,
          name: "Instagram Branding",
          description: "Teknik branding dan marketing melalui Instagram."
        },
        {
          icon: <FileText size={20} />,
          name: "Microsoft Office",
          description: "Pelatihan Microsoft Office untuk produktivitas kerja."
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

            <Tabs defaultValue="jasa-tugas" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
                {services.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="data-[state=active]:bg-cyberpunk data-[state=active]:text-white"
                  >
                    <div className="flex items-center gap-2">
                      {service.icon}
                      <span>{service.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {services.map((service) => (
                <TabsContent key={service.id} value={service.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {service.packages.map((pkg, index) => (
                      <div 
                        key={index}
                        className="bg-dark-secondary p-6 rounded-lg border border-cyberpunk/20 hover:border-cyberpunk/50 transition-all duration-300"
                      >
                        <h3 className="text-xl font-semibold text-cyberpunk mb-2">{pkg.name}</h3>
                        <p className="text-lg font-medium mb-4">{pkg.price}</p>
                        <ul className="space-y-3 mb-6">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                              <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mt-2"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button className="w-full cyberpunk-button">
                          Pilih Paket
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <h3 className="text-2xl font-semibold mb-8">Layanan yang Tersedia</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {service.services.map((item, index) => (
                        <div 
                          key={index}
                          className="p-6 bg-dark/60 backdrop-blur-sm border border-cyberpunk/20 rounded-lg hover:border-cyberpunk/50 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-cyberpunk/10 rounded-lg">
                              {item.icon}
                            </div>
                            <h4 className="font-medium">{item.name}</h4>
                          </div>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 p-8 bg-dark-secondary rounded-lg border border-cyberpunk/20">
                    <h3 className="text-2xl font-semibold mb-6">Mengapa Memilih {service.title} Kami?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Tim profesional berpengalaman",
                        "Hasil berkualitas tinggi",
                        "Harga yang kompetitif",
                        "Pengerjaan tepat waktu",
                        "Revisi sesuai paket",
                        "Garansi kepuasan"
                      ].map((point, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-cyberpunk"></div>
                          <p className="text-gray-300">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;

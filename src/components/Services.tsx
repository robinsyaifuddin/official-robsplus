import { Book, FileText, PenTool, Presentation, FileCheck, HelpCircle, Globe, Image, Video, Users, XCircle, GraduationCap, Layout, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Jasa Tugas",
    icon: <Book className="text-cyberpunk w-8 h-8" />,
    description: "Solusi lengkap untuk kebutuhan tugas akademik Anda dengan pendekatan profesional dan hasil berkualitas tinggi.",
    packages: [
      {
        name: "Paket Dasar",
        price: "Rp 5.000 - Rp 50.000",
        features: ["Tugas ringan & esai pendek", "Tata bahasa baik", "Parafrasa dasar"]
      },
      {
        name: "Paket Menengah",
        price: "Rp 50.000 - Rp 100.000",
        features: ["Makalah & proposal", "Penelitian mendalam", "Penurunan plagiasi"]
      },
      {
        name: "Paket Lanjutan",
        price: "Rp 100.000 - Rp 150.000+",
        features: ["KTI & jurnal", "Penelitian ekstensif", "Konsultasi intensif"]
      }
    ],
    types: [
      { icon: <FileText size={18} />, name: "Karya Tulis Ilmiah" },
      { icon: <Book size={18} />, name: "Makalah & Esai" },
      { icon: <FileCheck size={18} />, name: "Laporan & Proposal" },
      { icon: <Presentation size={18} />, name: "Presentasi PowerPoint" },
      { icon: <PenTool size={18} />, name: "Parafrasa/Penurunan Plagiasi" },
      { icon: <HelpCircle size={18} />, name: "Konsultasi Tugas" }
    ]
  },
  {
    title: "Jasa Digital",
    icon: <Globe className="text-cyberpunk w-8 h-8" />,
    description: "Transformasi digital dengan solusi terdepan untuk mengembangkan presence online dan bisnis Anda.",
    packages: [
      {
        name: "Paket Pemula",
        price: "Rp 50.000 - Rp 100.000",
        features: ["Website statis", "Logo sederhana", "Video pendek"]
      },
      {
        name: "Paket Profesional",
        price: "Rp 100.000 - Rp 350.000",
        features: ["Website dinamis", "Desain kompleks", "Sosial media"]
      },
      {
        name: "Paket Premium",
        price: "Rp 350.000 - Rp 650.000",
        features: ["E-commerce", "Branding lengkap", "Film komersil"]
      }
    ],
    types: [
      { icon: <Globe size={18} />, name: "Pembuatan Website" },
      { icon: <Image size={18} />, name: "Desain Logo/Poster" },
      { icon: <Video size={18} />, name: "Editing Video/Film" },
      { icon: <Users size={18} />, name: "Peningkatan Media Sosial" },
      { icon: <XCircle size={18} />, name: "Pelaporan Akun" }
    ]
  },
  {
    title: "Jasa Pembelajaran",
    icon: <GraduationCap className="text-cyberpunk w-8 h-8" />,
    description: "Program pembelajaran interaktif yang dirancang untuk meningkatkan keterampilan digital Anda.",
    packages: [
      {
        name: "Sesi Individual",
        price: "Rp 75.000 - Rp 150.000",
        features: ["Pembelajaran privat", "Sesi tanya jawab", "Materi dasar"]
      },
      {
        name: "Paket Dasar",
        price: "Rp 150.000 - Rp 250.000",
        features: ["Kursus singkat", "Materi online/offline", "Level menengah"]
      },
      {
        name: "Paket Lanjutan",
        price: "Rp 250.000 - Rp 400.000+",
        features: ["Kursus intensif", "Mentoring", "Level advanced"]
      }
    ],
    types: [
      { icon: <Globe size={18} />, name: "Pembuatan Website" },
      { icon: <Layout size={18} />, name: "Desain Grafis" },
      { icon: <Database size={18} />, name: "Digital Marketing" },
      { icon: <Users size={18} />, name: "Instagram Branding" },
      { icon: <FileText size={18} />, name: "Microsoft Office" }
    ]
  }
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-dark-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">Layanan Kami</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Kami menawarkan berbagai layanan profesional untuk memenuhi kebutuhan digital dan akademik Anda dengan pendekatan yang modern dan efektif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-dark/60 backdrop-blur-sm border border-cyberpunk/20 rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyberpunk/50 group"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-cyberpunk/10 rounded-lg">
                  {service.icon}
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-cyberpunk/20 text-cyberpunk">
                  {index + 1}/3
                </span>
              </div>
              
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              
              <div className="space-y-4 mb-6">
                {service.packages.map((pkg, idx) => (
                  <div key={idx} className="p-4 bg-dark/40 rounded-lg border border-cyberpunk/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-cyberpunk">{pkg.name}</span>
                      <span className="text-sm text-gray-300">{pkg.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {service.types.map((type, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-300">
                    {type.icon}
                    <span className="ml-2">{type.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-800 mt-auto">
                <Link 
                  to={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-cyberpunk transition-all group-hover:translate-x-1 duration-300"
                >
                  Selengkapnya <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/services" className="cyberpunk-button inline-flex items-center">
            Lihat Semua Layanan <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;

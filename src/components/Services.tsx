
import { Monitor, BookOpen, FileDigit, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Layanan Tugas",
    icon: <Monitor className="text-cyberpunk w-8 h-8" />,
    description: "Solusi lengkap untuk kebutuhan tugas Anda dengan pendekatan profesional dan hasil berkualitas tinggi.",
    features: ["Konsultasi", "Pengerjaan", "Revisi"],
  },
  {
    title: "Layanan Digital",
    icon: <FileDigit className="text-cyberpunk w-8 h-8" />,
    description: "Transformasi digital dengan solusi terdepan yang membantu bisnis Anda berkembang di era modern.",
    features: ["Web Development", "Digital Marketing", "UI/UX Design"],
  },
  {
    title: "Layanan Belajar",
    icon: <BookOpen className="text-cyberpunk w-8 h-8" />,
    description: "Program pembelajaran interaktif yang dirancang untuk meningkatkan keterampilan dan pengetahuan Anda.",
    features: ["Tutorial", "Mentoring", "Workshop"],
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
              className="cyberpunk-card hover:translate-y-[-5px] transition-all duration-300 group"
            >
              <div className="p-4 bg-cyberpunk/10 inline-block rounded-lg mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6 line-clamp-3">{service.description}</p>
              
              <ul className="mb-6 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 bg-cyberpunk rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                to={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center text-cyberpunk hover:underline transition-all group-hover:translate-x-1 duration-300"
              >
                Selengkapnya <ArrowRight size={16} className="ml-1" />
              </Link>
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

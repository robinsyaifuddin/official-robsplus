
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">Hubungi Kami</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Tertarik dengan layanan kami? Jangan ragu untuk menghubungi kami untuk konsultasi atau informasi lebih lanjut tentang cara kami dapat membantu Anda.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail size={24} className="text-cyberpunk" />,
                    title: "Email Kami",
                    detail: "info@cyberagency.com",
                    link: "mailto:info@cyberagency.com"
                  },
                  {
                    icon: <Phone size={24} className="text-cyberpunk" />,
                    title: "Hubungi Kami",
                    detail: "+62 123 4567 890",
                    link: "tel:+6212345678890"
                  },
                  {
                    icon: <MapPin size={24} className="text-cyberpunk" />,
                    title: "Lokasi Kami",
                    detail: "Jl. Cyber No. 123, Jakarta, Indonesia",
                    link: "#"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 bg-dark-secondary rounded-lg">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <a href={item.link} className="text-gray-300 hover:text-cyberpunk">
                        {item.detail}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Kami</h3>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social}
                    href={`https://${social}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-secondary flex items-center justify-center hover:bg-cyberpunk transition-all duration-300"
                  >
                    <div className="w-5 h-5 bg-cyberpunk/50 rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="cyberpunk-card">
              <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="text-sm text-gray-300 mb-1 block">Nama Lengkap</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:border-cyberpunk focus:outline-none text-white"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-gray-300 mb-1 block">Email</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:border-cyberpunk focus:outline-none text-white"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="text-sm text-gray-300 mb-1 block">Subjek</label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:border-cyberpunk focus:outline-none text-white"
                  placeholder="Subjek pesan"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="text-sm text-gray-300 mb-1 block">Pesan</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:border-cyberpunk focus:outline-none text-white"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="cyberpunk-button w-full flex items-center justify-center gap-2"
              >
                <Send size={18} /> Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

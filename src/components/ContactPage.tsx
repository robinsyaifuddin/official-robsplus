
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setSubmitting(false);
    }, 1000);
  };

  const faqs = [
    {
      question: "Bagaimana cara memulai kerjasama dengan CyberAgency?",
      answer: "Untuk memulai kerjasama, Anda dapat menghubungi kami melalui formulir kontak atau langsung via email/telepon. Tim kami akan merespon dalam 24 jam untuk mendiskusikan kebutuhan Anda."
    },
    {
      question: "Berapa estimasi waktu untuk pengerjaan sebuah proyek?",
      answer: "Estimasi waktu bervariasi tergantung pada kompleksitas dan skala proyek. Untuk website sederhana mungkin membutuhkan 2-3 minggu, sementara proyek yang lebih kompleks bisa memakan waktu 1-3 bulan."
    },
    {
      question: "Apakah CyberAgency menyediakan layanan pemeliharaan setelah proyek selesai?",
      answer: "Ya, kami menyediakan layanan pemeliharaan dan dukungan teknis berkelanjutan untuk memastikan proyek Anda tetap berjalan optimal setelah peluncuran."
    },
    {
      question: "Bagaimana sistem pembayaran di CyberAgency?",
      answer: "Kami menerapkan sistem pembayaran bertahap: 50% di awal sebagai deposit dan 50% setelah proyek selesai. Untuk proyek berskala besar, pembayaran dapat dibagi menjadi beberapa milestone."
    }
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
                Hubungi <span className="text-cyberpunk">Kami</span>
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Tertarik dengan layanan kami? Jangan ragu untuk menghubungi kami untuk konsultasi atau informasi lebih lanjut tentang cara kami dapat membantu Anda.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Mail size={32} className="text-cyberpunk" />,
                  title: "Email Kami",
                  detail: "info@cyberagency.com",
                  description: "Kami akan merespon dalam 24 jam",
                  link: "mailto:info@cyberagency.com"
                },
                {
                  icon: <Phone size={32} className="text-cyberpunk" />,
                  title: "Hubungi Kami",
                  detail: "+62 123 4567 890",
                  description: "Senin - Jumat, 9:00 - 17:00",
                  link: "tel:+6212345678890"
                },
                {
                  icon: <MapPin size={32} className="text-cyberpunk" />,
                  title: "Lokasi Kami",
                  detail: "Jl. Cyber No. 123, Jakarta",
                  description: "Indonesia, 12345",
                  link: "https://maps.google.com"
                }
              ].map((item, index) => (
                <div key={index} className="cyberpunk-card text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyberpunk/10 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <a 
                    href={item.link} 
                    className="text-cyberpunk hover:underline block mb-2"
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.detail}
                  </a>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-3xl font-bold mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="cyberpunk-card">
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="text-sm text-gray-300 mb-1 block">Nomor Telepon</label>
                      <input 
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:border-cyberpunk focus:outline-none text-white"
                        placeholder="+62 xxx xxxx xxxx"
                      />
                    </div>
                    <div>
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
                    className={`cyberpunk-button w-full flex items-center justify-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send size={18} /> Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Informasi Tambahan</h2>
                
                <div className="cyberpunk-card mb-8">
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <MessageSquare size={20} className="text-cyberpunk" /> 
                    Pertanyaan Umum
                  </h3>
                  
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium mb-2">{faq.question}</h4>
                        <p className="text-gray-300 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="cyberpunk-card mb-8">
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <Clock size={20} className="text-cyberpunk" /> 
                    Jam Operasional
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Senin - Jumat:</span>
                      <span className="font-medium">09:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sabtu:</span>
                      <span className="font-medium">09:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Minggu:</span>
                      <span className="font-medium">Tutup</span>
                    </div>
                  </div>
                </div>
                
                <div className="cyberpunk-card">
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <CheckCircle size={20} className="text-cyberpunk" /> 
                    Mengapa Memilih Kami
                  </h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mt-2 mr-2"></div>
                      <p className="text-gray-300">Tim profesional dengan pengalaman lebih dari 4 tahun</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mt-2 mr-2"></div>
                      <p className="text-gray-300">Pendekatan personal untuk setiap klien</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mt-2 mr-2"></div>
                      <p className="text-gray-300">Solusi yang disesuaikan dengan kebutuhan Anda</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mt-2 mr-2"></div>
                      <p className="text-gray-300">Dukungan teknis berkelanjutan</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-cyberpunk rounded-full mt-2 mr-2"></div>
                      <p className="text-gray-300">Harga yang kompetitif dengan kualitas terbaik</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden h-96 relative">
              <div className="absolute inset-0 bg-dark-secondary/60 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Lokasi Kami</h3>
                  <p className="text-gray-300 mb-6">Jl. Cyber No. 123, Jakarta, Indonesia, 12345</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cyberpunk-button"
                  >
                    Lihat di Google Maps
                  </a>
                </div>
              </div>
              <div className="w-full h-full bg-gradient-to-br from-dark to-dark-secondary">
                <div className="w-full h-full grid grid-cols-[repeat(20,5vw)] grid-rows-[repeat(10,5vh)] opacity-30">
                  {Array.from({ length: 200 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`border-[0.5px] border-cyberpunk/10 ${Math.random() > 0.97 ? 'bg-cyberpunk/20 animate-pulse-light' : ''}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;

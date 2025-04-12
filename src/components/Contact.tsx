
import { MessageCircle, MessageSquare } from "lucide-react";

const Contact = () => {
  const handleConsultation = () => {
    const message = "Halo ROBsPlus! Saya tertarik untuk konsultasi gratis mengenai layanan Anda.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6285768192419?text=${encodedMessage}`, '_blank');
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
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="cyberpunk-card p-8">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-cyberpunk/20 rounded-full mb-6">
                <MessageCircle size={48} className="text-cyberpunk" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Konsultasi Gratis</h3>
              
              <p className="text-gray-300 mb-8">
                Dapatkan solusi terbaik untuk kebutuhan digital Anda melalui konsultasi gratis dengan tim ahli kami. Kami siap membantu mengembangkan ide Anda menjadi solusi nyata.
              </p>
              
              <button 
                onClick={handleConsultation}
                className="cyberpunk-button flex items-center justify-center gap-2 py-3 px-6 text-lg"
              >
                <MessageSquare size={24} /> Konsultasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

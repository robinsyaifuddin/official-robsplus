
import ThreeScene from "../components/ThreeScene";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewsSlider from "../components/NewsSlider";
import NewsPopup from "../components/NewsPopup";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      <ThreeScene />
      <Navbar />
      <Hero />
      <NewsSlider />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <NewsPopup />
    </div>
  );
};

export default Index;

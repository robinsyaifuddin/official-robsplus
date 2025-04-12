
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="lg:flex lg:items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="animate-float">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                <span className="text-white">Modern Solutions for the</span> 
                <span className="text-cyberpunk neon-glow"> Digital Age</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                We create cutting-edge digital experiences that transform businesses and captivate audiences with innovative technology and stunning design.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="cyberpunk-button flex items-center gap-2 text-lg animate-glow">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className="bg-transparent border border-cyberpunk text-cyberpunk hover:bg-cyberpunk/10 font-medium py-2 px-4 rounded transition-all duration-300 text-lg">
                View Portfolio
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative">
              <div className="cyberpunk-border rounded-xl bg-dark-secondary/60 backdrop-blur-sm p-8 animate-float">
                <div className="flex justify-between mb-8">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="w-12 h-12 rounded-full bg-cyberpunk/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-cyberpunk animate-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="h-6 bg-cyberpunk/10 rounded-md w-full"></div>
                  ))}
                  <div className="h-6 bg-cyberpunk/10 rounded-md w-3/4"></div>
                </div>

                <div className="mt-8 p-4 bg-dark/40 rounded-lg border border-cyberpunk/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-cyberpunk/30"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-cyberpunk/20 rounded-md w-1/3 mb-2"></div>
                      <div className="h-4 bg-cyberpunk/10 rounded-md w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-cyberpunk/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-cyberpunk/20 rounded-full filter blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="border-2 border-white/20 rounded-full p-2">
          <ArrowRight size={20} className="rotate-90 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

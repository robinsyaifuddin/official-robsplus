
import { useEffect, useRef, useState } from "react";

// This is a placeholder for the real Three.js implementation
// We'll simulate the 3D effect with a CSS background for now
export const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading of 3D scene
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`canvas-container transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dark to-dark-secondary">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(155,48,255,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(155,48,255,0.1),transparent_50%)]"></div>
        <div className="grid grid-cols-[repeat(20,5vw)] grid-rows-[repeat(20,5vh)] opacity-20">
          {Array.from({ length: 400 }).map((_, i) => (
            <div 
              key={i}
              className={`border-[0.5px] border-cyberpunk/10 ${Math.random() > 0.97 ? 'bg-cyberpunk/30 animate-pulse-light' : ''}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeScene;

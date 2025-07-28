import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import teamLearning from "@assets/Team learning_1753673323494.jpg";
import teamCollaboration from "@assets/Team collaboration_1753673323494.jpg";
import spssTraining from "@assets/spss_1753673323495.jpg";
import presentationSession from "@assets/PXL_20250718_130939838.PORTRAIT_1753673323502.jpg";
import classroomLearning from "@assets/InShot_20250219_173005437_1753673323503.jpg";
import dataAnalysis from "@assets/PXL_20250719_103316291.MP~2_1753673323499.jpg";

const galleryItems = [
  {
    title: "Hands-on SPSS Training",
    description: "Students learning statistical analysis with SPSS software",
    image: spssTraining
  },
  {
    title: "Team Learning Session",
    description: "Collaborative learning in our computer lab environment",
    image: teamLearning
  },
  {
    title: "Small Group Collaboration",
    description: "Students working together on programming challenges",
    image: teamCollaboration
  },
  {
    title: "Data Analysis Workshop",
    description: "Practical sessions on data visualization and analysis",
    image: dataAnalysis
  },
  {
    title: "Presentation Skills",
    description: "Students presenting their project findings and insights",
    image: presentationSession
  },
  {
    title: "Large Group Learning",
    description: "Full classroom engagement in tech skills development",
    image: classroomLearning
  }
];

export default function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(galleryItems.length / itemsPerSlide);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentItems = () => {
    const start = currentSlide * itemsPerSlide;
    return galleryItems.slice(start, start + itemsPerSlide);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section id="gallery" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600">A selection of photos from past camps and hands-on workshops</p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`grid gap-4 sm:gap-6 ${
                  isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {getCurrentItems().map((item, index) => (
                  <Card key={`${currentSlide}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative group">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="sm"
              className="rounded-full p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={toggleAutoPlay}
              variant="outline"
              size="sm"
              className="rounded-full p-2"
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="sm"
              className="rounded-full p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

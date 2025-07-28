import { Card } from "@/components/ui/card";
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
  return (
    <section id="gallery" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600">A selection of photos from past camps and hands-on workshops</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

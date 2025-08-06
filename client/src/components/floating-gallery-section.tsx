import { Card, CardContent } from "@/components/ui/card";
import computerLiteracyImg from "@assets/computer literacy photo_1753673323506.png";
import dataAnalysisImg from "@assets/Data Analysis session_1753673323505.jpg";
import teamCollabImg from "@assets/Team collaboration_1753673323494.jpg";
import spssImg from "@assets/spss_1753673323495.jpg";

const galleryImages = [
  {
    id: "computer-literacy",
    src: computerLiteracyImg,
    title: "Computer Literacy Session",
    description:
      "Students learning essential digital skills with personalized instruction and hands-on practice"
  },
  {
    id: "data-analysis",
    src: dataAnalysisImg,
    title: "Data Analysis Workshop",
    description:
      "Advanced Excel and statistical analysis training with real-world datasets"
  },
  {
    id: "spss-training",
    src: spssImg,
    title: "SPSS Training Session",
    description:
      "Professional statistical software training for research applications"
  },
  {
    id: "team-collab",
    src: teamCollabImg,
    title: "Team Collaboration",
    description:
      "Students working together on group projects and problem-solving exercises"
  }
];

export default function FloatingGallerySection() {
  return (
    <section
      id="gallery"
      className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {galleryImages.map((image) => (
            <Card
              key={image.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {image.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

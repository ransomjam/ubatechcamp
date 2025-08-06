import { Card, CardContent } from "@/components/ui/card";
import computerLiteracyImg from "@assets/computer literacy photo_1753673323506.png";
import dataAnalysisImg from "@assets/Data Analysis session_1753673323505.jpg";
import teamCollabImg from "@assets/Team collaboration_1753673323494.jpg";
import teamLearningImg from "@assets/Team learning_1753673323494.jpg";
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
  },
  {
    id: "team-learning",
    src: teamLearningImg,
    title: "Collaborative Learning",
    description:
      "Peer-to-peer learning sessions fostering knowledge sharing and mutual support"
  },
  {
    id: "presentation",
    src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Project Presentations",
    description:
      "Students presenting their final projects and demonstrating skills learned"
  },
  {
    id: "graduation",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Graduation Ceremony",
    description:
      "Celebrating the completion of UBa Tech Camp 2025 with certificates and recognition"
  },
  {
    id: "project-showcase",
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Project Showcase",
    description:
      "Final project demonstrations showcasing technical skills and innovation"
  },
  {
    id: "networking",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Networking Events",
    description:
      "Professional networking opportunities with industry leaders and alumni"
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


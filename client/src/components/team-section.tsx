import { Card } from "@/components/ui/card";
import founderImage from "@assets/Founder_1753708699510.jpg";
import coFounderImage from "@assets/Co founder_1753673323506.jpg";
import profAnongImage from "@assets/Prof Anong_1753743173746.jpg";

// Combined list of team member images
const teamMembers = [
  founderImage,
  coFounderImage,
  profAnongImage,
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
];

export default function TeamSection() {
  return (
    <section id="team" className="bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {teamMembers.map((image, idx) => (
            <Card key={idx} className="overflow-hidden h-72">
              <img
                src={image}
                alt={`Team member ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

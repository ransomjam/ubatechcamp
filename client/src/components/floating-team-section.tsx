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

export default function FloatingTeamSection() {
  return (
    <section id="team" className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        </div>

        {/* Simple grid of team member cards with full-height images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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


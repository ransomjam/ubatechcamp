import { Card } from "@/components/ui/card";

const leadership = [
  {
    name: "Jam Ransom",
    role: "Founder",
    description: "Visionary leader driving digital education innovation at University of Bamenda",
    image: "/attached_assets/Founder_1753708699510.jpg"
  },
  {
    name: "Abongni Musu",
    role: "Co-Founder",
    description: "Strategic partner in building comprehensive tech education programs",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Prof. Anong Damian",
    role: "University Collaborator",
    description: "Director of Student Affairs, University of Bamenda",
    subtitle: "Department of Biological Sciences, Faculty of Science",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  }
];

const trainers = [
  {
    name: "Angu Princewill Fon",
    role: "Data Analysis Trainer",
    description: "Specialist in statistical analysis and data visualization techniques",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Yembi Desmond",
    role: "Excel Trainer",
    description: "Expert in advanced Excel functions and business analytics",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  }
];

const studentLeaders = [
  {
    name: "Nanguat Blaise",
    role: "Student Leader",
    description: "SA President NAHPISA, 2023/2024",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Kadjo Yve",
    role: "Student Leader",
    description: "SA President, FEMSSA 2023/2024",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600">Dedicated professionals committed to your success</p>
        </div>

        {/* Leadership Team */}
        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 text-center">Leadership</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {leadership.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
                {member.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{member.subtitle}</p>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Trainers */}
        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 text-center">Training Team</h3>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {trainers.map((trainer, index) => (
              <Card key={index} className="p-6 text-center">
                <img 
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{trainer.name}</h4>
                <p className="text-blue-700 font-medium mb-2">{trainer.role}</p>
                <p className="text-gray-600 text-sm">{trainer.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Student Leaders */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 text-center">Student Leadership</h3>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {studentLeaders.map((leader, index) => (
              <Card key={index} className="p-6 text-center">
                <img 
                  src={leader.image}
                  alt={leader.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h4>
                <p className="text-yellow-600 font-medium mb-2">{leader.role}</p>
                <p className="text-gray-600 text-sm">{leader.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

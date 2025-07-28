import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, Facebook, Mail } from "lucide-react";
import founderImage from "@assets/Founder_1753708699510.jpg";
import profAnongImage from "@assets/Prof Anong_1753743173746.jpg";
import coFounderImage from "@assets/Co founder_1753673323506.JPG";

const leadership = [
  {
    name: "Jam Ransom",
    role: "Founder",
    description: "Visionary leader driving digital education innovation at University of Bamenda",
    image: founderImage,
    social: {
      linkedin: "https://linkedin.com/in/jam-ransom",
      facebook: "https://facebook.com/jam.ransom",
      email: "jam.ransom@ubatechcamp.com"
    }
  },
  {
    name: "Abongni Musu",
    role: "Co-Founder",
    description: "Strategic partner in building comprehensive tech education programs",
    image: coFounderImage,
    social: {
      linkedin: "https://linkedin.com/in/abongni-musu",
      facebook: "https://facebook.com/abongni.musu",
      email: "abongni.musu@ubatechcamp.com"
    }
  },
  {
    name: "Prof. Anong Damian",
    role: "University Collaborator",
    description: "Director of Student Affairs, University of Bamenda",
    subtitle: "Department of Biological Sciences, Faculty of Science",
    image: profAnongImage,
    social: {
      linkedin: "https://linkedin.com/in/prof-anong-damian",
      email: "anong.damian@uniba.edu.cm"
    }
  }
];

const trainers = [
  {
    name: "Angu Princewill Fon",
    role: "Data Analysis Trainer",
    description: "Specialist in statistical analysis and data visualization techniques",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    social: {
      linkedin: "https://linkedin.com/in/angu-princewill",
      facebook: "https://facebook.com/angu.princewill",
      email: "angu.princewill@ubatechcamp.com"
    }
  },
  {
    name: "Yembi Desmond",
    role: "Excel Trainer",
    description: "Expert in advanced Excel functions and business analytics",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    social: {
      linkedin: "https://linkedin.com/in/yembi-desmond",
      facebook: "https://facebook.com/yembi.desmond",
      email: "yembi.desmond@ubatechcamp.com"
    }
  }
];

const studentLeaders = [
  {
    name: "Nanguat Blaise",
    role: "Student Leader",
    description: "SA President NAHPISA, 2023/2024",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    social: {
      linkedin: "https://linkedin.com/in/nanguat-blaise",
      facebook: "https://facebook.com/nanguat.blaise",
      email: "nanguat.blaise@students.uniba.edu.cm"
    }
  },
  {
    name: "Kadjo Yve",
    role: "Student Leader",
    description: "SA President, FEMSSA 2023/2024",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    social: {
      linkedin: "https://linkedin.com/in/kadjo-yve",
      facebook: "https://facebook.com/kadjo.yve",
      email: "kadjo.yve@students.uniba.edu.cm"
    }
  }
];

const teamCategories = [
  { id: "leadership", name: "Leadership", members: leadership },
  { id: "trainers", name: "Training Team", members: trainers },
  { id: "students", name: "Student Leaders", members: studentLeaders }
];

export default function TeamSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCategory = teamCategories[activeCategory];
  const totalMembers = currentCategory.members.length;
  const membersPerPage = 3;
  const totalPages = Math.ceil(totalMembers / membersPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentMembers = () => {
    const start = currentIndex * membersPerPage;
    return currentCategory.members.slice(start, start + membersPerPage);
  };

  const switchCategory = (categoryIndex: number) => {
    setActiveCategory(categoryIndex);
    setCurrentIndex(0);
  };

  return (
    <section id="team" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600">Dedicated professionals committed to your success</p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {teamCategories.map((category, index) => (
              <Button
                key={category.id}
                onClick={() => switchCategory(index)}
                variant={activeCategory === index ? "default" : "ghost"}
                size="sm"
                className={`mx-1 transition-all duration-200 ${
                  activeCategory === index 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Team Members Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
            >
              {getCurrentMembers().map((member, index) => (
                <Card key={`${member.name}-${index}`} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
                  />
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                  <p className={`font-medium mb-2 ${
                    activeCategory === 0 ? "text-primary" : 
                    activeCategory === 1 ? "text-blue-700" : "text-yellow-600"
                  }`}>
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                  {"subtitle" in member && member.subtitle && (
                    <p className="text-xs text-gray-500 mb-3">{member.subtitle}</p>
                  )}
                  
                  {/* Social Media Links */}
                  {"social" in member && member.social && (
                    <div className="flex justify-center space-x-3 mt-4">
                      {member.social.linkedin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 hover:bg-blue-50 hover:text-blue-600"
                          asChild
                        >
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${member.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {member.social.facebook && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 hover:bg-blue-50 hover:text-blue-600"
                          asChild
                        >
                          <a
                            href={member.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${member.name}'s Facebook profile`}
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {member.social.email && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 hover:bg-gray-50 hover:text-gray-600"
                          asChild
                        >
                          <a
                            href={`mailto:${member.social.email}`}
                            aria-label={`Send email to ${member.name}`}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows for Mobile/Small screens */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="sm"
                className="rounded-full p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentIndex === index ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="sm"
                className="rounded-full p-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  Linkedin,
  Facebook,
  Mail,
  Users,
  GraduationCap,
  Briefcase,
  Award
} from "lucide-react";
import founderImage from "@assets/Founder_1753708699510.jpg";
import coFounderImage from "@assets/Co founder_1753673323506.jpg";
import profAnongImage from "@assets/Prof Anong_1753743173746.jpg";
import coFounderImage from "@assets/Co founder_1753673323506.jpg";

const teamData = [
  {
    id: "leadership",
    title: "Leadership Team",
    description: "Visionary leaders driving digital education innovation",
    color: "from-blue-500 to-blue-700",
    icon: Award,
    members: [
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
    ]
  },
  {
    id: "trainers",
    title: "Training Team",
    description: "Expert instructors with industry experience",
    color: "from-green-500 to-green-700",
    icon: GraduationCap,
    members: [
      {
        name: "Angu Princewill Fon",
        role: "Data Analysis Trainer",
        description: "Specialist in statistical analysis and data visualization techniques",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
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
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: {
          linkedin: "https://linkedin.com/in/yembi-desmond",
          facebook: "https://facebook.com/yembi.desmond",
          email: "yembi.desmond@ubatechcamp.com"
        }
      }
    ]
  },
  {
    id: "students",
    title: "Student Leaders",
    description: "Dedicated student ambassadors and organizers",
    color: "from-purple-500 to-purple-700",
    icon: Users,
    members: [
      {
        name: "Nanguat Blaise",
        role: "Student Leader",
        description: "SA President NAHPISA, 2023/2024",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
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
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: {
          linkedin: "https://linkedin.com/in/kadjo-yve",
          facebook: "https://facebook.com/kadjo.yve",
          email: "kadjo.yve@students.uniba.edu.cm"
        }
      }
    ]
  }
];

export default function FloatingTeamSection() {
  const [currentTeam, setCurrentTeam] = useState(0);
  const [expandedMember, setExpandedMember] = useState<string>(teamData[0].members[0].name);
  const constraintsRef = useRef(null);

  const nextTeam = () => {
    const newTeam = (currentTeam + 1) % teamData.length;
    setCurrentTeam(newTeam);
    setExpandedMember(teamData[newTeam].members[0].name);
  };

  const prevTeam = () => {
    const newTeam = (currentTeam - 1 + teamData.length) % teamData.length;
    setCurrentTeam(newTeam);
    setExpandedMember(teamData[newTeam].members[0].name);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    
    if (offset.x > 100 || velocity.x > 500) {
      prevTeam();
    } else if (offset.x < -100 || velocity.x < -500) {
      nextTeam();
    }
  };

  const currentTeamData = teamData[currentTeam];

  return (
    <section id="team" className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals committed to your success
          </p>
        </div>

        {/* Team Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-full p-1 shadow-lg">
            {teamData.map((team, index) => (
              <Button
                key={team.id}
                onClick={() => {
                  setCurrentTeam(index);
                  setExpandedMember(team.members[0].name);
                }}
                variant={currentTeam === index ? "default" : "ghost"}
                size="sm"
                className={`rounded-full transition-all duration-300 ${
                  currentTeam === index 
                    ? `bg-gradient-to-r ${team.color} text-white shadow-md` 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <team.icon className="w-4 h-4 mr-2" />
                {team.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative" ref={constraintsRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTeam}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag="x"
              dragConstraints={constraintsRef}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              {/* Team Header */}
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentTeamData.color} text-white text-3xl mb-6 shadow-xl`}>
                  <currentTeamData.icon />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{currentTeamData.title}</h3>
                <p className="text-lg text-gray-600">{currentTeamData.description}</p>
              </div>

              {/* Floating Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {currentTeamData.members.map((member, index) => {
                  const isExpanded = expandedMember === member.name;
                  
                  return (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: isExpanded ? 1.05 : 1,
                        zIndex: isExpanded ? 10 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1,
                        scale: { duration: 0.2 }
                      }}
                      className={`relative ${isExpanded ? 'z-10' : 'z-0'}`}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                          isExpanded 
                            ? 'shadow-2xl ring-4 ring-blue-200 transform' 
                            : 'shadow-lg hover:shadow-xl'
                        }`}
                        onClick={() => setExpandedMember(isExpanded ? '' : member.name)}
                      >
                        <CardContent className="p-0">
                          {/* Card Header */}
                          <div className={`p-6 bg-gradient-to-r ${currentTeamData.color} text-white text-center`}>
                            <img 
                              src={member.image}
                              alt={member.name}
                              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white/20"
                            />
                            <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                            <p className="text-white/90 text-sm">{member.role}</p>
                          </div>

                          {/* Card Content */}
                          <div className="p-6">
                            <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                            {member.subtitle && (
                              <p className="text-xs text-gray-500 mb-4">{member.subtitle}</p>
                            )}

                            <AnimatePresence>
                              {isExpanded ? (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-4"
                                >
                                  <div className="border-t border-gray-200 pt-4">
                                    <h5 className="font-semibold text-gray-900 mb-3 text-center">Connect with {member.name.split(' ')[0]}</h5>
                                    <div className="flex justify-center space-x-3">
                                      {member.social.linkedin && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                                          asChild
                                        >
                                          <a
                                            href={member.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${member.name}'s LinkedIn profile`}
                                          >
                                            <Linkedin className="h-5 w-5" />
                                          </a>
                                        </Button>
                                      )}
                                      {member.social.facebook && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                                          asChild
                                        >
                                          <a
                                            href={member.social.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${member.name}'s Facebook profile`}
                                          >
                                            <Facebook className="h-5 w-5" />
                                          </a>
                                        </Button>
                                      )}
                                      {member.social.email && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-3 hover:bg-gray-50 hover:text-gray-600 rounded-full"
                                          asChild
                                        >
                                          <a
                                            href={`mailto:${member.social.email}`}
                                            aria-label={`Send email to ${member.name}`}
                                          >
                                            <Mail className="h-5 w-5" />
                                          </a>
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-center py-4"
                                >
                                  <p className="text-gray-500 text-sm mb-4">Click to see contact info</p>
                                  <div className="text-2xl">👆</div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <Button
              onClick={prevTeam}
              variant="outline"
              size="lg"
              className="rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            
            <div className="flex space-x-2">
              {teamData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTeam(index);
                    setExpandedMember(teamData[index].members[0].name);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTeam === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextTeam}
              variant="outline"
              size="lg"
              className="rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Swipe Indicator */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Swipe left or right to explore different team categories
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
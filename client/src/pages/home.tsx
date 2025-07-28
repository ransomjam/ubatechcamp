import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import WhatYouLearn from "@/components/what-you-learn";
import TeamSection from "@/components/team-section";
import GallerySection from "@/components/gallery-section";
import ProjectsSection from "@/components/projects-section";
import TestimonialsSection from "@/components/testimonials-section";
import RegistrationForm from "@/components/registration-form";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import MobileFAB from "@/components/mobile-fab";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, Tag, Users, Award, ChevronDown, ChevronUp, BookOpen, Trophy, MessageSquare } from "lucide-react";
import impactImage from "@assets/PXL_20250719_102916588_1753673323501.jpg";

const sectionsData = [
  {
    id: "learn",
    title: "What You'll Learn",
    icon: BookOpen,
    component: <WhatYouLearn />,
    preview: "6 comprehensive technical courses including Python, Excel, SPSS, and more"
  },
  {
    id: "team", 
    title: "Meet Our Team",
    icon: Users,
    component: <TeamSection />,
    preview: "Expert instructors, university collaborators, and student leaders"
  },
  {
    id: "gallery",
    title: "Gallery",
    icon: Trophy,
    component: <GallerySection />,
    preview: "Photos from hands-on workshops and collaborative learning sessions"
  },
  {
    id: "projects",
    title: "Student Projects",
    icon: Trophy,
    component: <ProjectsSection />,
    preview: "Real-world applications and capstone projects by participants"
  },
  {
    id: "testimonials",
    title: "Alumni Voices", 
    icon: MessageSquare,
    component: <TestimonialsSection />,
    preview: "Success stories from our graduates"
  }
];

export default function Home() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />

      {/* Impact Section - Moved Up */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={impactImage}
                alt="Students engaged in data analysis training"
                className="w-full h-96 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <Card className="bg-gradient-to-br from-primary to-blue-800 text-white p-8 hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="border-r border-blue-300 pr-4">
                    <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
                    <p className="text-sm md:text-base text-blue-100">Participants trained from 1st and 2nd Edition</p>
                  </div>
                  <div className="pl-4">
                    <div className="text-3xl md:text-4xl font-bold mb-2">6</div>
                    <p className="text-sm md:text-base text-blue-100">Core technical skills taught in each camp</p>
                  </div>
                  <div className="border-r border-blue-300 pr-4">
                    <div className="text-3xl md:text-4xl font-bold mb-2">6</div>
                    <p className="text-sm md:text-base text-blue-100">Schools participating in the program</p>
                  </div>
                  <div className="pl-4">
                    <div className="text-3xl md:text-4xl font-bold mb-2">6</div>
                    <p className="text-sm md:text-base text-blue-100">University faculties represented</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Official Partnership</h2>
            <Card className="p-8 max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
              <Handshake className="text-primary text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Directorate of Student Affairs</h3>
              <p className="text-gray-600">University of Bamenda</p>
              <p className="text-sm text-gray-500 mt-4">
                In collaboration with the University's Directorate of Student Affairs, ensuring official recognition and certification for all participants.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Collapsible Content Sections */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Program</h2>
            <p className="text-lg text-gray-600">Click on any section below to learn more</p>
          </div>

          <div className="space-y-4">
            {sectionsData.map((section) => {
              const IconComponent = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <Card key={section.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{section.preview}</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 overflow-hidden"
                      >
                        <div className="bg-white">
                          {section.component}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alumni Showcase - 2024 Participants */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Alumni Network</h2>
            <p className="text-lg text-gray-600 mb-2">Celebrating our 2024 graduates who are now making an impact</p>
            <p className="text-sm text-gray-500">From 6 faculties across the University of Bamenda</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Alumni Cards */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">COLTECH Alumni</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Amina Tanko</p>
                <p>Paul Biya</p>
                <p>Grace Mbaku</p>
                <p>Emmanuel Fonka</p>
                <p className="text-primary font-medium">+25 more graduates</p>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">FHS Alumni</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Sarah Ngwa</p>
                <p>Michel Ashu</p>
                <p>Blessing Tabe</p>
                <p>Samuel Njie</p>
                <p className="text-green-600 font-medium">+30 more graduates</p>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">NAHPI & FEMSSA</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Priscilla Fon</p>
                <p>David Che</p>
                <p>Patience Mbe</p>
                <p>Clinton Awah</p>
                <p className="text-yellow-600 font-medium">+40 more graduates</p>
              </div>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <p className="text-sm text-blue-100">Total Graduates</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-sm text-blue-100">Faculties</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <p className="text-sm text-blue-100">Completion Rate</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.8★</div>
                  <p className="text-sm text-blue-100">Average Rating</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Official Certification</h2>
          <p className="text-xl text-blue-100 mb-6">Receive certificates recognized by the University of Bamenda</p>
          <Card className="bg-white bg-opacity-10 p-6 max-w-2xl mx-auto border-0">
            <Tag className="text-yellow-400 text-4xl mb-4 mx-auto" />
            <p className="text-lg">All participants receive official certificates from the University of Bamenda in partnership with the Directorate of Student Affairs, validating your new digital skills.</p>
          </Card>
        </div>
      </section>

      <RegistrationForm />

      {/* Get Involved */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We welcome partnerships with companies, NGOs, and individuals who share our mission. Whether you offer funding, guest lectures, equipment, or mentorship, your support helps shape Cameroon's next generation of tech leaders.
            </p>
            <div className="mt-8">
              <a 
                href="mailto:info@ubatechcamp.org" 
                className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-block"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Who can join?</h3>
              <p className="text-gray-600">Any university student especially in the University of Bamenda.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it really free?</h3>
              <p className="text-gray-600">Absolutely—UBa Tech Camp is 100% free.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need a laptop?</h3>
              <p className="text-gray-600">Yes, though a limited number of loaner laptops are available.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I apply?</h3>
              <p className="text-gray-600">Complete the registration form above; you'll receive a confirmation email within 3 days.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl text-blue-100 mb-8">Subscribe to our newsletter for camp updates, resources, and future event announcements.</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-r-lg font-semibold transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
      
      {/* Mobile FAB for easy navigation */}
      <MobileFAB />
    </div>
  );
}

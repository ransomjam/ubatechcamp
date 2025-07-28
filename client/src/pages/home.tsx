import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FloatingProgramsSection from "@/components/floating-programs-section";
import FloatingTeamSection from "@/components/floating-team-section";
import FloatingGallerySection from "@/components/floating-gallery-section";
import FloatingProjectsSection from "@/components/floating-projects-section";
import FloatingTestimonialsSection from "@/components/floating-testimonials-section";
import RegistrationForm from "@/components/registration-form";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import MobileFAB from "@/components/mobile-fab";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, Tag, Users, Award, ChevronDown, ChevronUp, BookOpen, Trophy, MessageSquare, Star } from "lucide-react";
import impactImage from "@assets/PXL_20250719_102916588_1753673323501.jpg";

const sectionsData = [
  {
    id: "registration-info",
    title: "Registration Information",
    icon: Users,
    component: (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join UBa Tech Camp 2025?</h3>
        <p className="text-gray-600 mb-6">All the interactive sections above showcase what awaits you. Register below to secure your spot!</p>
        <Button 
          onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90"
        >
          Register Now
        </Button>
      </div>
    ),
    preview: "Complete registration information and application process"
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

      {/* Interactive Floating Programs Section */}
      <FloatingProgramsSection />

      {/* Interactive Floating Team Section */}
      <FloatingTeamSection />

      {/* Interactive Floating Gallery Section */}
      <FloatingGallerySection />

      {/* Interactive Floating Projects Section */}
      <FloatingProjectsSection />

      {/* Interactive Floating Testimonials Section */}
      <FloatingTestimonialsSection />

      {/* Registration Call-to-Action */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join UBa Tech Camp 2025?</h2>
          <p className="text-xl text-blue-100 mb-8">All the interactive sections above showcase what awaits you. Register below to secure your spot!</p>
          <Button 
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-3"
          >
            Register Now
          </Button>
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

      {/* Alumni Network */}
      <section id="alumni-network" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Network</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our growing community of tech professionals. Our alumni work at leading companies worldwide and continue to support current students through mentorship and career guidance.
            </p>
          </div>
          
          {/* Facilitators & Leadership */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Program Leadership</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Jam Ransom</h4>
                <p className="text-sm text-blue-600 font-medium mb-1">Founder</p>
                <p className="text-xs text-gray-600">NAHPI - Mining & Mineral Engineering</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Abongni Musuh</h4>
                <p className="text-sm text-green-600 font-medium mb-1">Co-Founder</p>
                <p className="text-xs text-gray-600">COLTECH - Food & Bioresource Technology</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Geh Desmond Yembi</h4>
                <p className="text-sm text-purple-600 font-medium mb-1">Tech Volunteer</p>
                <p className="text-xs text-gray-600">COLTECH - Computer Engineering</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Anyu Princewill Fon</h4>
                <p className="text-sm text-orange-600 font-medium mb-1">Finance Volunteer</p>
                <p className="text-xs text-gray-600">FEMS - Banking & Finance</p>
              </Card>
            </div>
          </div>

          {/* Alumni by Faculty */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-center">Faculty of Science</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Ndim Evette Felai</span>
                  <span className="text-blue-600">Biochemistry</span>
                </div>
                <div className="flex justify-between">
                  <span>Fonbah Ryan Ngaberi</span>
                  <span className="text-blue-600">Math & Computer Science</span>
                </div>
                <div className="flex justify-between">
                  <span>Sawai Stephany Tiykenyuy</span>
                  <span className="text-blue-600">Microbiology</span>
                </div>
                <div className="flex justify-between">
                  <span>Neh Precious Chi</span>
                  <span className="text-blue-600">Biochemistry</span>
                </div>
                <p className="text-center text-blue-600 font-medium mt-3">+15 more graduates</p>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-center">FEMS & Business</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Kimbi Herodia Fuluni</span>
                  <span className="text-green-600">Accounting</span>
                </div>
                <div className="flex justify-between">
                  <span>Ghansibee Lydean Berinyuy</span>
                  <span className="text-green-600">Accounting</span>
                </div>
                <div className="flex justify-between">
                  <span>Yaradze Shanita Kinyuy</span>
                  <span className="text-green-600">Marketing</span>
                </div>
                <div className="flex justify-between">
                  <span>Feh Blessing</span>
                  <span className="text-green-600">Finance</span>
                </div>
                <p className="text-center text-green-600 font-medium mt-3">+12 more graduates</p>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-center">Engineering & Tech</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Cynthia Kebote</span>
                  <span className="text-purple-600">Mining Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span>Kakwang Brain Nkemta</span>
                  <span className="text-purple-600">Biomedical Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span>Fienge Godwill Beziegzau</span>
                  <span className="text-purple-600">Agricultural Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span>Soja Cyan Yuma</span>
                  <span className="text-purple-600">Transport & Logistics</span>
                </div>
                <p className="text-center text-purple-600 font-medium mt-3">+8 more graduates</p>
              </div>
            </Card>
          </div>
          
          {/* Statistics & CTA */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-3xl font-bold">42+</div>
                  <p className="text-sm text-blue-100">Active Participants</p>
                </div>
                <div>
                  <div className="text-3xl font-bold">7</div>
                  <p className="text-sm text-blue-100">Faculties Represented</p>
                </div>
                <div>
                  <div className="text-3xl font-bold">4</div>
                  <p className="text-sm text-blue-100">Leadership Team</p>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <p className="text-sm text-blue-100">Student Success</p>
                </div>
              </div>
              <Button 
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-gray-100"
                size="lg"
              >
                Read Alumni Stories
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="get-involved" className="bg-gray-50 py-16">
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

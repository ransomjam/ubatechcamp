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
import { Card } from "@/components/ui/card";
import { Handshake, Tag, Users, Award } from "lucide-react";
import impactImage from "@assets/PXL_20250719_102916588_1753673323501.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      


      {/* Partnership Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Official Partnership</h2>
            <Card className="p-8 max-w-2xl mx-auto">
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

      <WhatYouLearn />
      <TeamSection />

      {/* Impact Section */}
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
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <Card className="bg-primary text-white p-8">
                <div className="text-4xl font-bold mb-2">100+</div>
                <p className="text-lg">Participants trained from UBa Tech Camp, first edition</p>
              </Card>
              
              <Card className="bg-green-600 text-white p-8">
                <div className="text-4xl font-bold mb-2">6</div>
                <p className="text-lg">Core technical skills taught in each camp session</p>
              </Card>
              
              <Card className="bg-yellow-600 text-white p-8">
                <div className="text-4xl font-bold mb-2">5</div>
                <p className="text-lg">University faculties represented in our participant base</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <GallerySection />
      <ProjectsSection />
      <TestimonialsSection />

      {/* Participant List */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2024 Participants</h2>
            <p className="text-lg text-gray-600">Meet some of our accomplished graduates</p>
          </div>
          
          <Card className="p-6">
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">Amina Tanko</p>
                <p className="font-medium text-gray-900">Paul Biya</p>
                <p className="font-medium text-gray-900">Grace Mbaku</p>
                <p className="font-medium text-gray-900">Emmanuel Fonka</p>
                <p className="font-medium text-gray-900">Sarah Ngwa</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">Michel Ashu</p>
                <p className="font-medium text-gray-900">Blessing Tabe</p>
                <p className="font-medium text-gray-900">Samuel Njie</p>
                <p className="font-medium text-gray-900">Priscilla Fon</p>
                <p className="font-medium text-gray-900">David Che</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">Patience Mbe</p>
                <p className="font-medium text-gray-900">Clinton Awah</p>
                <p className="font-medium text-gray-900">Joyce Tiku</p>
                <p className="font-medium text-gray-900">Francis Ndip</p>
                <p className="font-medium text-gray-900">Mercy Yong</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">And 85+ more...</p>
                <p className="text-sm text-gray-500 italic">Students from various faculties including FHS, COLTECH, NAHPI, FEMSSA</p>
              </div>
            </div>
          </Card>
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
    </div>
  );
}

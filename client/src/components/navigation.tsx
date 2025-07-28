import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src={`/attached_assets/uba-tech-camp-logo-new.png`}
                alt="UBa Tech Camp Logo"
                className="h-12 w-12"
              />
              <h1 className="text-xl font-bold text-primary">UBa Tech Camp</h1>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-primary hover:text-blue-700 px-2 py-2 rounded-md text-sm font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('learn')}
                className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
              >
                Learn
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
              >
                Alumni
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('register')}
                className="bg-primary text-white hover:bg-blue-700 ml-2"
                size="sm"
              >
                Register
              </Button>
            </div>
          </div>
          
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t shadow-lg">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-primary hover:text-blue-700 block px-3 py-3 rounded-md text-base font-medium w-full text-left border-b border-gray-100"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('learn')}
                className="text-gray-600 hover:text-primary block px-3 py-3 rounded-md text-base font-medium w-full text-left border-b border-gray-100"
              >
                What You'll Learn
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-gray-600 hover:text-primary block px-3 py-3 rounded-md text-base font-medium w-full text-left border-b border-gray-100"
              >
                Our Team
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-gray-600 hover:text-primary block px-3 py-3 rounded-md text-base font-medium w-full text-left border-b border-gray-100"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-600 hover:text-primary block px-3 py-3 rounded-md text-base font-medium w-full text-left border-b border-gray-100"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 hover:text-primary block px-3 py-3 rounded-md text-base font-medium w-full text-left border-b border-gray-100"
              >
                Alumni Voices
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-primary block px-3 py-3 rounded-md text-base font-medium w-full text-left border-b border-gray-100"
              >
                Contact Us
              </button>
              <div className="pt-2">
                <Button 
                  onClick={() => scrollToSection('register')}
                  className="bg-primary text-white hover:bg-blue-700 w-full"
                  size="lg"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

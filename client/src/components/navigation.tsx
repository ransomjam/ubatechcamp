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
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">UBa Tech Camp</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-primary hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('learn')}
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                What You'll Learn
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Projects
              </button>
              <Button 
                onClick={() => scrollToSection('register')}
                className="bg-primary text-white hover:bg-blue-700"
              >
                Register
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-primary hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('learn')}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                What You'll Learn
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Projects
              </button>
              <Button 
                onClick={() => scrollToSection('register')}
                className="bg-primary text-white hover:bg-blue-700 w-full mt-2"
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

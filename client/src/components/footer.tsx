import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logoImage from "@assets/new logo.jpg";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage}
                alt="UBa Tech Camp Logo"
                className="h-12 w-12 object-contain rounded-full"
              />
              <h3 className="text-2xl font-bold">UBa Tech Camp</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering youth with digital skills through comprehensive, hands-on training programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('learn')}
                  className="hover:text-white transition-colors"
                >
                  What You'll Learn
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('team')}
                  className="hover:text-white transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-white transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('register')}
                  className="hover:text-white transition-colors"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>University of Bamenda</li>
              <li>info.ubatechcamp@gmail.com</li>
              <li>+237 671 308 991</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 UBa Tech Camp. All rights reserved. | In partnership with University of Bamenda</p>
        </div>
      </div>
    </footer>
  );
}

import { Card } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600">UBa Campus, University of Bamenda</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <a 
              href="mailto:info.ubatechcamp@gmail.com" 
              className="text-primary hover:text-blue-700 transition-colors"
            >
              info.ubatechcamp@gmail.com
            </a>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <a 
              href="tel:+237671308991" 
              className="text-primary hover:text-blue-700 transition-colors"
            >
              +237 671 308 991
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
}

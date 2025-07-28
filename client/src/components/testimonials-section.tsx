import { TestimonialsDisplay } from "@/components/testimonials-display";
import { TestimonialForm } from "@/components/testimonial-form";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Keep some static testimonials as examples while building the dynamic system
const staticTestimonials = [
  {
    quote: "UBa Tech Camp's Excel workshops gave me the confidence to analyze company data at my internship.",
    name: "Amina",
    cohort: "2024 Cohort",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100"
  },
  {
    quote: "The SPSS training demystified statistics for my research project.",
    name: "Paul",
    cohort: "2024 Cohort",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  },
  {
    quote: "Learning Python here saved me hours of manual work.",
    name: "Grace",
    cohort: "2024 Cohort",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Voices</h2>
          <p className="text-lg text-gray-600 mb-6">Hear from our successful graduates and share your own story</p>
          
          {/* Call to Action for Alumni */}
          <div className="flex justify-center mb-8">
            <TestimonialForm />
          </div>
        </div>

        {/* Dynamic Testimonials from Database */}
        <div className="mb-12">
          <TestimonialsDisplay showTitle={false} />
        </div>

        {/* Static Testimonials (will be replaced as more alumni submit) */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Featured Stories</h3>
            <p className="text-gray-600">Highlights from our 2024 graduates</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {staticTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Quote className="text-blue-500 h-6 w-6" />
                </div>
                
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.cohort}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

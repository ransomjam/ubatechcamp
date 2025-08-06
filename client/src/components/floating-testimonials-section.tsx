import { TestimonialsDisplay } from "@/components/testimonials-display";

export default function FloatingTestimonialsSection() {
  return (
    <section id="testimonials" className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Alumni Voices</h2>
        </div>
        <TestimonialsDisplay showTitle={false} />
      </div>
    </section>
  );
}

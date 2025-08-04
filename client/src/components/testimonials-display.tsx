import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Quote } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialsDisplayProps {
  limit?: number;
  showTitle?: boolean;
}

export function TestimonialsDisplay({ limit, showTitle = true }: TestimonialsDisplayProps) {
  const { data: response, isLoading } = useQuery<{ success: boolean; data: Testimonial[] }>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const testimonials: Testimonial[] = response?.data || [];
  const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <Quote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No testimonials yet</h3>
        <p className="text-gray-500">Be the first alumni to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Alumni Voices</h3>
          <p className="text-gray-600">Real stories from UBa Tech Camp graduates</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={testimonial.photoUrl || undefined} alt={testimonial.fullName} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">
              {testimonial.fullName}
            </h4>
            <p className="text-sm text-gray-600 mb-1">
              Class of {testimonial.graduationYear}
            </p>
            <Badge variant="outline" className="text-xs">
              {testimonial.faculty}
            </Badge>
          </div>
          
          {testimonial.linkedinUrl && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="p-2"
            >
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${testimonial.fullName}'s LinkedIn profile`}
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
              </a>
            </Button>
          )}
        </div>

        <div className="relative">
          <Quote className="w-6 h-6 text-blue-200 absolute -top-2 -left-2" />
          <blockquote className="text-gray-700 text-sm leading-relaxed pl-4">
            {testimonial.testimonialText}
          </blockquote>
        </div>

        {(testimonial.currentRole || testimonial.company) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {testimonial.currentRole && (
                <span className="font-medium">{testimonial.currentRole}</span>
              )}
              {testimonial.currentRole && testimonial.company && (
                <span> at </span>
              )}
              {testimonial.company && (
                <span className="font-medium">{testimonial.company}</span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
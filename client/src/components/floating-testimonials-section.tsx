import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  Star,
  Quote,
  Users,
  Trophy,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Plus,
  Calendar
} from "lucide-react";
import { TestimonialForm } from "./testimonial-form";

const testimonialCategories = [
  {
    id: "recent-graduates",
    title: "Recent Graduates",
    description: "Fresh perspectives from our latest cohort",
    color: "from-green-500 to-green-700",
    icon: GraduationCap,
    filter: "recent"
  },
  {
    id: "career-success",
    title: "Career Success Stories",
    description: "Alumni who advanced their careers",
    color: "from-blue-500 to-blue-700",
    icon: Briefcase,
    filter: "career"
  },
  {
    id: "student-experience",
    title: "Student Experience",
    description: "Memories and insights from participants",
    color: "from-purple-500 to-purple-700",
    icon: Users,
    filter: "experience"
  }
];

interface Testimonial {
  id: string;
  // Database fields
  fullName?: string;
  currentRole?: string; 
  graduationYear?: string;
  testimonialText?: string;
  isApproved?: boolean;
  faculty?: string;
  email?: string;
  linkedinUrl?: string;
  createdAt?: string;
  // Mock data fields
  name?: string;
  position?: string;
  year?: string;
  rating?: number; 
  content?: string;
  approved?: boolean;
  category?: string;
  skills?: string[];
  // Common fields
  company: string;
  photoUrl: string;
}

// Mock testimonials for demonstration - these would come from the database
const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie Tabi",
    position: "Data Analyst",
    company: "MTN Cameroon",
    year: "2024",
    rating: 5,
    content: "UBa Tech Camp transformed my career. The hands-on training in data analysis and Python programming gave me the skills I needed to land my dream job at MTN.",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    approved: true,
    category: "career",
    skills: ["Python", "Data Analysis", "Excel"]
  },
  {
    id: "2", 
    name: "Paul Ngwa",
    position: "Software Developer",
    company: "Orange Cameroon",
    year: "2024",
    rating: 5,
    content: "The collaborative learning environment and expert instructors made complex concepts easy to understand. I now work as a software developer thanks to the foundation I built here.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    approved: true,
    category: "career",
    skills: ["Programming", "Web Development", "Teamwork"]
  },
  {
    id: "3",
    name: "Grace Fon",
    position: "Student",
    company: "University of Bamenda",
    year: "2024",
    rating: 5,
    content: "The tech camp was an incredible experience. I learned so much about computer literacy and made lifelong friends. The instructors were patient and supportive throughout.",
    photoUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    approved: true,
    category: "experience",
    skills: ["Computer Literacy", "Networking", "Team Collaboration"]
  },
  {
    id: "4",
    name: "John Teke",
    position: "Recent Graduate",
    company: "Self-employed",
    year: "2024",
    rating: 4,
    content: "Just completed the program and I'm amazed by how much I've learned. The Excel and SPSS training will be invaluable for my research work.",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    approved: true,
    category: "recent",
    skills: ["Excel", "SPSS", "Statistical Analysis"]
  },
  {
    id: "5",
    name: "Linda Asong",
    position: "Business Analyst", 
    company: "BICEC Bank",
    year: "2024",
    rating: 5,
    content: "The practical approach to learning and real-world projects prepared me perfectly for my current role. I use the Excel skills I learned here every single day.",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    approved: true,
    category: "career",
    skills: ["Excel", "Business Analysis", "Data Visualization"]
  },
  {
    id: "6",
    name: "Samuel Mbua",
    position: "Student",
    company: "University of Bamenda",
    year: "2024", 
    rating: 5,
    content: "Coming into the program with no tech background, I was nervous. But the supportive community and step-by-step approach made me feel confident and capable.",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    approved: true,
    category: "experience",
    skills: ["Computer Literacy", "Confidence Building", "Problem Solving"]
  }
];

export default function FloatingTestimonialsSection() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const constraintsRef = useRef(null);

  // Fetch real testimonials from the database
  const { data: apiResponse } = useQuery<{data: any[]}>({
    queryKey: ["/api/testimonials"],
  });

  // Combine real data with mock data for demonstration
  const realTestimonials: Testimonial[] = (apiResponse?.data || []).map((t: any) => ({
    id: t.id,
    fullName: t.fullName || t.full_name,
    currentRole: t.currentRole || t.current_role || "Alumni",
    company: t.company || "UBa Tech Camp Graduate",
    graduationYear: t.graduationYear || t.graduation_year,
    testimonialText: t.testimonialText || t.testimonial_text,
    photoUrl: t.photoUrl || t.photo_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    isApproved: t.isApproved || t.is_approved,
    faculty: t.faculty,
    email: t.email,
    linkedinUrl: t.linkedinUrl || t.linkedin_url,
    createdAt: t.createdAt || t.created_at
  }));

  const testimonials = [...realTestimonials, ...mockTestimonials];

  const nextCategory = () => {
    const newCategory = (currentCategory + 1) % testimonialCategories.length;
    setCurrentCategory(newCategory);
    setCurrentTestimonialIndex(0);
  };

  const prevCategory = () => {
    const newCategory = (currentCategory - 1 + testimonialCategories.length) % testimonialCategories.length;
    setCurrentCategory(newCategory);
    setCurrentTestimonialIndex(0);
  };

  const nextTestimonial = () => {
    const categoryTestimonials = getFilteredTestimonials(currentCategoryData.filter);
    setCurrentTestimonialIndex((prev) => (prev + 1) % categoryTestimonials.length);
  };

  const prevTestimonial = () => {
    const categoryTestimonials = getFilteredTestimonials(currentCategoryData.filter);
    setCurrentTestimonialIndex((prev) => (prev - 1 + categoryTestimonials.length) % categoryTestimonials.length);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    
    if (offset.x > 100 || velocity.x > 500) {
      prevTestimonial();
    } else if (offset.x < -100 || velocity.x < -500) {
      nextTestimonial();
    }
  };

  const getFilteredTestimonials = (filter: string): Testimonial[] => {
    // For real testimonials, we'll categorize based on graduation year and role
    return testimonials.filter((testimonial: Testimonial) => {
      if (!testimonial.isApproved && !testimonial.approved) return false;
      
      if (filter === "recent") {
        return parseInt(testimonial.graduationYear || testimonial.year || "2024") >= 2024;
      } else if (filter === "career") {
        return testimonial.currentRole !== "Student" || testimonial.position !== "Student";
      } else if (filter === "experience") {
        return true; // All approved testimonials can be shown in experience
      }
      
      // Fallback for mock data
      return testimonial.category === filter;
    });
  };

  const currentCategoryData = testimonialCategories[currentCategory];
  const currentTestimonials = getFilteredTestimonials(currentCategoryData.filter);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Alumni Voices</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Success stories and experiences from our amazing community
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-full p-1 shadow-lg">
            {testimonialCategories.map((category, index) => (
              <Button
                key={category.id}
                onClick={() => {
                  setCurrentCategory(index);
                  setCurrentTestimonialIndex(0);
                }}
                variant={currentCategory === index ? "default" : "ghost"}
                size="sm"
                className={`rounded-full transition-all duration-300 ${
                  currentCategory === index 
                    ? `bg-gradient-to-r ${category.color} text-white shadow-md` 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.title}
              </Button>
            ))}
            <Button
              onClick={() => setShowForm(true)}
              variant="ghost"
              size="sm"
              className="rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative" ref={constraintsRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag="x"
              dragConstraints={constraintsRef}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentCategoryData.color} text-white text-3xl mb-6 shadow-xl`}>
                  <currentCategoryData.icon />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{currentCategoryData.title}</h3>
                <p className="text-lg text-gray-600">{currentCategoryData.description}</p>
              </div>

              {/* Horizontal Swipeable Testimonial Cards */}
              <div className="relative max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  {currentTestimonials.length > 0 && (
                    <motion.div
                      key={`${currentCategory}-${currentTestimonialIndex}`}
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      drag="x"
                      dragConstraints={constraintsRef}
                      onDragEnd={handleDragEnd}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      {(() => {
                        const testimonial = currentTestimonials[currentTestimonialIndex];
                        if (!testimonial) return null;
                        
                        return (
                          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden max-w-2xl mx-auto">
                            <CardContent className="p-0">
                              {/* Card Header */}
                              <div className={`p-8 bg-gradient-to-r ${currentCategoryData.color} text-white relative`}>
                                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/20" />
                                <div className="flex items-center space-x-6">
                                  <img 
                                    src={testimonial.photoUrl}
                                    alt={testimonial.fullName || testimonial.name || "Alumni"}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                                  />
                                  <div>
                                    <h4 className="text-2xl font-bold mb-1">{testimonial.fullName || testimonial.name}</h4>
                                    <p className="text-white/90 text-lg">{testimonial.currentRole || testimonial.position}</p>
                                    <p className="text-white/70 text-sm">{testimonial.company}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                  <div className="flex">
                                    {testimonial.rating ? renderStars(testimonial.rating) : renderStars(5)}
                                  </div>
                                  <span className="text-white/70 text-sm">{testimonial.graduationYear || testimonial.year}</span>
                                </div>
                              </div>

                              {/* Card Content */}
                              <div className="p-8">
                                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                  "{testimonial.testimonialText || testimonial.content}"
                                </p>

                                {testimonial.skills && testimonial.skills.length > 0 && (
                                  <div className="border-t border-gray-200 pt-6 mb-6">
                                    <h5 className="font-semibold text-gray-900 mb-3">Skills Gained:</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {testimonial.skills.map((skill: string) => (
                                        <span key={skill} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {testimonial.faculty && (
                                  <div className="border-t border-gray-200 pt-6 mb-6">
                                    <h5 className="font-semibold text-gray-900 mb-2">Faculty:</h5>
                                    <span className="text-gray-700">{testimonial.faculty}</span>
                                  </div>
                                )}

                                <div className="pt-4">
                                  <Button 
                                    className={`w-full bg-gradient-to-r ${currentCategoryData.color} hover:opacity-90`}
                                    onClick={() => setShowForm(true)}
                                    size="lg"
                                  >
                                    Share Your Story Too
                                    <MessageSquare className="w-5 h-5 ml-2" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="lg"
              className="rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={currentTestimonials.length <= 1}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            
            <div className="flex space-x-2">
              {currentTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonialIndex === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="lg"
              className="rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={currentTestimonials.length <= 1}
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Category Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              onClick={prevCategory}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous Category
            </Button>
            
            <div className="flex space-x-1">
              {testimonialCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCategory(index);
                    setCurrentTestimonialIndex(0);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentCategory === index 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextCategory}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              Next Category
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Swipe Indicator */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Swipe left or right to read different testimonials within this category
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(false)}
                  >
                    ✕
                  </Button>
                </div>
                <TestimonialForm onSuccess={() => setShowForm(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
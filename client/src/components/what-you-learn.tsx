import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Monitor, Code, BarChart, Users, Network, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const courses = [
  {
    id: "computer-literacy",
    title: "Computer Literacy",
    description: "Essential foundational skills for digital proficiency",
    icon: Monitor,
    details: [
      "File management systems",
      "Office suite mastery",
      "Digital communication tools"
    ]
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Programming fundamentals with practical applications",
    icon: Code,
    details: [
      "Python syntax and basics",
      "Data structures and algorithms",
      "Automation scripting"
    ]
  },
  {
    id: "excel",
    title: "Data Analysis with Excel",
    description: "Advanced Excel skills for data manipulation",
    icon: BarChart,
    details: [
      "Data cleaning techniques",
      "Pivot tables and charts",
      "Advanced formulas"
    ]
  },
  {
    id: "spss",
    title: "SPSS for Social Science",
    description: "Statistical analysis for research applications",
    icon: BarChart,
    details: [
      "Variable coding and management",
      "Descriptive statistics",
      "Data visualization"
    ]
  },
  {
    id: "teamwork",
    title: "Team Collaboration",
    description: "Project-based learning and presentation skills",
    icon: Users,
    details: [
      "Group collaboration techniques",
      "Project management basics",
      "Presentation skills"
    ]
  },
  {
    id: "networking",
    title: "Computer Networking",
    description: "Understanding network fundamentals and security",
    icon: Network,
    details: [
      "Network protocols and architecture",
      "Basic cybersecurity principles",
      "Network troubleshooting"
    ]
  }
];

export default function WhatYouLearn() {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <section id="learn" className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course) => {
            const IconComponent = course.icon;
            const isExpanded = expandedCourse === course.id;
            
            return (
              <Card 
                key={course.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition duration-300"
                onClick={() => toggleCourse(course.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="text-primary text-2xl" />
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400 h-5 w-5" />
                    ) : (
                      <ChevronDown className="text-gray-400 h-5 w-5" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-4 overflow-hidden"
                      >
                        <ul className="text-sm text-gray-600 space-y-1 mb-4">
                          {course.details.map((detail, index) => (
                            <li key={index}>• {detail}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

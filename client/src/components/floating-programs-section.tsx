import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Monitor,
  Network,
  Code,
  Database,
  FileSpreadsheet,
  BarChart,
  Users,
  Presentation
} from "lucide-react";

const programSections = [
  {
    id: "foundations",
    title: "Digital Foundations",
    description: "Master the essential building blocks of modern technology",
    color: "from-blue-500 to-blue-700",
    courses: [
      {
        id: "computer-literacy",
        title: "Computer Literacy",
        description: "Essential digital skills everyone needs",
        details: [
          "Microsoft office programs",
          "File management and organization",
          "Digital communication tools",
          "Basic troubleshooting",
          "Software installation and maintenance"
        ],
        level: "Beginner",
        icon: Monitor
      },
      {
        id: "networking",
        title: "Computer Networking",
        description: "Understanding how devices connect",
        details: [
          "Network fundamentals",
          "Internet protocols",
          "Network security basics",
          "WiFi and connectivity"
        ],
        level: "Intermediate",
        icon: Network
      }
    ]
  },
  {
    id: "programming",
    title: "Programming & Development",
    description: "Build real applications with modern programming languages",
    color: "from-blue-500 to-blue-700",
    courses: [
      {
        id: "python",
        title: "Python Programming",
        description: "Learn the world's most popular programming language",
        details: [
          "Python syntax and fundamentals",
          "Data structures and algorithms",
          "Automation and scripting",
          "Web development basics"
        ],
        level: "Beginner",
        icon: Code
      },
      {
        id: "databases",
        title: "Database Management",
        description: "Store and retrieve data efficiently",
        details: [
          "Database design principles",
          "SQL fundamentals",
          "Data modeling",
          "Query optimization"
        ],
        level: "Intermediate",
        icon: Database
      }
    ]
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Research",
    description: "Transform raw data into meaningful insights",
    color: "from-blue-500 to-blue-700",
    courses: [
      {
        id: "excel",
        title: "Advanced Excel",
        description: "Master the most powerful spreadsheet tool",
        details: [
          "Advanced formulas and functions",
          "Pivot tables and data analysis",
          "Charts and visualization",
          "Automation with macros"
        ],
        level: "Intermediate",
        icon: FileSpreadsheet
      },
      {
        id: "spss",
        title: "SPSS Statistical Analysis",
        description: "Professional statistical software for research",
        details: [
          "Variable coding and management",
          "Descriptive and inferential statistics",
          "Research methodology",
          "Report generation"
        ],
        level: "Advanced",
        icon: BarChart
      }
    ]
  },
  {
    id: "collaboration",
    title: "Professional Skills",
    description: "Essential soft skills for the modern workplace",
    color: "from-blue-500 to-blue-700",
    courses: [
      {
        id: "teamwork",
        title: "Team Collaboration",
        description: "Work effectively in project teams",
        details: [
          "Project management fundamentals",
          "Communication strategies",
          "Conflict resolution",
          "Leadership development"
        ],
        level: "All Levels",
        icon: Users
      },
      {
        id: "presentation",
        title: "Presentation Skills",
        description: "Present your work with confidence",
        details: [
          "Public speaking techniques",
          "Visual design principles",
          "Storytelling with data",
          "Professional presentation tools"
        ],
        level: "All Levels",
        icon: Presentation
      }
    ]
  }
];

export default function FloatingProgramsSection() {
  const unorderedCourses = programSections.flatMap((section) =>
    section.courses.map((course) => ({ ...course, color: section.color }))
  );

  const prioritized = ["computer-literacy", "spss"];
  const allCourses = [
    ...prioritized.map((id) =>
      unorderedCourses.find((course) => course.id === id)!
    ),
    ...unorderedCourses.filter((course) => !prioritized.includes(course.id)),
  ];

  return (
    <section
      id="programs"
      className="bg-gradient-to-br from-gray-50 to-gray-100 -mt-6 md:-mt-12 pt-4 md:pt-8 pb-10 md:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Training programs</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {allCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="shadow-lg hover:shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className={`p-6 bg-gradient-to-r ${course.color} text-white`}>
                    <div className="flex justify-end mb-3">
                      <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <course.icon className="w-6 h-6" />
                      <h4 className="text-xl font-bold">{course.title}</h4>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-900 mb-3">What you'll learn:</h5>
                      <ul className="space-y-2">
                        {course.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: detailIndex * 0.1 }}
                            className="flex items-start text-gray-600"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-gray-200">
                        <Button
                          className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90`}
                          onClick={() => {
                            document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Enroll in this course
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
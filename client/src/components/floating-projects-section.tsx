import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  Code,
  BarChart,
  Database,
  Globe,
  Lightbulb,
  Award,
  ExternalLink,
  Github,
  Play
} from "lucide-react";

const projectsData = [
  {
    id: "python-automation",
    title: "Python Automation Projects",
    description: "Real-world automation scripts and applications",
    color: "from-green-500 to-green-700",
    icon: Code,
    projects: [
      {
        id: "data-scraper",
        title: "Web Data Scraper",
        description: "Automated data collection from university websites for academic research purposes",
        tech: ["Python", "BeautifulSoup", "Pandas"],
        difficulty: "Intermediate",
        author: "Jam Ransom & Team",
        features: [
          "Automated data extraction from multiple sources",
          "Data cleaning and preprocessing",
          "Export to Excel and CSV formats",
          "Error handling and logging"
        ],
        demoUrl: "#",
        codeUrl: "#"
      },
      {
        id: "task-scheduler",
        title: "Smart Task Scheduler",
        description: "Personal productivity automation tool for managing daily tasks and reminders",
        tech: ["Python", "Tkinter", "SQLite"],
        difficulty: "Beginner",
        author: "Student Team A",
        features: [
          "User-friendly GUI interface",
          "Database integration for task storage",
          "Automated email notifications",
          "Priority-based task sorting"
        ],
        demoUrl: "#",
        codeUrl: "#"
      }
    ]
  },
  {
    id: "data-analysis",
    title: "Data Analysis Projects",
    description: "Statistical analysis and visualization projects",
    color: "from-blue-500 to-blue-700",
    icon: BarChart,
    projects: [
      {
        id: "university-survey",
        title: "University Student Survey Analysis",
        description: "Comprehensive analysis of student satisfaction and academic performance at University of Bamenda",
        tech: ["Excel", "SPSS", "Python"],
        difficulty: "Advanced",
        author: "Research Team",
        features: [
          "Statistical significance testing",
          "Data visualization with charts",
          "Correlation analysis",
          "Predictive modeling"
        ],
        demoUrl: "#",
        codeUrl: "#"
      },
      {
        id: "market-trends",
        title: "Local Market Trends Dashboard",
        description: "Interactive dashboard analyzing local business trends and economic indicators",
        tech: ["Excel", "Power BI", "SQL"],
        difficulty: "Intermediate",
        author: "Business Analytics Team",
        features: [
          "Real-time data updates",
          "Interactive visualizations",
          "Trend forecasting",
          "Export functionality"
        ],
        demoUrl: "#",
        codeUrl: "#"
      }
    ]
  },
  {
    id: "web-development",
    title: "Web Development Projects",
    description: "Modern web applications and websites",
    color: "from-purple-500 to-purple-700",
    icon: Globe,
    projects: [
      {
        id: "student-portal",
        title: "Student Information Portal",
        description: "Comprehensive web portal for University of Bamenda students to access academic information",
        tech: ["HTML", "CSS", "JavaScript", "Python"],
        difficulty: "Advanced",
        author: "Web Development Team",
        features: [
          "User authentication system",
          "Academic records display",
          "Course registration interface",
          "Mobile-responsive design"
        ],
        demoUrl: "#",
        codeUrl: "#"
      },
      {
        id: "tech-camp-website",
        title: "UBa Tech Camp Website",
        description: "This very website showcasing modern web development techniques and user experience design",
        tech: ["React", "TypeScript", "Tailwind", "PostgreSQL"],
        difficulty: "Advanced",
        author: "UBa Tech Camp Team",
        features: [
          "Interactive floating card UI",
          "Alumni testimonial system",
          "Registration management",
          "Social media integration"
        ],
        demoUrl: "#",
        codeUrl: "#"
      }
    ]
  }
];

export default function FloatingProjectsSection() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [expandedProject, setExpandedProject] = useState<string>(projectsData[0].projects[0].id);
  const constraintsRef = useRef(null);

  const nextCategory = () => {
    const newCategory = (currentCategory + 1) % projectsData.length;
    setCurrentCategory(newCategory);
    setExpandedProject(projectsData[newCategory].projects[0].id);
  };

  const prevCategory = () => {
    const newCategory = (currentCategory - 1 + projectsData.length) % projectsData.length;
    setCurrentCategory(newCategory);
    setExpandedProject(projectsData[newCategory].projects[0].id);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    
    if (offset.x > 100 || velocity.x > 500) {
      prevCategory();
    } else if (offset.x < -100 || velocity.x < -500) {
      nextCategory();
    }
  };

  const currentCategoryData = projectsData[currentCategory];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
      <section id="projects" className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Projects</h2>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-full p-1 shadow-lg">
            {projectsData.map((category, index) => (
              <Button
                key={category.id}
                onClick={() => {
                  setCurrentCategory(index);
                  setExpandedProject(category.projects[0].id);
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
              <div className="text-center mb-8 md:mb-12">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentCategoryData.color} text-white text-3xl mb-6 shadow-xl`}>
                  <currentCategoryData.icon />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{currentCategoryData.title}</h3>
                <p className="text-lg text-gray-600">{currentCategoryData.description}</p>
              </div>

              {/* Floating Project Cards Grid */}
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {currentCategoryData.projects.map((project, index) => {
                  const isExpanded = expandedProject === project.id;
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: isExpanded ? 1.05 : 1,
                        zIndex: isExpanded ? 10 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1,
                        scale: { duration: 0.2 }
                      }}
                      className={`relative ${isExpanded ? 'z-10' : 'z-0'}`}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                          isExpanded 
                            ? 'shadow-2xl ring-4 ring-blue-200 transform' 
                            : 'shadow-lg hover:shadow-xl'
                        }`}
                        onClick={() => setExpandedProject(isExpanded ? '' : project.id)}
                      >
                        <CardContent className="p-0">
                          {/* Card Header */}
                          <div className={`p-6 bg-gradient-to-r ${currentCategoryData.color} text-white`}>
                            <div className="flex items-center justify-between mb-3">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(project.difficulty)} text-gray-800`}>
                                {project.difficulty}
                              </span>
                              <div className="flex space-x-1">
                                {project.tech.slice(0, 3).map((tech) => (
                                  <span key={tech} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                            <p className="text-white/90 text-sm mb-2">{project.description}</p>
                            <p className="text-white/70 text-xs">by {project.author}</p>
                          </div>

                          {/* Card Content */}
                          <div className="p-6">
                            <AnimatePresence>
                              {isExpanded ? (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-4"
                                >
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-3">Key Features:</h5>
                                    <ul className="space-y-2">
                                      {project.features.map((feature, featureIndex) => (
                                        <motion.li 
                                          key={featureIndex}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: featureIndex * 0.1 }}
                                          className="flex items-start text-gray-600"
                                        >
                                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                          {feature}
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    <span className="text-sm font-medium text-gray-700">Tech Stack:</span>
                                    {project.tech.map((tech) => (
                                      <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="pt-4 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-2">
                                      <Button 
                                        size="sm"
                                        className={`bg-gradient-to-r ${currentCategoryData.color} hover:opacity-90`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Would link to actual demo
                                        }}
                                      >
                                        <Play className="w-4 h-4 mr-2" />
                                        View Demo
                                      </Button>
                                      <Button 
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Would link to actual code
                                        }}
                                      >
                                        <Github className="w-4 h-4 mr-2" />
                                        View Code
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-center py-4"
                                >
                                  <p className="text-gray-500 text-sm mb-4">Click to explore this project</p>
                                  <div className="text-2xl">🚀</div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <Button
              onClick={prevCategory}
              variant="outline"
              size="lg"
              className="rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            
            <div className="flex space-x-2">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCategory(index);
                    setExpandedProject(projectsData[index].projects[0].id);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentCategory === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextCategory}
              variant="outline"
              size="lg"
              className="rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Swipe Indicator */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Swipe left or right to explore different project categories
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
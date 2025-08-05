import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Code, BarChart, Globe, Github, Play } from "lucide-react";
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
    const [expandedProject, setExpandedProject] = useState(projectsData[0].projects[0].id);
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
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;
        if (offset.x > 100 || velocity.x > 500) {
            prevCategory();
        }
        else if (offset.x < -100 || velocity.x < -500) {
            nextCategory();
        }
    };
    const currentCategoryData = projectsData[currentCategory];
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Beginner": return "bg-green-100 text-green-800";
            case "Intermediate": return "bg-yellow-100 text-yellow-800";
            case "Advanced": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };
    return (_jsx("section", { id: "projects", className: "bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Student Projects" }), _jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Real-world applications built by our talented participants" })] }), _jsx("div", { className: "flex justify-center mb-8", children: _jsx("div", { className: "flex space-x-2 bg-white rounded-full p-1 shadow-lg", children: projectsData.map((category, index) => (_jsxs(Button, { onClick: () => {
                                setCurrentCategory(index);
                                setExpandedProject(category.projects[0].id);
                            }, variant: currentCategory === index ? "default" : "ghost", size: "sm", className: `rounded-full transition-all duration-300 ${currentCategory === index
                                ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                                : "text-gray-600 hover:text-gray-900"}`, children: [_jsx(category.icon, { className: "w-4 h-4 mr-2" }), category.title] }, category.id))) }) }), _jsxs("div", { className: "relative", ref: constraintsRef, children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 300 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -300 }, transition: { duration: 0.5, ease: "easeInOut" }, drag: "x", dragConstraints: constraintsRef, onDragEnd: handleDragEnd, className: "cursor-grab active:cursor-grabbing", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: `inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentCategoryData.color} text-white text-3xl mb-6 shadow-xl`, children: _jsx(currentCategoryData.icon, {}) }), _jsx("h3", { className: "text-3xl font-bold text-gray-900 mb-3", children: currentCategoryData.title }), _jsx("p", { className: "text-lg text-gray-600", children: currentCategoryData.description })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-6xl mx-auto", children: currentCategoryData.projects.map((project, index) => {
                                            const isExpanded = expandedProject === project.id;
                                            return (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, animate: {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: isExpanded ? 1.05 : 1,
                                                    zIndex: isExpanded ? 10 : 1
                                                }, transition: {
                                                    duration: 0.3,
                                                    delay: index * 0.1,
                                                    scale: { duration: 0.2 }
                                                }, className: `relative ${isExpanded ? 'z-10' : 'z-0'}`, children: _jsx(Card, { className: `cursor-pointer transition-all duration-300 overflow-hidden ${isExpanded
                                                        ? 'shadow-2xl ring-4 ring-blue-200 transform'
                                                        : 'shadow-lg hover:shadow-xl'}`, onClick: () => setExpandedProject(isExpanded ? '' : project.id), children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: `p-6 bg-gradient-to-r ${currentCategoryData.color} text-white`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: `text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(project.difficulty)} text-gray-800`, children: project.difficulty }), _jsx("div", { className: "flex space-x-1", children: project.tech.slice(0, 3).map((tech) => (_jsx("span", { className: "text-xs bg-white/20 px-2 py-1 rounded-full", children: tech }, tech))) })] }), _jsx("h4", { className: "text-xl font-bold mb-2", children: project.title }), _jsx("p", { className: "text-white/90 text-sm mb-2", children: project.description }), _jsxs("p", { className: "text-white/70 text-xs", children: ["by ", project.author] })] }), _jsx("div", { className: "p-6", children: _jsx(AnimatePresence, { children: isExpanded ? (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-gray-900 mb-3", children: "Key Features:" }), _jsx("ul", { className: "space-y-2", children: project.features.map((feature, featureIndex) => (_jsxs(motion.li, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: featureIndex * 0.1 }, className: "flex items-start text-gray-600", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" }), feature] }, featureIndex))) })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Tech Stack:" }), project.tech.map((tech) => (_jsx("span", { className: "text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: tech }, tech)))] }), _jsx("div", { className: "pt-4 border-t border-gray-200", children: _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs(Button, { size: "sm", className: `bg-gradient-to-r ${currentCategoryData.color} hover:opacity-90`, onClick: (e) => {
                                                                                                e.stopPropagation();
                                                                                                // Would link to actual demo
                                                                                            }, children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "View Demo"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: (e) => {
                                                                                                e.stopPropagation();
                                                                                                // Would link to actual code
                                                                                            }, children: [_jsx(Github, { className: "w-4 h-4 mr-2" }), "View Code"] })] }) })] })) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-4", children: [_jsx("p", { className: "text-gray-500 text-sm mb-4", children: "Click to explore this project" }), _jsx("div", { className: "text-2xl", children: "\uD83D\uDE80" })] })) }) })] }) }) }, project.id));
                                        }) })] }, currentCategory) }), _jsxs("div", { className: "flex justify-center items-center mt-12 space-x-6", children: [_jsx(Button, { onClick: prevCategory, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", children: _jsx(ArrowLeft, { className: "w-6 h-6" }) }), _jsx("div", { className: "flex space-x-2", children: projectsData.map((_, index) => (_jsx("button", { onClick: () => {
                                            setCurrentCategory(index);
                                            setExpandedProject(projectsData[index].projects[0].id);
                                        }, className: `w-3 h-3 rounded-full transition-all duration-300 ${currentCategory === index
                                            ? 'bg-blue-500 scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'}` }, index))) }), _jsx(Button, { onClick: nextCategory, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", children: _jsx(ArrowRight, { className: "w-6 h-6" }) })] }), _jsx("div", { className: "text-center mt-8", children: _jsx("p", { className: "text-sm text-gray-500", children: "Swipe left or right to explore different project categories" }) })] })] }) }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Code, BarChart, Users, Network, Database, ArrowRight, ArrowLeft, Clock, Trophy, Target } from "lucide-react";
const programSections = [
    {
        id: "foundations",
        title: "Digital Foundations",
        description: "Master the essential building blocks of modern technology",
        color: "from-blue-500 to-blue-700",
        icon: Monitor,
        duration: "Week 1-2",
        courses: [
            {
                id: "computer-literacy",
                title: "Computer Literacy",
                description: "Essential digital skills everyone needs",
                details: [
                    "File management and organization",
                    "Digital communication tools",
                    "Basic troubleshooting",
                    "Software installation and maintenance"
                ],
                icon: Monitor,
                level: "Beginner"
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
                icon: Network,
                level: "Intermediate"
            }
        ]
    },
    {
        id: "programming",
        title: "Programming & Development",
        description: "Build real applications with modern programming languages",
        color: "from-green-500 to-green-700",
        icon: Code,
        duration: "Week 3-4",
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
                icon: Code,
                level: "Beginner"
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
                icon: Database,
                level: "Intermediate"
            }
        ]
    },
    {
        id: "data-analysis",
        title: "Data Analysis & Research",
        description: "Transform raw data into meaningful insights",
        color: "from-purple-500 to-purple-700",
        icon: BarChart,
        duration: "Week 5-6",
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
                icon: BarChart,
                level: "Intermediate"
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
                icon: BarChart,
                level: "Advanced"
            }
        ]
    },
    {
        id: "collaboration",
        title: "Professional Skills",
        description: "Essential soft skills for the modern workplace",
        color: "from-orange-500 to-orange-700",
        icon: Users,
        duration: "Week 7-8",
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
                icon: Users,
                level: "All Levels"
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
                icon: Target,
                level: "All Levels"
            }
        ]
    }
];
export default function FloatingProgramsSection() {
    const [currentSection, setCurrentSection] = useState(0);
    const [expandedCourse, setExpandedCourse] = useState(programSections[0].courses[0].id);
    const constraintsRef = useRef(null);
    const nextSection = () => {
        const newSection = (currentSection + 1) % programSections.length;
        setCurrentSection(newSection);
        setExpandedCourse(programSections[newSection].courses[0].id);
    };
    const prevSection = () => {
        const newSection = (currentSection - 1 + programSections.length) % programSections.length;
        setCurrentSection(newSection);
        setExpandedCourse(programSections[newSection].courses[0].id);
    };
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;
        if (offset.x > 100 || velocity.x > 500) {
            prevSection();
        }
        else if (offset.x < -100 || velocity.x < -500) {
            nextSection();
        }
    };
    const currentProgram = programSections[currentSection];
    return (_jsx("section", { id: "programs", className: "bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Explore Our Programs" }), _jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Comprehensive learning paths designed to take you from beginner to professional" })] }), _jsx("div", { className: "flex justify-center mb-8", children: _jsx("div", { className: "flex space-x-2 bg-white rounded-full p-1 shadow-lg", children: programSections.map((section, index) => (_jsxs(Button, { onClick: () => {
                                setCurrentSection(index);
                                setExpandedCourse(section.courses[0].id);
                            }, variant: currentSection === index ? "default" : "ghost", size: "sm", className: `rounded-full transition-all duration-300 ${currentSection === index
                                ? `bg-gradient-to-r ${section.color} text-white shadow-md`
                                : "text-gray-600 hover:text-gray-900"}`, children: [_jsx(section.icon, { className: "w-4 h-4 mr-2" }), section.title] }, section.id))) }) }), _jsxs("div", { className: "relative", ref: constraintsRef, children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 300 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -300 }, transition: { duration: 0.5, ease: "easeInOut" }, drag: "x", dragConstraints: constraintsRef, onDragEnd: handleDragEnd, className: "cursor-grab active:cursor-grabbing", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: `inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentProgram.color} text-white text-3xl mb-6 shadow-xl`, children: _jsx(currentProgram.icon, {}) }), _jsx("h3", { className: "text-3xl font-bold text-gray-900 mb-3", children: currentProgram.title }), _jsx("p", { className: "text-lg text-gray-600 mb-4", children: currentProgram.description }), _jsxs("div", { className: "flex items-center justify-center space-x-4 text-sm text-gray-500", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Clock, { className: "w-4 h-4 mr-1" }), currentProgram.duration] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Trophy, { className: "w-4 h-4 mr-1" }), currentProgram.courses.length, " Courses"] })] })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-6xl mx-auto", children: currentProgram.courses.map((course, index) => {
                                            const isExpanded = expandedCourse === course.id;
                                            const IconComponent = course.icon;
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
                                                        : 'shadow-lg hover:shadow-xl'}`, onClick: () => setExpandedCourse(isExpanded ? '' : course.id), children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: `p-6 bg-gradient-to-r ${currentProgram.color} text-white`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx(IconComponent, { className: "w-8 h-8" }), _jsx("span", { className: "text-xs font-medium bg-white/20 px-2 py-1 rounded-full", children: course.level })] }), _jsx("h4", { className: "text-xl font-bold mb-2", children: course.title }), _jsx("p", { className: "text-white/90 text-sm", children: course.description })] }), _jsx("div", { className: "p-6", children: _jsx(AnimatePresence, { children: isExpanded ? (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, className: "space-y-4", children: [_jsx("h5", { className: "font-semibold text-gray-900 mb-3", children: "What you'll learn:" }), _jsx("ul", { className: "space-y-2", children: course.details.map((detail, detailIndex) => (_jsxs(motion.li, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: detailIndex * 0.1 }, className: "flex items-start text-gray-600", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" }), detail] }, detailIndex))) }), _jsx("div", { className: "pt-4 border-t border-gray-200", children: _jsxs(Button, { className: `w-full bg-gradient-to-r ${currentProgram.color} hover:opacity-90`, onClick: (e) => {
                                                                                        var _a;
                                                                                        e.stopPropagation();
                                                                                        (_a = document.getElementById('registration')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
                                                                                    }, children: ["Enroll in this course", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] })) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-4", children: [_jsx("p", { className: "text-gray-500 text-sm mb-4", children: "Click to explore this course" }), _jsx("div", { className: "text-2xl", children: "\uD83D\uDC46" })] })) }) })] }) }) }, course.id));
                                        }) })] }, currentSection) }), _jsxs("div", { className: "flex justify-center items-center mt-12 space-x-6", children: [_jsx(Button, { onClick: prevSection, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", children: _jsx(ArrowLeft, { className: "w-6 h-6" }) }), _jsx("div", { className: "flex space-x-2", children: programSections.map((_, index) => (_jsx("button", { onClick: () => {
                                            setCurrentSection(index);
                                            setExpandedCourse(programSections[index].courses[0].id);
                                        }, className: `w-3 h-3 rounded-full transition-all duration-300 ${currentSection === index
                                            ? 'bg-blue-500 scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'}` }, index))) }), _jsx(Button, { onClick: nextSection, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", children: _jsx(ArrowRight, { className: "w-6 h-6" }) })] }), _jsx("div", { className: "text-center mt-8", children: _jsx("p", { className: "text-sm text-gray-500", children: "Swipe left or right to explore different program tracks" }) })] })] }) }));
}

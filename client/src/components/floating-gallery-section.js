import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera, Users, Code, Trophy, Maximize2 } from "lucide-react";
import computerLiteracyImg from "@assets/computer literacy photo_1753673323506.png";
import dataAnalysisImg from "@assets/Data Analysis session_1753673323505.jpg";
import teamCollabImg from "@assets/Team collaboration_1753673323494.jpg";
import teamLearningImg from "@assets/Team learning_1753673323494.jpg";
import spssImg from "@assets/spss_1753673323495.jpg";
const galleryData = [
    {
        id: "workshops",
        title: "Hands-on Workshops",
        description: "Interactive learning sessions with practical applications",
        color: "from-blue-500 to-blue-700",
        icon: Code,
        images: [
            {
                id: "computer-literacy",
                src: computerLiteracyImg,
                title: "Computer Literacy Session",
                description: "Students learning essential digital skills with personalized instruction and hands-on practice",
                category: "Digital Skills"
            },
            {
                id: "data-analysis",
                src: dataAnalysisImg,
                title: "Data Analysis Workshop",
                description: "Advanced Excel and statistical analysis training with real-world datasets",
                category: "Data Analysis"
            },
            {
                id: "spss-training",
                src: spssImg,
                title: "SPSS Training Session",
                description: "Professional statistical software training for research applications",
                category: "Statistical Analysis"
            }
        ]
    },
    {
        id: "collaboration",
        title: "Team Collaboration",
        description: "Building teamwork and leadership skills",
        color: "from-green-500 to-green-700",
        icon: Users,
        images: [
            {
                id: "team-collab",
                src: teamCollabImg,
                title: "Team Collaboration",
                description: "Students working together on group projects and problem-solving exercises",
                category: "Teamwork"
            },
            {
                id: "team-learning",
                src: teamLearningImg,
                title: "Collaborative Learning",
                description: "Peer-to-peer learning sessions fostering knowledge sharing and mutual support",
                category: "Learning"
            },
            {
                id: "presentation",
                src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Project Presentations",
                description: "Students presenting their final projects and demonstrating skills learned",
                category: "Presentations"
            }
        ]
    },
    {
        id: "achievements",
        title: "Success Stories",
        description: "Celebrating milestones and achievements",
        color: "from-purple-500 to-purple-700",
        icon: Trophy,
        images: [
            {
                id: "graduation",
                src: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Graduation Ceremony",
                description: "Celebrating the completion of UBa Tech Camp 2025 with certificates and recognition",
                category: "Graduation"
            },
            {
                id: "project-showcase",
                src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Project Showcase",
                description: "Final project demonstrations showcasing technical skills and innovation",
                category: "Projects"
            },
            {
                id: "networking",
                src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Networking Events",
                description: "Professional networking opportunities with industry leaders and alumni",
                category: "Networking"
            }
        ]
    }
];
export default function FloatingGallerySection() {
    const [currentGallery, setCurrentGallery] = useState(0);
    const [expandedImage, setExpandedImage] = useState(galleryData[0].images[0].id);
    const [selectedImage, setSelectedImage] = useState(null);
    const constraintsRef = useRef(null);
    const nextGallery = () => {
        const newGallery = (currentGallery + 1) % galleryData.length;
        setCurrentGallery(newGallery);
        setExpandedImage(galleryData[newGallery].images[0].id);
    };
    const prevGallery = () => {
        const newGallery = (currentGallery - 1 + galleryData.length) % galleryData.length;
        setCurrentGallery(newGallery);
        setExpandedImage(galleryData[newGallery].images[0].id);
    };
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;
        if (offset.x > 100 || velocity.x > 500) {
            prevGallery();
        }
        else if (offset.x < -100 || velocity.x < -500) {
            nextGallery();
        }
    };
    const currentGalleryData = galleryData[currentGallery];
    return (_jsxs("section", { id: "gallery", className: "bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Gallery" }), _jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Capturing moments of learning, collaboration, and achievement" })] }), _jsx("div", { className: "flex justify-center mb-8", children: _jsx("div", { className: "flex space-x-2 bg-white rounded-full p-1 shadow-lg", children: galleryData.map((gallery, index) => (_jsxs(Button, { onClick: () => {
                                    setCurrentGallery(index);
                                    setExpandedImage(gallery.images[0].id);
                                }, variant: currentGallery === index ? "default" : "ghost", size: "sm", className: `rounded-full transition-all duration-300 ${currentGallery === index
                                    ? `bg-gradient-to-r ${gallery.color} text-white shadow-md`
                                    : "text-gray-600 hover:text-gray-900"}`, children: [_jsx(gallery.icon, { className: "w-4 h-4 mr-2" }), gallery.title] }, gallery.id))) }) }), _jsxs("div", { className: "relative", ref: constraintsRef, children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 300 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -300 }, transition: { duration: 0.5, ease: "easeInOut" }, drag: "x", dragConstraints: constraintsRef, onDragEnd: handleDragEnd, className: "cursor-grab active:cursor-grabbing", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: `inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentGalleryData.color} text-white text-3xl mb-6 shadow-xl`, children: _jsx(currentGalleryData.icon, {}) }), _jsx("h3", { className: "text-3xl font-bold text-gray-900 mb-3", children: currentGalleryData.title }), _jsx("p", { className: "text-lg text-gray-600", children: currentGalleryData.description })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto", children: currentGalleryData.images.map((image, index) => {
                                                const isExpanded = expandedImage === image.id;
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
                                                            : 'shadow-lg hover:shadow-xl'}`, onClick: () => setExpandedImage(isExpanded ? '' : image.id), children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: "relative group", children: [_jsx("img", { src: image.src, alt: image.title, className: "w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" }), _jsx("div", { className: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center", children: _jsx(Camera, { className: "text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" }) }), _jsx("div", { className: `absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${currentGalleryData.color}`, children: image.category })] }), _jsxs("div", { className: "p-6", children: [_jsx("h4", { className: "text-lg font-bold text-gray-900 mb-2", children: image.title }), _jsx("p", { className: "text-gray-600 text-sm mb-4", children: image.description }), _jsx(AnimatePresence, { children: isExpanded ? (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, className: "space-y-4", children: _jsx("div", { className: "border-t border-gray-200 pt-4", children: _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { size: "sm", className: `flex-1 bg-gradient-to-r ${currentGalleryData.color} hover:opacity-90`, onClick: (e) => {
                                                                                                    e.stopPropagation();
                                                                                                    setSelectedImage(image);
                                                                                                }, children: [_jsx(Maximize2, { className: "w-4 h-4 mr-2" }), "View Full Size"] }), _jsx(Button, { size: "sm", variant: "outline", onClick: (e) => {
                                                                                                    var _a;
                                                                                                    e.stopPropagation();
                                                                                                    (_a = document.getElementById('registration')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
                                                                                                }, children: "Join Us" })] }) }) })) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-4", children: [_jsx("p", { className: "text-gray-500 text-sm mb-4", children: "Click to view details" }), _jsx("div", { className: "text-2xl", children: "\uD83D\uDCF8" })] })) })] })] }) }) }, image.id));
                                            }) })] }, currentGallery) }), _jsxs("div", { className: "flex justify-center items-center mt-12 space-x-6", children: [_jsx(Button, { onClick: prevGallery, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", children: _jsx(ArrowLeft, { className: "w-6 h-6" }) }), _jsx("div", { className: "flex space-x-2", children: galleryData.map((_, index) => (_jsx("button", { onClick: () => {
                                                setCurrentGallery(index);
                                                setExpandedImage(galleryData[index].images[0].id);
                                            }, className: `w-3 h-3 rounded-full transition-all duration-300 ${currentGallery === index
                                                ? 'bg-blue-500 scale-125'
                                                : 'bg-gray-300 hover:bg-gray-400'}` }, index))) }), _jsx(Button, { onClick: nextGallery, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", children: _jsx(ArrowRight, { className: "w-6 h-6" }) })] }), _jsx("div", { className: "text-center mt-8", children: _jsx("p", { className: "text-sm text-gray-500", children: "Swipe left or right to explore different gallery categories" }) })] })] }), _jsx(AnimatePresence, { children: selectedImage && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4", onClick: () => setSelectedImage(null), children: _jsxs(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.8, opacity: 0 }, className: "relative max-w-4xl max-h-full", onClick: (e) => e.stopPropagation(), children: [_jsx("img", { src: selectedImage.src, alt: selectedImage.title, className: "max-w-full max-h-full object-contain rounded-lg" }), _jsx(Button, { variant: "ghost", size: "sm", className: "absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30", onClick: () => setSelectedImage(null), children: "\u2715" }), _jsxs("div", { className: "absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-lg", children: [_jsx("h4", { className: "font-bold mb-1", children: selectedImage.title }), _jsx("p", { className: "text-sm", children: selectedImage.description })] })] }) })) })] }));
}

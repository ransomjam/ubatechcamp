import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Star, Quote, Users, Briefcase, GraduationCap, MessageSquare, Plus } from "lucide-react";
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
export default function FloatingTestimonialsSection() {
    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const constraintsRef = useRef(null);
    // Fetch real testimonials from the database
    const { data: apiResponse } = useQuery({
        queryKey: ["/api/testimonials"],
    });
    // Use only real testimonials from the database
    const testimonials = ((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.data) || []).map((t) => ({
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
    // Define helper function first
    const getFilteredTestimonials = (filter) => {
        // Filter real testimonials based on graduation year and role
        const filtered = testimonials.filter((testimonial) => {
            // Check both isApproved and is_approved fields for backward compatibility
            const isApproved = testimonial.isApproved || testimonial.is_approved;
            if (!isApproved)
                return false;
            // Only show testimonials with actual content (minimum 3 characters)
            if (!testimonial.testimonialText || testimonial.testimonialText.trim().length < 3) {
                return false;
            }
            if (filter === "recent") {
                return parseInt(testimonial.graduationYear || "2024") >= 2024;
            }
            else if (filter === "career") {
                return testimonial.currentRole !== "Student" && testimonial.currentRole !== "";
            }
            else if (filter === "experience") {
                return true; // All approved testimonials with content can be shown in experience
            }
            return false;
        });
        console.log(`Filtered testimonials for ${filter}:`, filtered);
        return filtered;
    };
    // Get current category data
    const currentCategoryData = testimonialCategories[currentCategory];
    const currentTestimonials = getFilteredTestimonials(currentCategoryData.filter);
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
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;
        if (offset.x > 100 || velocity.x > 500) {
            prevTestimonial();
        }
        else if (offset.x < -100 || velocity.x < -500) {
            nextTestimonial();
        }
    };
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (_jsx(Star, { className: `w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}` }, index)));
    };
    return (_jsxs("section", { id: "testimonials", className: "bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Alumni Voices" }), _jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Success stories and experiences from our amazing community" })] }), _jsx("div", { className: "flex justify-center mb-8", children: _jsxs("div", { className: "flex space-x-2 bg-white rounded-full p-1 shadow-lg", children: [testimonialCategories.map((category, index) => (_jsxs(Button, { onClick: () => {
                                        setCurrentCategory(index);
                                        setCurrentTestimonialIndex(0);
                                    }, variant: currentCategory === index ? "default" : "ghost", size: "sm", className: `rounded-full transition-all duration-300 ${currentCategory === index
                                        ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                                        : "text-gray-600 hover:text-gray-900"}`, children: [_jsx(category.icon, { className: "w-4 h-4 mr-2" }), category.title] }, category.id))), _jsxs(Button, { onClick: () => setShowForm(true), variant: "ghost", size: "sm", className: "rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Share Your Story"] })] }) }), _jsxs("div", { className: "relative", ref: constraintsRef, children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 300 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -300 }, transition: { duration: 0.5, ease: "easeInOut" }, drag: "x", dragConstraints: constraintsRef, onDragEnd: handleDragEnd, className: "cursor-grab active:cursor-grabbing", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: `inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentCategoryData.color} text-white text-3xl mb-6 shadow-xl`, children: _jsx(currentCategoryData.icon, {}) }), _jsx("h3", { className: "text-3xl font-bold text-gray-900 mb-3", children: currentCategoryData.title }), _jsx("p", { className: "text-lg text-gray-600", children: currentCategoryData.description })] }), _jsx("div", { className: "relative max-w-4xl mx-auto", children: _jsx(AnimatePresence, { mode: "wait", children: currentTestimonials.length > 0 ? (_jsx(motion.div, { initial: { opacity: 0, x: 300 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -300 }, transition: { duration: 0.4, ease: "easeInOut" }, drag: "x", dragConstraints: constraintsRef, onDragEnd: handleDragEnd, className: "cursor-grab active:cursor-grabbing", children: (() => {
                                                        const testimonial = currentTestimonials[currentTestimonialIndex];
                                                        if (!testimonial)
                                                            return null;
                                                        return (_jsx(Card, { className: "shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden max-w-2xl mx-auto", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: `p-8 bg-gradient-to-r ${currentCategoryData.color} text-white relative`, children: [_jsx(Quote, { className: "absolute top-6 right-6 w-12 h-12 text-white/20" }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsx("img", { src: testimonial.photoUrl, alt: testimonial.fullName || "Alumni", className: "w-20 h-20 rounded-full object-cover border-4 border-white/20" }), _jsxs("div", { children: [_jsx("h4", { className: "text-2xl font-bold mb-1", children: testimonial.fullName }), _jsx("p", { className: "text-white/90 text-lg", children: testimonial.currentRole }), _jsx("p", { className: "text-white/70 text-sm", children: testimonial.company })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-6", children: [_jsx("div", { className: "flex", children: renderStars(5) }), _jsx("span", { className: "text-white/70 text-sm", children: testimonial.graduationYear })] })] }), _jsxs("div", { className: "p-8", children: [_jsxs("p", { className: "text-gray-700 text-lg mb-6 leading-relaxed", children: ["\"", testimonial.testimonialText, "\""] }), testimonial.faculty && (_jsxs("div", { className: "border-t border-gray-200 pt-6 mb-6", children: [_jsx("h5", { className: "font-semibold text-gray-900 mb-2", children: "Faculty:" }), _jsx("span", { className: "text-gray-700", children: testimonial.faculty })] })), _jsx("div", { className: "pt-4", children: _jsxs(Button, { className: `w-full bg-gradient-to-r ${currentCategoryData.color} hover:opacity-90`, onClick: () => setShowForm(true), size: "lg", children: ["Share Your Story Too", _jsx(MessageSquare, { className: "w-5 h-5 ml-2" })] }) })] })] }) }));
                                                    })() }, `${currentCategory}-${currentTestimonialIndex}`)) : (_jsx("div", { className: "text-center py-12", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto", children: [_jsx(MessageSquare, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No Stories Yet" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Be the first to share your experience in this category!" }), _jsxs(Button, { onClick: () => setShowForm(true), className: `bg-gradient-to-r ${currentCategoryData.color} hover:opacity-90`, children: ["Share Your Story", _jsx(Plus, { className: "w-4 h-4 ml-2" })] })] }) })) }) })] }, currentCategory) }), _jsxs("div", { className: "flex justify-center items-center mt-12 space-x-6", children: [_jsx(Button, { onClick: prevTestimonial, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", disabled: currentTestimonials.length <= 1, children: _jsx(ArrowLeft, { className: "w-6 h-6" }) }), _jsx("div", { className: "flex space-x-2", children: currentTestimonials.map((_, index) => (_jsx("button", { onClick: () => setCurrentTestimonialIndex(index), className: `w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonialIndex === index
                                                ? 'bg-blue-500 scale-125'
                                                : 'bg-gray-300 hover:bg-gray-400'}` }, index))) }), _jsx(Button, { onClick: nextTestimonial, variant: "outline", size: "lg", className: "rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300", disabled: currentTestimonials.length <= 1, children: _jsx(ArrowRight, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "flex justify-center items-center mt-8 space-x-4", children: [_jsxs(Button, { onClick: prevCategory, variant: "ghost", size: "sm", className: "text-gray-600 hover:text-gray-900", children: [_jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }), "Previous Category"] }), _jsx("div", { className: "flex space-x-1", children: testimonialCategories.map((_, index) => (_jsx("button", { onClick: () => {
                                                setCurrentCategory(index);
                                                setCurrentTestimonialIndex(0);
                                            }, className: `w-2 h-2 rounded-full transition-all duration-300 ${currentCategory === index
                                                ? 'bg-blue-500'
                                                : 'bg-gray-300 hover:bg-gray-400'}` }, index))) }), _jsxs(Button, { onClick: nextCategory, variant: "ghost", size: "sm", className: "text-gray-600 hover:text-gray-900", children: ["Next Category", _jsx(ChevronRight, { className: "w-4 h-4 ml-1" })] })] }), _jsx("div", { className: "text-center mt-6", children: _jsx("p", { className: "text-sm text-gray-500", children: "Swipe left or right to read different testimonials within this category" }) })] })] }), _jsx(AnimatePresence, { children: showForm && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", onClick: () => setShowForm(false), children: _jsx(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, className: "bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900", children: "Share Your Experience" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowForm(false), children: "\u2715" })] }), _jsx(TestimonialForm, { onSuccess: () => setShowForm(false) })] }) }) })) })] }));
}

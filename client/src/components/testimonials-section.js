import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TestimonialsDisplay } from "@/components/testimonials-display";
import { TestimonialForm } from "@/components/testimonial-form";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
// Keep some static testimonials as examples while building the dynamic system
const staticTestimonials = [
    {
        quote: "UBa Tech Camp's Excel workshops gave me the confidence to analyze company data at my internship.",
        name: "Amina",
        cohort: "2024 Cohort",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100"
    },
    {
        quote: "The SPSS training demystified statistics for my research project.",
        name: "Paul",
        cohort: "2024 Cohort",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
        quote: "Learning Python here saved me hours of manual work.",
        name: "Grace",
        cohort: "2024 Cohort",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
];
export default function TestimonialsSection() {
    return (_jsx("section", { id: "testimonials", className: "bg-gray-50 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Alumni Voices" }), _jsx("p", { className: "text-lg text-gray-600 mb-6", children: "Hear from our successful graduates and share your own story" }), _jsx("div", { className: "flex justify-center mb-8", children: _jsx(TestimonialForm, {}) })] }), _jsx("div", { className: "mb-12", children: _jsx(TestimonialsDisplay, { showTitle: false }) }), _jsxs("div", { className: "border-t border-gray-200 pt-12", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "Featured Stories" }), _jsx("p", { className: "text-gray-600", children: "Highlights from our 2024 graduates" })] }), _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", children: staticTestimonials.map((testimonial, index) => (_jsxs(Card, { className: "p-6 hover:shadow-lg transition-shadow duration-300", children: [_jsx("div", { className: "flex items-center mb-4", children: _jsx(Quote, { className: "text-blue-500 h-6 w-6" }) }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["\"", testimonial.quote, "\""] }), _jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: testimonial.image, alt: testimonial.name, className: "w-12 h-12 rounded-full mr-4 object-cover" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900", children: testimonial.name }), _jsx("p", { className: "text-sm text-gray-600", children: testimonial.cohort })] })] })] }, index))) })] })] }) }));
}

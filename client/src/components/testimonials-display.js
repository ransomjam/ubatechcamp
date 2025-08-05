import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Quote } from "lucide-react";
export function TestimonialsDisplay({ limit, showTitle = true }) {
    const { data: response, isLoading } = useQuery({
        queryKey: ["/api/testimonials"],
    });
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 3 }).map((_, i) => (_jsx(Card, { className: "animate-pulse", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-full" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded w-32" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-24" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded" }), _jsx("div", { className: "h-3 bg-gray-200 rounded" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-3/4" })] })] }) }, i))) }));
    }
    const testimonials = (response === null || response === void 0 ? void 0 : response.data) || [];
    const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials;
    if (testimonials.length === 0) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx(Quote, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-600 mb-2", children: "No testimonials yet" }), _jsx("p", { className: "text-gray-500", children: "Be the first alumni to share your experience!" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [showTitle && (_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Alumni Voices" }), _jsx("p", { className: "text-gray-600", children: "Real stories from UBa Tech Camp graduates" })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: displayedTestimonials.map((testimonial) => (_jsx(TestimonialCard, { testimonial: testimonial }, testimonial.id))) })] }));
}
function TestimonialCard({ testimonial }) {
    const initials = testimonial.fullName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    return (_jsx(Card, { className: "h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-start gap-3 mb-4", children: [_jsxs(Avatar, { className: "w-12 h-12", children: [_jsx(AvatarImage, { src: testimonial.photoUrl || undefined, alt: testimonial.fullName }), _jsx(AvatarFallback, { className: "bg-blue-100 text-blue-600 font-semibold", children: initials })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-semibold text-gray-900 truncate", children: testimonial.fullName }), _jsxs("p", { className: "text-sm text-gray-600 mb-1", children: ["Class of ", testimonial.graduationYear] }), _jsx(Badge, { variant: "outline", className: "text-xs", children: testimonial.faculty })] }), testimonial.linkedinUrl && (_jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "p-2", children: _jsx("a", { href: testimonial.linkedinUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": `View ${testimonial.fullName}'s LinkedIn profile`, children: _jsx(Linkedin, { className: "w-4 h-4 text-blue-600" }) }) }))] }), _jsxs("div", { className: "relative", children: [_jsx(Quote, { className: "w-6 h-6 text-blue-200 absolute -top-2 -left-2" }), _jsx("blockquote", { className: "text-gray-700 text-sm leading-relaxed pl-4", children: testimonial.testimonialText })] }), (testimonial.currentRole || testimonial.company) && (_jsx("div", { className: "mt-4 pt-4 border-t border-gray-100", children: _jsxs("p", { className: "text-xs text-gray-500", children: [testimonial.currentRole && (_jsx("span", { className: "font-medium", children: testimonial.currentRole })), testimonial.currentRole && testimonial.company && (_jsx("span", { children: " at " })), testimonial.company && (_jsx("span", { className: "font-medium", children: testimonial.company }))] }) }))] }) }));
}

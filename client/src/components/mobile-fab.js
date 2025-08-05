import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Home, BookOpen, Users, Camera, MessageSquare, Phone, UserPlus } from "lucide-react";
export default function MobileFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };
    const quickActions = [
        { id: 'register', label: 'Register', icon: UserPlus, color: 'bg-primary' },
        { id: 'contact', label: 'Contact', icon: Phone, color: 'bg-green-600' },
        { id: 'testimonials', label: 'Alumni', icon: MessageSquare, color: 'bg-yellow-600' },
        { id: 'gallery', label: 'Gallery', icon: Camera, color: 'bg-purple-600' },
        { id: 'team', label: 'Team', icon: Users, color: 'bg-blue-600' },
        { id: 'learn', label: 'Learn', icon: BookOpen, color: 'bg-orange-600' },
        { id: 'home', label: 'Home', icon: Home, color: 'bg-gray-600' },
    ];
    return (_jsxs("div", { className: "fixed bottom-6 right-6 z-50 lg:hidden", children: [_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "mb-4 space-y-3", children: quickActions.map((action, index) => {
                        const IconComponent = action.icon;
                        return (_jsxs(motion.div, { initial: { opacity: 0, x: 20, scale: 0.5 }, animate: {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                transition: { delay: index * 0.1 }
                            }, exit: {
                                opacity: 0,
                                x: 20,
                                scale: 0.5,
                                transition: { delay: (quickActions.length - index) * 0.05 }
                            }, className: "flex items-center gap-3", children: [_jsx("span", { className: "bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-900 whitespace-nowrap", children: action.label }), _jsx(Button, { onClick: () => scrollToSection(action.id), className: `${action.color} hover:opacity-90 w-12 h-12 rounded-full shadow-lg`, size: "sm", children: _jsx(IconComponent, { className: "h-5 w-5 text-white" }) })] }, action.id));
                    }) })) }), _jsx(Button, { onClick: () => setIsOpen(!isOpen), className: `w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${isOpen
                    ? 'bg-red-600 hover:bg-red-700 rotate-45'
                    : 'bg-primary hover:bg-blue-700'}`, size: "sm", children: isOpen ? (_jsx(X, { className: "h-6 w-6 text-white" })) : (_jsx(Plus, { className: "h-6 w-6 text-white" })) })] }));
}

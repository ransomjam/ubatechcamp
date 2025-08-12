import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, Facebook, Mail } from "lucide-react";
import founderImage from "@assets/Founder_1753708699510.jpg";
import coFounderImage from "@assets/Co founder_1753673323506.jpg";
import profAnongImage from "@assets/Prof Anong_1753743173746.jpg";
import princewillImage from "@assets/add_princewill.png";
import desmondImage from "@assets/add_desmond.JPG";
import malesImage from "@assets/add_Males.jpg";
import blaiseImage from "@assets/add_blaise.jpg";
import yveImage from "@assets/add_yve.jpg";
const leadership = [
    {
        name: "Jam Ransom",
        role: "Founder",
        description: "Visionary leader driving digital education innovation at University of Bamenda",
        image: founderImage,
        social: {
            linkedin: "https://linkedin.com/in/jam-ransom",
            facebook: "https://facebook.com/jam.ransom",
            email: "jam.ransom@ubatechcamp.com"
        }
    },
    {
        name: "Abongni Musuh",
        role: "Co-Founder",
        description: "Strategic partner in building comprehensive tech education programs",
        image: coFounderImage,
        social: {
            linkedin: "https://linkedin.com/in/abongni-musuh",
            facebook: "https://facebook.com/abongni.musuh",
            email: "abongni.musuh@ubatechcamp.com"
        }
    },
    {
        name: "Prof. Anong Damian",
        role: "University Collaborator",
        description: "Director of Student Affairs, University of Bamenda",
        subtitle: "Department of Biological Sciences, Faculty of Science",
        image: profAnongImage,
        social: {
            linkedin: "https://linkedin.com/in/prof-anong-damian",
            email: "anong.damian@uniba.edu.cm"
        }
    }
];
const trainers = [
    {
        name: "Angu Princewill Fon",
        role: "Data Analysis Trainer",
        description: "Specialist in statistical analysis and data visualization techniques",
        image: princewillImage,
        social: {
            linkedin: "https://linkedin.com/in/angu-princewill",
            facebook: "https://facebook.com/angu.princewill",
            email: "angu.princewill@ubatechcamp.com"
        }
    },
    {
        name: "Yembi Desmond",
        role: "Excel Trainer",
        description: "Expert in advanced Excel functions and business analytics",
        image: desmondImage,
        social: {
            linkedin: "https://linkedin.com/in/yembi-desmond",
            facebook: "https://facebook.com/yembi.desmond",
            email: "yembi.desmond@ubatechcamp.com"
        }
    },
    {
        name: "Males Lambe Prosperous",
        role: "Computer Networking Trainer",
        description: "Electrical | Network Engineer",
        image: malesImage
    }
];
const studentLeaders = [
    {
        name: "Nanguat Blaise",
        role: "Student Leader",
        description: "SA President NAHPISA, 2023/2024",
        image: blaiseImage,
        social: {
            linkedin: "https://linkedin.com/in/nanguat-blaise",
            facebook: "https://facebook.com/nanguat.blaise",
            email: "nanguat.blaise@students.uniba.edu.cm"
        }
    },
    {
        name: "Kadjo Yve",
        role: "Student Leader",
        description: "SA President, FEMSSA 2023/2024",
        image: yveImage,
        social: {
            linkedin: "https://linkedin.com/in/kadjo-yve",
            facebook: "https://facebook.com/kadjo.yve",
            email: "kadjo.yve@students.uniba.edu.cm"
        }
    }
];
const teamCategories = [
    { id: "leadership", name: "Leadership", members: leadership },
    { id: "trainers", name: "Training Team", members: trainers },
    { id: "students", name: "Student Leaders", members: studentLeaders }
];
export default function TeamSection() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentCategory = teamCategories[activeCategory];
    const totalMembers = currentCategory.members.length;
    const membersPerPage = 3;
    const totalPages = Math.ceil(totalMembers / membersPerPage);
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };
    const getCurrentMembers = () => {
        const start = currentIndex * membersPerPage;
        return currentCategory.members.slice(start, start + membersPerPage);
    };
    const switchCategory = (categoryIndex) => {
        setActiveCategory(categoryIndex);
        setCurrentIndex(0);
    };
    return (_jsx("section", { id: "team", className: "bg-gray-50 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Meet Our Team" }), _jsx("p", { className: "text-lg text-gray-600", children: "Dedicated professionals committed to your success" })] }), _jsx("div", { className: "flex justify-center mb-8", children: _jsx("div", { className: "bg-white rounded-lg p-1 shadow-md", children: teamCategories.map((category, index) => (_jsx(Button, { onClick: () => switchCategory(index), variant: activeCategory === index ? "default" : "ghost", size: "sm", className: `mx-1 transition-all duration-200 ${activeCategory === index
                                ? "bg-primary text-white shadow-sm"
                                : "text-gray-600 hover:text-primary"}`, children: category.name }, category.id))) }) }), _jsxs("div", { className: "relative", children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 }, transition: { duration: 0.3 }, className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto", children: getCurrentMembers().map((member, index) => (_jsxs(Card, { className: "p-6 text-center hover:shadow-lg transition-shadow duration-300", children: [_jsx("img", { src: member.image, alt: member.name, className: "w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100" }), _jsx("h4", { className: "text-xl font-semibold text-gray-900 mb-1", children: member.name }), _jsx("p", { className: `font-medium mb-2 ${activeCategory === 0 ? "text-primary" :
                                                activeCategory === 1 ? "text-blue-700" : "text-yellow-600"}`, children: member.role }), _jsx("p", { className: "text-gray-600 text-sm mb-3", children: member.description }), "subtitle" in member && member.subtitle && (_jsx("p", { className: "text-xs text-gray-500 mb-3", children: member.subtitle })), "social" in member && member.social && (_jsxs("div", { className: "flex justify-center space-x-3 mt-4", children: [member.social.linkedin && (_jsx(Button, { variant: "ghost", size: "sm", className: "p-2 hover:bg-blue-50 hover:text-blue-600", asChild: true, children: _jsx("a", { href: member.social.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": `View ${member.name}'s LinkedIn profile`, children: _jsx(Linkedin, { className: "h-4 w-4" }) }) })), member.social.facebook && (_jsx(Button, { variant: "ghost", size: "sm", className: "p-2 hover:bg-blue-50 hover:text-blue-600", asChild: true, children: _jsx("a", { href: member.social.facebook, target: "_blank", rel: "noopener noreferrer", "aria-label": `View ${member.name}'s Facebook profile`, children: _jsx(Facebook, { className: "h-4 w-4" }) }) })), member.social.email && (_jsx(Button, { variant: "ghost", size: "sm", className: "p-2 hover:bg-gray-50 hover:text-gray-600", asChild: true, children: _jsx("a", { href: `mailto:${member.social.email}`, "aria-label": `Send email to ${member.name}`, children: _jsx(Mail, { className: "h-4 w-4" }) }) }))] }))] }, `${member.name}-${index}`))) }, `${activeCategory}-${currentIndex}`) }), totalPages > 1 && (_jsxs("div", { className: "flex justify-center items-center mt-6 space-x-4", children: [_jsx(Button, { onClick: prevSlide, variant: "outline", size: "sm", className: "rounded-full p-2", children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsx("div", { className: "flex space-x-2", children: Array.from({ length: totalPages }).map((_, index) => (_jsx("button", { onClick: () => setCurrentIndex(index), className: `w-2 h-2 rounded-full transition-colors ${currentIndex === index ? "bg-primary" : "bg-gray-300"}` }, index))) }), _jsx(Button, { onClick: nextSlide, variant: "outline", size: "sm", className: "rounded-full p-2", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] }))] })] }) }));
}

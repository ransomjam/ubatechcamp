import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart, Code } from "lucide-react";
const projects = [
    {
        title: "Market Analysis Dashboard",
        description: "Interactive Excel & Power BI report visualizing real sales data trends. Built by a team of 3 students from FHS, COLTECH, NAHPI.",
        icon: TrendingUp,
        badges: ["Excel", "Power BI"],
        badgeColors: ["bg-primary", "bg-blue-700"]
    },
    {
        title: "Community Survey Report",
        description: "SPSS-driven analysis of a local health survey with clear, actionable insights for community health improvement.",
        icon: BarChart,
        badges: ["SPSS", "Research"],
        badgeColors: ["bg-green-600", "bg-yellow-600"]
    },
    {
        title: "Automation Script",
        description: "Python script automating routine data entry and report generation tasks, saving hours of manual work weekly.",
        icon: Code,
        badges: ["Python", "Automation"],
        badgeColors: ["bg-yellow-500", "bg-gray-600"]
    }
];
export default function ProjectsSection() {
    return (_jsx("section", { id: "projects", className: "bg-white py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Capstone Projects" }), _jsx("p", { className: "text-lg text-gray-600", children: "Real-world applications developed by our participants" })] }), _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", children: projects.map((project, index) => {
                        const IconComponent = project.icon;
                        return (_jsxs(Card, { className: "p-6", children: [_jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary text-white", children: _jsx(IconComponent, { className: "h-6 w-6" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: project.title }), _jsx("p", { className: "text-gray-600 mb-4", children: project.description }), _jsx("div", { className: "flex gap-2", children: project.badges.map((badge, badgeIndex) => (_jsx(Badge, { className: `${project.badgeColors[badgeIndex]} text-white`, children: badge }, badgeIndex))) })] }, index));
                    }) })] }) }));
}

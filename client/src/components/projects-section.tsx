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
  return (
    <section id="projects" className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Capstone Projects</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            
            return (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary text-white">
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex gap-2">
                  {project.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex}
                      className={`${project.badgeColors[badgeIndex]} text-white`}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Code2, Database, Cloud, Wrench, Sparkles, Server } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

export default function Skills() {
    const skillCategories = [
        {
            title: "Frontend",
            icon: Code2,
            skills: ["JavaScript", "TypeScript", "React", "HTML/CSS", "Chrome Extension", "Next.js", "Tailwind CSS"]
        },
        {
            title: "Backend",
            icon: Server,
            skills: ["Node.js", "Python", "Express.js", "Flask", "Spring Boot", "REST APIs", "JWT"]
        },
        {
            title: "Data & Analytics",
            icon: Sparkles,
            skills: ["Python", "Jupyter", "pandas", "NumPy", "scikit-learn", "matplotlib", "SciPy", "YOLOv11", "Regression", "Tableau"]
        },
        {
            title: "Databases",
            icon: Database,
            skills: ["MySQL", "PostgreSQL", "MongoDB", "AWS S3"]
        },
        {
            title: "Cloud & DevOps",
            icon: Cloud,
            skills: ["AWS (EC2, S3)", "Docker", "GitHub Actions", "Git", "CI/CD"]
        },
        {
            title: "Tools & Others",
            icon: Wrench,
            skills: ["Postman", "Notion", "CMS Workflows", "Excel", "Adobe InDesign", "Agile"]
        }
    ];

    return (
        <section id="skills" className="py-20" style={{ background: 'var(--asu-ink)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionHeader 
                    title="Technical Skills" 
                    subtitle="The technologies and tools I wield to execute my missions." 
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 md:mt-12">
                    {skillCategories.map((category, categoryIndex) => {
                        const IconComponent = category.icon;
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                                className="group"
                            >
                                <div
                                    className="h-full p-3 sm:p-4 md:p-6 rounded-lg border transition-all duration-300"
                                    style={{ 
                                        background: 'var(--asu-ink)', 
                                        borderColor: 'var(--asu-border)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 198, 39, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--asu-border)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    {/* Category Header */}
                                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                                        <div 
                                            className="p-1.5 sm:p-2.5 rounded-lg flex-shrink-0"
                                            style={{ 
                                                background: 'var(--accent-bg-soft)',
                                                border: '1px solid var(--accent-border-soft)'
                                            }}
                                        >
                                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--accent-color)' }} />
                                        </div>
                                        <h3 
                                            className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wide"
                                            style={{ color: 'var(--heading-accent)' }}
                                        >
                                            {category.title}
                                        </h3>
                                    </div>
                                    
                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                transition={{ 
                                                    duration: 0.2, 
                                                    delay: (categoryIndex * 0.1) + (skillIndex * 0.02) 
                                                }}
                                                className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-default"
                                                style={{
                                                    background: 'var(--skill-badge-bg)',
                                                    color: 'var(--skill-badge-text)',
                                                    border: '1px solid transparent'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = 'var(--accent-border-soft)';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = 'transparent';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
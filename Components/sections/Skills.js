import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

export default function Skills() {
    const skillCategories = [
        {
            title: "Frontend",
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "Framer Motion", "HTML5 & CSS3"]
        },
        {
            title: "Backend",
            skills: ["Node.js", "Python", "Express.js", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"]
        },
        {
            title: "Tools & Deploy",
            skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "Jest", "CI/CD"]
        }
    ];

    return (
        <section id="skills" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title="Technical Skills" 
                    subtitle="The technologies and tools I wield to execute my missions." 
                />

                <div className="space-y-12">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-center tracking-widest uppercase" style={{ color: 'var(--heading-accent)' }}>
                                {category.title}
                            </h3>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5, scale: 1.05, boxShadow: "0 0 18px rgba(255, 198, 39, 0.25)" }}
                                        transition={{ duration: 0.3, delay: (categoryIndex * 0.2) + (skillIndex * 0.05) }}
                                    className="p-4 rounded-md border flex items-center gap-3 cursor-default"
                                    style={{ background: 'var(--asu-ink)', borderColor: 'var(--asu-border)' }}
                                    >
                                        <CheckCircle className="w-5 h-5" style={{ color: 'var(--accent-color)' }}/>
                                        <span className="font-medium text-lg" style={{ color: 'var(--asu-text)' }}>{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
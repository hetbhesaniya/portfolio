import { motion } from "framer-motion";
import { User, Award, Coffee } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

export default function About() {
    const stats = [
        { icon: User, label: "Years Experience", value: "2+" },
        { icon: Award, label: "Projects Completed", value: "3+" },
        { icon: Coffee, label: "Cups of Coffee", value: "1000+" }
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeader title="About Me" />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--asu-text-muted)' }}>
                            <p>
                                I’m a Software Engineer and Data Engineer with a passion for building systems that are as reliable as they are intelligent.  
                                My focus lies at the intersection of backend engineering, cloud infrastructure, and data-driven problem solving.  
                            </p>
                            <p>
                                Over the past few years, I’ve developed multilingual APIs, optimized system performance, automated workflows, and deployed applications on AWS and Dockerized environments. At the same time, I’ve built data pipelines, dashboards, and applied ML models that turn raw data into actionable insights.  
                            </p>
                            <p>
                                What drives me is the challenge of creating solutions that perform under pressure whether that’s an API serving thousands of users or a data pipeline ensuring accuracy at scale. Outside of work, I’m constantly exploring new technologies, experimenting with AI tools, and sharpening my skills to stay ahead of the curve.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-8"
                        >
                            <a 
                                href="/resume.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-3 rounded-md font-semibold transition-all duration-300 asu-btn-primary asu-gold-glow"
                            >
                                Resume
                            </a>

                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 * index }}
                                whileHover={{ scale: 1.05 }}
                                className="p-6 rounded-md border transition-all duration-300"
                                style={{ background: 'var(--asu-ink)', borderColor: 'var(--asu-border)' }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 rounded-md" style={{ background: 'rgba(255,198,39,0.12)' }}>
                                        <stat.icon className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold" style={{ color: 'var(--asu-text)' }}>{stat.value}</h3>
                                        <p style={{ color: 'var(--asu-text-muted)' }}>{stat.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

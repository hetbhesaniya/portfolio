import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { throttle } from "@/utils/scroll";

export default function Hero() {
    const heroRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const handleMouseMove = throttle((e) => {
            if (!heroRef.current) return;

            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroRef.current;
            
            // Invert the xPos and yPos for parallax
            const xPos = -(clientX / offsetWidth - 0.5) * 30; // Intensity multiplier
            const yPos = -(clientY / offsetHeight - 0.5) * 30;

            const bg = heroRef.current.querySelector('.parallax-bg');
            if (bg) {
                bg.style.transform = `translate(${xPos}px, ${yPos}px)`;
            }
        }, 16); // ~60fps throttling

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToNext = () => {
        const element = document.querySelector("#about");
        if (element) {
            const navHeight = 80; // Approximate height of fixed navigation bar
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden asu-white-maroon-bg">

            {/* Parallax Background */}
            <div className="absolute inset-0">
                <div className="parallax-bg absolute -inset-10 transition-transform duration-300 ease-out">
                    <div className="absolute inset-0 bg-repeat bg-center [background-image:radial-gradient(rgba(140,29,64,0.06)_1px,transparent_1px)] [background-size:2rem_2rem]"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Responsive grid: centered layout (desktop side-by-side) */}
                <div className="text-center md:text-center md:grid md:grid-cols-2 md:items-center md:justify-items-center md:gap-12">
                {/* Desktop image column (right, centered) */}
                <div className="hidden md:flex flex-col items-center justify-center md:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="rounded-full shadow-xl border-4 overflow-hidden mb-4"
                        style={{ borderColor: 'var(--profile-border-color)' }}
                    >
                        <Image
                            src="/Profile.jpg"
                            alt="Het Bhesaniya"
                            width={480}
                            height={480}
                            priority
                            className="w-[480px] h-[480px] object-cover"
                        />
                    </motion.div>
                    {/* ASU Grad 2025 Logo - Theme Aware */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-2"
                    >
                        <Image
                            src={theme === 'asu-dark' ? '/asu-grad-2025-dark.png' : '/asu-grad-2025.png'}
                            alt="ASU Grad 2025"
                            width={220}
                            height={66}
                            className="h-auto"
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="md:order-1 md:text-center text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {/* Mobile Profile Image and ASU Grad Logo Container */}
                    <div className="md:hidden flex flex-col items-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="rounded-full shadow-xl border-4 overflow-hidden w-56 sm:w-64 aspect-square mb-4"
                            style={{ borderColor: 'var(--profile-border-color)' }}
                        >
                            <Image
                                src="/Profile.jpg"
                                alt="Het Bhesaniya"
                                width={256}
                                height={256}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </motion.div>
                        {/* ASU Grad 2025 Logo - Mobile - Theme Aware */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center"
                        >
                            <Image
                                src={theme === 'asu-dark' ? '/asu-grad-2025-dark.png' : '/asu-grad-2025.png'}
                                alt="ASU Grad 2025"
                                width={200}
                                height={60}
                                className="h-auto"
                            />
                        </motion.div>
                    </div>
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold asu-brand">
                            Het Bhesaniya
                        </h1>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-widest uppercase" style={{ color: 'var(--hero-accent)' }}>
                            Software Engineer & Data Analyst
                        </h2>
                        <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--asu-text-muted)' }}>
                            Building reliable systems, scalable pipelines, and intelligent solutions
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.1 }}
                        className="flex justify-center space-x-6 mb-12"
                    >
                        <motion.a
                            whileHover={{ scale: 1.2, y: -5, color: 'var(--hero-hover)' }}
                            whileTap={{ scale: 0.9 }}
                            href="https://github.com/hetbhesaniya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 transition-colors duration-300"
                        >
                            <Github size={32} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2, y: -5, color: 'var(--hero-hover)' }}
                            whileTap={{ scale: 0.9 }}
                            href="https://www.linkedin.com/in/het-bhesaniya/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 transition-colors duration-300"
                        >
                            <Linkedin size={32} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2, y: -5, color: 'var(--hero-hover)' }}
                            whileTap={{ scale: 0.9 }}
                            href="mailto:hetbhesaniya0096@gmail.com"
                            className="text-gray-400 transition-colors duration-300"
                        >
                            <Mail size={32} />
                        </motion.a>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.4 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(255, 198, 39, 0.35)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToNext}
                        className="px-8 py-3 rounded-md font-semibold transition-all duration-300 hero-btn mb-8"
                    >
                        Explore My Skills
                    </motion.button>
                </motion.div>
                </div>
            </div>
        </section>
    );
}
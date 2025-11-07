import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { useRouter } from "next/router";
import { throttle } from "@/utils/scroll";

// Pitchfork Icon Component - uses PNG images based on theme
const PitchforkIcon = ({ size = 24, className = "" }) => {
    const { theme } = useTheme();
    const imageSrc = theme === 'asu-dark' ? '/pitchfork-gold.png' : '/pitchfork-maroon.png';
    
    return (
        <Image
            src={imageSrc}
            alt="Pitchfork toggle"
            width={size}
            height={size}
            className={className}
        />
    );
};

export default function Navigation() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const isNavigatingRef = useRef(false);
    const pitchforkPressTimer = useRef(null);

    const navItems = useMemo(() => [
        { name: "Home", href: "#home", id: "home" },
        { name: "About", href: "#about", id: "about" },
        { name: "Experience", href: "#experience", id: "experience" },
        { name: "Skills", href: "#skills", id: "skills" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Certifications", href: "#certifications", id: "certifications" },
        { name: "Contact", href: "#contact", id: "contact" }
    ], []);

    useEffect(() => {
        const handleScroll = throttle(() => {
            setIsScrolled(window.scrollY > 50);
        }, 100);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePitchforkPressStart = () => {
        pitchforkPressTimer.current = setTimeout(() => {
            router.push('/AboutMe');
        }, 1000);
    };

    const handlePitchforkPressEnd = () => {
        // Check if timer was running (short press) before clearing it
        const wasShortPress = pitchforkPressTimer.current !== null;
        
        // Clear the timer
        if (pitchforkPressTimer.current) {
            clearTimeout(pitchforkPressTimer.current);
            pitchforkPressTimer.current = null;
        }
        
        // If short press detected, toggle theme
        if (wasShortPress) {
            toggleTheme();
        }
    };

    useEffect(() => {
        return () => {
            if (pitchforkPressTimer.current) {
                clearTimeout(pitchforkPressTimer.current);
            }
        };
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            const id = href.replace('#', '');
            setActiveSection(id);
            setIsMobileMenuOpen(false);

            isNavigatingRef.current = true;
            setTimeout(() => {
                isNavigatingRef.current = false;
            }, 1500);

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            setTimeout(() => {
                setActiveSection(id);
            }, 800);
        }
    };

    useEffect(() => {
        const sectionIds = navItems.map(item => item.id);
        const sections = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return;

        const updateActiveSection = () => {
            if (isNavigatingRef.current) return;

            const navHeight = 80;
            const scrollPosition = window.scrollY + navHeight + 50;

            let currentSection = 'home';
            let maxVisibility = -Infinity;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionBottom = sectionTop + rect.height;

                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    const visibility = Math.min(
                        scrollPosition - sectionTop,
                        sectionBottom - scrollPosition
                    );
                    if (visibility > maxVisibility) {
                        maxVisibility = visibility;
                        currentSection = section.id;
                    }
                }
            });

            if (window.scrollY < 150) {
                currentSection = 'home';
            }

            setActiveSection(currentSection);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (isNavigatingRef.current) return;

                const visibleSections = entries
                    .filter(entry => entry.isIntersecting)
                    .map(entry => ({
                        id: entry.target.id,
                        intersectionRatio: entry.intersectionRatio,
                        top: entry.boundingClientRect.top
                    }))
                    .sort((a, b) => {
                        if (Math.abs(a.top) !== Math.abs(b.top)) {
                            return Math.abs(a.top) - Math.abs(b.top);
                        }
                        return b.intersectionRatio - a.intersectionRatio;
                    });

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].id);
                } else if (window.scrollY < 150) {
                    setActiveSection('home');
                }
            },
            {
                root: null,
                rootMargin: '-80px 0px -50% 0px',
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
            }
        );

        sections.forEach((section) => observer.observe(section));

        const handleScroll = throttle(() => {
            if (isNavigatingRef.current) return;
            updateActiveSection();
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });

        updateActiveSection();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [navItems]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b backdrop-blur`}
            style={{
                background: isScrolled ? 'var(--asu-ink)' : 'transparent',
                borderColor: theme === 'asu-dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'
            }}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center relative">
                    {/* Left: Name */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer asu-brand truncate"
                        onClick={() => scrollToSection("#home")}
                        style={{ color: 'var(--asu-text)' }}
                    >
                        Het Bhesaniya
                    </motion.div>

                    {/* Center: Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.name}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => scrollToSection(item.href)}
                                className="transition-colors duration-300 font-medium asu-underline-gold"
                                style={{ color: 'var(--asu-text)' }}
                                aria-current={activeSection === item.id ? 'page' : undefined}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Right: Toggle Button + Mobile Menu */}
                    <div className="ml-auto flex items-center space-x-4">
                        <motion.button
                            onMouseDown={handlePitchforkPressStart}
                            onMouseUp={handlePitchforkPressEnd}
                            onMouseLeave={handlePitchforkPressEnd}
                            onTouchStart={handlePitchforkPressStart}
                            onTouchEnd={handlePitchforkPressEnd}
                            whileHover={{ scale: 1.1 }}
                            aria-label="Theme toggle and story mode"
                            animate={{
                                boxShadow: [
                                    "0 0 0px rgba(255,198,39,0)",
                                    "0 0 20px rgba(255,198,39,0.3)",
                                    "0 0 0px rgba(255,198,39,0)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 28
                            }}
                            className="p-3 rounded-md border"
                            style={{
                                borderColor: theme === 'asu-dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)',
                                color: theme === 'asu-dark' ? 'var(--asu-gold)' : 'var(--asu-maroon)',
                                background: 'transparent'
                            }}
                        >
                            <PitchforkIcon size={24} />
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden"
                            style={{ color: 'var(--asu-text)' }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pb-4 border-t"
                        style={{ borderColor: 'var(--asu-border)' }}
                    >
                        {navItems.map((item) => (
                            <motion.button
                                key={item.name}
                                whileHover={{ x: 10 }}
                                onClick={() => scrollToSection(item.href)}
                                className="block w-full text-left py-2 transition-colors duration-300"
                                style={{ color: 'var(--asu-text)' }}
                                aria-current={activeSection === item.id ? 'page' : undefined}
                            >
                                <span className={`asu-underline-gold inline-block ${activeSection === item.id ? 'active' : ''}`}>
                                    {item.name}
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}

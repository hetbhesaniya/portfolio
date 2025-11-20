import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { throttle } from "@/utils/scroll";
import AlternatingPolaroidSection from "@/components/polaroids/AlternatingPolaroidSection";
import CraftCareLetterbox from "@/components/sections/CraftCareLetterbox";
import FutureWhite from "@/components/about/FutureWhite";
import OutroWhite from "@/components/about/OutroWhite";

function TypewriterText({ lines, className = "", style = {} }) {
    const content = useMemo(() => lines.join("\n\n"), [lines]);

    return (
        <div className={className} style={{ ...style, whiteSpace: "pre-wrap" }}>
            {content}
        </div>
    );
}

export default function AboutMe() {
    const router = useRouter();
    const paperRef = useRef(null);
    const photoRef = useRef(null);
    const textRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const [heroHasScrolled, setHeroHasScrolled] = useState(false);
    const titleFullText = "This is where it all began.";
    const [titleCharCount, setTitleCharCount] = useState(prefersReducedMotion ? titleFullText.length : 0);
    const titleText = titleFullText.slice(0, titleCharCount);
    const titleDone = titleCharCount >= titleFullText.length;
    const heroHasScrolledRef = useRef(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const handleScroll = throttle(() => {
            const scrollPosition = window.scrollY;
            
            // Parallax for paper background
            if (paperRef.current) {
                paperRef.current.style.transform = `translateY(${scrollPosition * 0.02}px)`;
            }
            
            // Subtle parallax for Scene 2 photo and text
            if (photoRef.current) {
                const yPhoto = scrollPosition * 0.015;
                photoRef.current.style.transform = `translateY(${yPhoto}px)`;
                photoRef.current.style.transformOrigin = 'left center';
            }
            
            if (textRef.current) {
                textRef.current.style.transform = `translateY(${scrollPosition * 0.01}px)`;
            }
        }, 16);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 40 && !heroHasScrolledRef.current) {
            heroHasScrolledRef.current = true;
            setHeroHasScrolled(true);
        }
    });

    useEffect(() => {
        if (prefersReducedMotion || typeof window === "undefined") {
            setTitleCharCount(titleFullText.length);
            return;
        }

        setTitleCharCount(0);
        let index = 0;
        let timer = window.setTimeout(function tick() {
            index += 1;
            setTitleCharCount(index);
            if (index < titleFullText.length) {
                timer = window.setTimeout(tick, 70);
            }
        }, 400);

        return () => {
            window.clearTimeout(timer);
        };
    }, [prefersReducedMotion, titleFullText.length]);

    const introLines = [
        "I'm Het — born in 2002, somewhere between floppy disks and cloud storage.",
        "I build things. I listen. I care deeply. And I overthink just enough to make them better.",
        "This is where my story begins."
    ];

    const lineVariants = {
        hidden: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 16
        },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.14 + 0.3,
                duration: 0.7,
                ease: "easeOut"
            }
        })
    };

    const titleVariants = {
        hidden: {
            opacity: prefersReducedMotion ? 1 : 0.75,
            filter: prefersReducedMotion ? "blur(0px)" : "blur(2px)"
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#000" }}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;500;700&family=Caveat:wght@400;600&display=swap" rel="stylesheet" />
                <title>This is where it all began. – Het</title>
            </Head>

            {/* Film grain overlay - always visible */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 400 400\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'1.5\\' numOctaves=\\'4\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
                backgroundSize: '400px 400px'
            }} />

            {/* Back Button */}
            <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50">
                <button
                    onClick={() => router.push('/')}
                    className="p-2 sm:p-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            {/* SCENE 1 — The Frame (Intro) */}
            <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ background: "#000" }}>
                {/* Background ripped paper image */}
                <div className="absolute inset-0 z-0" ref={paperRef} style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}>
                    <Image
                        src="/Ripped paper.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-20"
                        priority
                        style={{ mixBlendMode: 'overlay' }}
                    />
                </div>
                
                {/* Vignette effect */}
                <div className="absolute inset-0 pointer-events-none z-0" style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)"
                }} />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.6 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mb-6"
                    >
                        <span className="sr-only">Chapter 00 — Prologue</span>
                        <p
                            className="text-[0.7rem] tracking-[0.4em] uppercase"
                            style={{ color: "rgba(244,242,238,0.7)" }}
                        >
                            CHAPTER 00 <span style={{ color: "#E9C46A" }}>•</span> PROLOGUE
                        </p>
                    </motion.div>

                    <motion.h1
                        id="about-hero-heading"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight px-4 relative"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: "#F4F2EE",
                            textShadow: "0 0 30px rgba(255,255,255,0.25)"
                        }}
                    >
                        {titleText}
                        {titleCharCount < titleFullText.length && !prefersReducedMotion && (
                            <span className="inline-block w-1.5 h-6 sm:w-2 sm:h-8 bg-[#F4F2EE] ml-1 align-middle animate-pulse" aria-hidden="true" />
                        )}
                    </motion.h1>

                    <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                        {introLines.map((line, index) => (
                            <motion.p
                                key={line}
                                custom={index}
                                variants={lineVariants}
                                initial="hidden"
                                animate={titleDone ? "visible" : "hidden"}
                                className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2 sm:px-0 ${index === introLines.length - 1 ? "italic" : ""}`}
                                style={{ color: "#F4F2EE" }}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={!titleDone || heroHasScrolled ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center space-y-2"
                        aria-live="polite"
                    >
                        <div
                            style={{
                                width: "160px",
                                height: "1px",
                                background: "linear-gradient(90deg, transparent, rgba(244,242,238,0.65), transparent)"
                            }}
                            aria-hidden="true"
                        />
                        <p className="text-sm italic lowercase" style={{ color: "rgba(244,242,238,0.75)" }}>
                            scroll down — it gets personal.
                        </p>
                        <motion.div
                            className="text-xs"
                            style={{ color: "rgba(244,242,238,0.55)" }}
                            animate={
                                heroHasScrolled || !titleDone || prefersReducedMotion
                                    ? { opacity: 0 }
                                    : { y: [0, -6, 0], opacity: 1 }
                            }
                            transition={{ duration: 2, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
                            aria-hidden="true"
                        >
                            ↓
                        </motion.div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 1.2, delay: 1.5 }}
                        className="mt-12 text-[11px] tracking-[0.4em] uppercase"
                        style={{ color: "rgba(244,242,238,0.4)" }}
                    >
                        written & built by het bhesaniya
                    </motion.p>
                </motion.div>
            </section>

            {/* SCENE 2 — Roots (Childhood & Family) */}
            <section className="min-h-screen flex items-center px-6 py-20 relative" style={{ background: "#000" }}>
                {/* Ripped paper texture over black background (matched to Scene 1) */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ zIndex: 1, WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}>
                    <Image
                        src="/Ripped paper.png"
                        alt="Ripped paper texture"
                        fill
                        className="object-cover"
                        style={{ mixBlendMode: 'overlay' }}
                    />
                </div>
                {/* Vignette for depth, matched to Scene 1 */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)' }} />

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center relative z-10 px-4 sm:px-6">
                    {/* Polaroid/Tape frame photo */}
                    <motion.div
                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -100, rotate: prefersReducedMotion ? 0 : -5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative mb-6 sm:mb-8 md:mb-0"
                        style={{ transformOrigin: 'left center' }}
                        ref={photoRef}
                    >
                        <div className="relative border-3 sm:border-4 md:border-8 border-white/90 shadow-2xl overflow-hidden bg-white p-1 sm:p-2">
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                    src="/photos/Childhood.jpeg"
                                    alt="Childhood"
                                    fill
                                    className="object-cover grayscale"
                                />
                                {/* Vignette + matte overlay */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)'
                                }} />
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'m\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'2\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23m)\\'/%3E%3C/svg%3E')",
                                    mixBlendMode: 'multiply'
                                }} />
                                {/* Dust effect overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'dust\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'3\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23dust)\\'/%3E%3C/svg%3E')"
                                }} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        ref={textRef}
                    >
                        {/* Chapter label */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="tracking-[0.35em] uppercase text-xs sm:text-sm mb-3 sm:mb-4 text-white/60 text-center md:text-left"
                        >
                            Chapter 01
                        </motion.div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-white text-center md:text-left" style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif"
                        }}>
                            Roots
                        </h2>
                        <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/90 text-center md:text-left" style={{
                            fontFamily: "'Playfair Display', Georgia, serif"
                        }}>
                            <p>I grew up watching my parents turn struggle into strength.</p>
                            <p>My father built a business from scratch.</p>
                            <p>My mother built the way I see the world — with kindness first.</p>
                            <p className="text-white/70 italic">That's the kind of success I chase.</p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="mt-4 sm:mt-6 text-white/60 text-lg sm:text-xl text-center md:text-left"
                            style={{ fontFamily: "'Caveat', cursive" }}
                        >
                            "everything I build started here."
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SCENE 3 — Becoming (The Move, Self-Growth) */}
            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative" style={{ background: "#000" }}>
                {/* Soft radial gray gradient for depth */}
                <div className="absolute inset-0 opacity-30" style={{
                    background: "radial-gradient(ellipse at center, rgba(26,26,26,0.4) 0%, transparent 70%)"
                }} />
                {/* Dim city skyline background - using a dark gradient */}
                <div className="absolute inset-0 opacity-20" style={{
                    background: "linear-gradient(to top, #000 0%, #1a1a1a 50%, #0a0a0a 100%)"
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.5 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    {/* Chapter label */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="tracking-[0.35em] uppercase text-xs sm:text-sm mb-3 sm:mb-4 text-white/60"
                    >
                        Chapter 02
                    </motion.div>
                    {/* Becoming title - slower fade */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 md:mb-12 text-white px-4" 
                        style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif"
                        }}
                    >
                        Becoming
                    </motion.h2>
                    
                    <div className="space-y-4 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 mb-6 md:mb-8 px-4" style={{
                        fontFamily: "'Playfair Display', Georgia, serif"
                    }}>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            Moving to the U.S. flipped my world into grayscale.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            New streets. New silence. New self.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            That's where adulting began — learning, unlearning, missing home, finding calm inside chaos.
                        </motion.p>
                    </div>

                    {/* Handwritten annotation - delayed appearance */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1.7 }}
                        className="mt-8 sm:mt-12 text-white/70 italic px-4"
                        style={{
                            fontFamily: "'Caveat', cursive",
                            transform: 'rotate(-2deg)',
                            fontSize: 'clamp(20px, 4vw, 28px)'
                        }}
                    >
                      " Fun fact: Still calling mom for recipes!"
                    </motion.div>
                </motion.div>
            </section>

            {/* Alternating Polaroid Section */}
            <AlternatingPolaroidSection
                newStreetsCaption={{
                    title: "First few months in the US",
                    meta: ["TEMPE, AZ", "50 MM", "ISO 400", "ROLL 02 / F03"],
                    oneLiner: "late bus, early character arc."
                }}
                circleCaption={{
                    title: "People who made life better",
                    meta: ["MESA, AZ", "1/125S", "F/2.8", "ROLL 02 / F07"],
                    oneLiner: "friends in frame, home in feeling."
                }}
                smallJoysCaption={{
                    title: "My first audience",
                    meta: ["Ahmedabad, IN", "50 MM", "ISO 400", "ROLL 02 / F03"],
                    oneLiner: "my cheer, her giggle, our story."
                }}
            />

            {/* SCENE 4 — Principles (The Way I Build) */}
            <CraftCareLetterbox />

            {/* Future & Outro - Cut to white */}
            <FutureWhite />
            <OutroWhite
                onBack={() => router.push('/')}
                onContact={() => window.location.href = 'mailto:hetbhesaniya0096@gmail.com'}
            />
    </div>
);
}

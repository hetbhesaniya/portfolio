import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { throttle } from "@/utils/scroll";
import AlternatingPolaroidSection from "@/components/polaroids/AlternatingPolaroidSection";
import CraftCareLetterbox from "@/components/sections/CraftCareLetterbox";

function TypewriterText({ lines, speed = 35, className = "", style = {} }) {
    const full = useMemo(() => lines.join("\n\n"), [lines]);

    const defaultStyle = {
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#f4f2ee"
    };

    const mergedStyle = {
        ...defaultStyle,
        ...style,
        margin: 0,
        padding: 0,
        display: 'block',
        width: '100%',
        textAlign: style.textAlign || 'center'
    };

    return (
        <div className={className} style={mergedStyle}>
            <div style={{ 
                display: 'inline-block',
                textAlign: 'left',
                maxWidth: '100%',
                padding: '0 20px'
            }}>
                <pre style={{ 
                    margin: 0,
                    padding: 0,
                    fontFamily: mergedStyle.fontFamily,
                    color: mergedStyle.color,
                    fontWeight: mergedStyle.fontWeight,
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    display: 'inline-block',
                    textAlign: 'center'
                }}>
                    {full}
                </pre>
            </div>
        </div>
    );
}

export default function AboutMe() {
    const router = useRouter();
    const paperRef = useRef(null);
    const photoRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const handleScroll = throttle(() => {
            const scrollY = window.scrollY;
            
            // Parallax for paper background
            if (paperRef.current) {
                paperRef.current.style.transform = `translateY(${scrollY * 0.02}px)`;
            }
            
            // Subtle parallax for Scene 2 photo and text
            if (photoRef.current) {
                const yPhoto = scrollY * 0.015;
                photoRef.current.style.transform = `translateY(${yPhoto}px)`;
                photoRef.current.style.transformOrigin = 'left center';
            }
            
            if (textRef.current) {
                textRef.current.style.transform = `translateY(${scrollY * 0.01}px)`;
            }
        }, 16); // ~60fps throttling
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => router.push('/')}
                    className="p-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            </div>

            {/* SCENE 1 — The Frame (Intro) */}
            <section className="min-h-screen flex items-center justify-center px-6 relative" style={{ background: "#000" }}>
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
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight" style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif",
                            textShadow: "0 0 30px rgba(255,255,255,0.3), 2px 2px 8px rgba(0,0,0,0.8)"
                        }}>
                            This is where it all began.
                        </h1>
                    </motion.div>

                    <TypewriterText
                        speed={40}
                        lines={[
                            "I'm Het — born in 2002, somewhere between floppy disks and cloud storage.",
                            "I build things. I listen. I care deeply. And I overthink just enough to make them better.",
                            "This is where my story begins."
                        ]}
                        className="text-center text-xl md:text-2xl tracking-tight leading-relaxed"
                    />

                    {/* Subtle divider + micro copy */}
                    <div className="mx-auto mt-6 mb-2" style={{ width: '180px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(244,242,238,0.7), transparent)' }} />
                    <div className="text-sm italic lowercase" style={{ color: 'rgba(244,242,238,0.7)' }}>
                        scroll down — it gets personal.
                    </div>
                </motion.div>

                {/* Bottom gradient to blend into Scene 2 (pure black to avoid grey band) */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%)' }} />
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

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Polaroid/Tape frame photo */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotate: -5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                        style={{ transformOrigin: 'left center' }}
                        ref={photoRef}
                    >
                        <div className="relative border-8 border-white/90 shadow-2xl overflow-hidden bg-white p-2">
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                    src="/photos/childhood.jpeg"
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
                            className="tracking-[0.35em] uppercase text-sm mb-4 text-white/60"
                        >
                            Chapter 01
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white" style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif"
                        }}>
                            Roots
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white/90" style={{
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
                            className="mt-6 text-white/60 text-lg"
                            style={{ fontFamily: "'Caveat', cursive" }}
                        >
                            "everything I build started here."
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SCENE 3 — Becoming (The Move, Self-Growth) */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20 relative" style={{ background: "#000" }}>
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
                    {/* Becoming title - slower fade */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold mb-12 text-white" 
                        style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif"
                        }}
                    >
                        Becoming
                    </motion.h2>
                    
                    <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-white/90 mb-8" style={{
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
                            className="relative inline-block"
                        >
                            That's where adulting began — learning, unlearning, missing home, finding calm inside chaos.
                            {/* Golden underline glow */}
                            <span className="absolute bottom-0 left-0 w-full h-0.5" style={{
                                background: "linear-gradient(90deg, transparent, #FFC627, #FFB800, transparent)",
                                boxShadow: "0 0 15px rgba(255, 198, 39, 0.6), 0 0 25px rgba(255, 184, 0, 0.4)"
                            }} />
                        </motion.p>
                    </div>

                    {/* Handwritten annotation - delayed appearance */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1.7 }}
                        className="mt-12 text-white/70 text-lg italic"
                        style={{
                            fontFamily: "'Caveat', cursive",
                            transform: 'rotate(-2deg)'
                        }}
                    >
                        "Still calling mom for recipes."
                    </motion.div>

                    {/* Optional handwritten annotation in corner */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 2.2 }}
                        className="absolute bottom-4 right-4 text-white/40 text-xs"
                        style={{
                            fontFamily: "'Caveat', cursive",
                            transform: 'rotate(5deg)'
                        }}
                    >
                        "probably overthinking everything right here ↑"
                    </motion.div>
                </motion.div>
            </section>

            {/* Alternating Polaroid Section */}
            <AlternatingPolaroidSection
                onPostCreditOpen={() => {
                    // Post-credit scene handler
                }}
                newStreetsCaption={{
                    title: "Deer at the fence",
                    meta: ["TEMPE, AZ", "50 MM", "ISO 400", "ROLL 02 / F03"],
                    oneLiner: "Sunset at the lake reset everything."
                }}
                circleCaption={{
                    title: "Confetti in a small room",
                    meta: ["MESA, AZ", "1/125S", "F/2.8", "ROLL 02 / F07"]
                }}
            />

            {/* Craft & Mindset • People & Care Letterboxed Title Card */}
            <CraftCareLetterbox />

            {/* SCENE 6 — Today (Present & Drive) */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20 relative" style={{ background: "#ffffff" }}>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-black" style={{ 
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600
                    }}>
                        Today
                    </h2>

                    <div className="space-y-6 text-xl md:text-2xl leading-relaxed text-black/80" style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300
                    }}>
                        <p>Right now, I'm learning, building, and growing —</p>
                        <p>balancing code with creativity, precision with play.</p>
                        <p className="text-black/60 italic">Still that kid who wanted to make his parents proud,</p>
                        <p className="text-black/60 italic">just with better Wi-Fi now.</p>
                    </div>
                </motion.div>
            </section>

            {/* SCENE 7 — Outro (Emotional Close) */}
            <section 
                className="min-h-screen flex items-center justify-center py-20 relative" 
                style={{ 
                    background: "#fafafa", 
                    paddingLeft: "40px", 
                    paddingRight: "40px",
                    overflow: "visible"
                }}
            >
                {/* Faded paper texture */}
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'0.03\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }} />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-full max-w-4xl mx-auto relative z-10"
                    style={{ 
                        padding: "0",
                        overflow: "visible"
                    }}
                >
                    <motion.div 
                        className="w-full text-center" 
                        style={{ padding: "0 40px" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <TypewriterText
                            speed={50}
                            lines={[
                                "Still learning.",
                                "Still dancing between logic and emotion.",
                                "Always curious."
                            ]}
                            className="text-3xl md:text-4xl mb-16 leading-relaxed"
                            style={{
                                color: "#000000",
                                fontWeight: 600,
                                fontFamily: "'Playfair Display', Georgia, serif"
                            }}
                        />
                    </motion.div>

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 3 }}
                        className="mb-12 text-2xl text-center"
                        style={{
                            fontFamily: "'Caveat', cursive",
                            color: "#1a1a1a",
                            fontWeight: 500
                        }}
                    >
                        — Het
                    </motion.div>

                    {/* Back button */}
                    <div className="text-center">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 3.5 }}
                            whileHover={{ scale: 1.05, backgroundColor: "#000000", color: "#ffffff", borderColor: "#000000" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/Portfolio")}
                            className="px-8 py-4 border-2 transition-all duration-300 rounded-sm text-lg font-medium"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                color: "#000000",
                                borderColor: "#333333",
                                backgroundColor: "transparent"
                            }}
                        >
                            Back to Portfolio →
                        </motion.button>
                    </div>
                </motion.div>
            </section>
    </div>
);
}

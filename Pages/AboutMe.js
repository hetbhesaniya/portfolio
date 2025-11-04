import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

function TypewriterText({ lines, speed = 35, className = "" }) {
    const [text, setText] = useState("");
    const full = useMemo(() => lines.join("\n\n"), [lines]);

    useEffect(() => {
        setText(""); // Reset on mount
        let i = 0;
        const id = setInterval(() => {
            if (i < full.length) {
                setText((t) => t + full.charAt(i));
                i += 1;
            } else {
                clearInterval(id);
            }
        }, speed);
        return () => clearInterval(id);
    }, [full, speed]);

    return (
        <pre className={`whitespace-pre-wrap ${className}`} style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f4f2ee" }}>
            {text}
            <span className="animate-pulse">|</span>
        </pre>
    );
}

export default function AboutMe() {
    const router = useRouter();
    const paperRef = useRef(null);
    const photoRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY * 0.02;
            if (paperRef.current) {
                paperRef.current.style.transform = `translateY(${y}px)`;
            }
            // Subtle parallax for Scene 2 photo and text
            const yPhoto = window.scrollY * 0.015;
            const yText = window.scrollY * 0.01;
            if (photoRef.current) {
                photoRef.current.style.transform = `translateY(${yPhoto}px) scale(2.10)`;
                photoRef.current.style.transformOrigin = 'left center';
            }
            if (textRef.current) {
                textRef.current.style.transform = `translateY(${yText}px)`;
            }
        };
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
                        className="relative -mt-8"
                        style={{ transform: 'scale(2.10)', transformOrigin: 'left center' }}
                        ref={photoRef}
                    >
                        {/* Tape corners */}
                        <div className="absolute -top-4 -left-4 w-16 h-16 opacity-60" style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                        }} />
                        <div className="absolute -top-4 -right-4 w-16 h-16 opacity-60" style={{
                            background: 'linear-gradient(225deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
                        }} />

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
                {/* Dim city skyline background - using a dark gradient */}
                <div className="absolute inset-0 opacity-20" style={{
                    background: "linear-gradient(to top, #000 0%, #1a1a1a 50%, #0a0a0a 100%)"
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white" style={{ 
                        fontFamily: "'Playfair Display', Georgia, serif"
                    }}>
                        Becoming
                    </h2>
                    
                    <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-white/90 mb-8" style={{
                        fontFamily: "'Playfair Display', Georgia, serif"
                    }}>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Moving to the U.S. flipped the world into grayscale.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            New streets, new silence, new self.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="relative inline-block"
                        >
                            That's where adulting began — learning, unlearning, missing home, finding calm in chaos.
                            {/* Amber/lilac neon underline */}
                            <span className="absolute bottom-0 left-0 w-full h-0.5" style={{
                                background: "linear-gradient(90deg, transparent, #FFB800, #C77DFF, transparent)",
                                boxShadow: "0 0 10px rgba(255, 184, 0, 0.5), 0 0 20px rgba(199, 125, 255, 0.3)"
                            }} />
                        </motion.p>
                    </div>

                    {/* Handwritten annotation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-12 text-white/70 text-lg italic"
                        style={{
                            fontFamily: "'Caveat', cursive",
                            transform: 'rotate(-2deg)'
                        }}
                    >
                        "Still calling mom for recipes."
                    </motion.div>
                </motion.div>
            </section>

            {/* SCENE 4 — Craft & Mindset (How You Think) */}
            <section className="min-h-screen flex items-center px-6 py-20 relative" style={{ background: "#fff" }}>
                <div className="max-w-6xl mx-auto w-full">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-16 text-center text-black" style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif"
                        }}>
                        Craft & Mindset
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { text: "Perfection isn't control — it's care.", emoji: "✨" },
                            { text: "I like when design feels calm and honest.", emoji: "" },
                            { text: "I overthink until things make sense.", emoji: "💭" },
                            { text: "Code is my logic; emotion is my debug tool.", emoji: "" }
                        ].map((quote, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, rotate: -1 }}
                                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5, rotate: 0.5, scale: 1.02 }}
                                className="p-8 border-2 border-black/10 bg-white shadow-lg relative group"
                                style={{
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                                }}
                            >
                                <p className="text-xl md:text-2xl text-black leading-relaxed" style={{
                                    fontFamily: "'Playfair Display', Georgia, serif"
                                }}>
                                    {quote.text}
                                </p>
                                {quote.emoji && (
                                    <span className="absolute top-4 right-4 text-2xl opacity-60">{quote.emoji}</span>
                                )}
                                {/* Grain effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" style={{
                                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'g\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23g)\\'/%3E%3C/svg%3E')"
                                }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SCENE 5 — People & Care (Emotional Side) */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20 relative" style={{ background: "#000" }}>
                {/* Soft grayscale background with photos */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-4 gap-4 h-full w-full">
                        {['/photos/people1.jpg', '/photos/people2.jpg', '/photos/people3.jpg', '/photos/people4.jpg'].map((src, i) => (
                            <div key={i} className="relative overflow-hidden">
                                <Image
                                    src={src}
                                    alt=""
                                    fill
                                    className="object-cover grayscale blur-sm"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Black overlay with glowing text */}
                <div className="absolute inset-0 bg-black/70" />
                
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white" style={{ 
                        fontFamily: "'Playfair Display', Georgia, serif",
                        textShadow: "0 0 30px rgba(255,255,255,0.3)"
                    }}>
                        People & Care
                    </h2>

                    <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-white/90 mb-8" style={{
                        fontFamily: "'Playfair Display', Georgia, serif"
                    }}>
                        <p>I care about the people in my life — deeply.</p>
                        <p>I love seeing others win, sometimes more than myself.</p>
                        <p className="text-white/70 italic">If you ever become my friend, you'll feel it.</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12 text-white/60 text-lg italic"
                        style={{
                            fontFamily: "'Caveat', cursive"
                        }}
                    >
                        "That's my superpower, I guess."
                    </motion.div>
                </motion.div>
            </section>

            {/* SCENE 6 — Today (Present & Drive) */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20 relative">
                {/* Workspace background */}
                <div className="absolute inset-0">
                    <Image
                        src="/bg/background-dark.png"
                        alt="Workspace"
                        fill
                        className="object-cover opacity-40 grayscale"
                    />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-black/60" />

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
            <section className="min-h-screen flex items-center justify-center px-6 py-20 relative" style={{ background: "#fafafa" }}>
                {/* Faded paper texture */}
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'0.03\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }} />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="max-w-3xl mx-auto text-center relative z-10"
                >
                    <TypewriterText
                        speed={50}
                        lines={[
                            "Still learning.",
                            "Still dancing between logic and emotion.",
                            "Always curious."
                        ]}
                        className="text-center text-3xl md:text-4xl text-black/90 mb-16 leading-relaxed"
                    />

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 3 }}
                        className="mb-12 text-black/60 text-2xl"
                        style={{
                            fontFamily: "'Caveat', cursive"
                        }}
                    >
                        — Het
                    </motion.div>

                    {/* Back button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 3.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/Portfolio')}
                        className="px-8 py-4 border-2 border-black/20 text-black/80 hover:bg-black hover:text-white hover:border-black transition-all duration-300 rounded-sm text-lg font-medium"
                        style={{
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        Back to Portfolio →
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
}

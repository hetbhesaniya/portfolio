import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function CraftCareLetterbox() {
  const prefersReducedMotion = useReducedMotion();

  const principles = [
    {
      category: "How I Build",
      items: [
        "I care about the quiet details — the loading states, the error messages, the empty screens.",
        "Performance isn't optional. Fast feels good.",
        "Accessibility is a conversation, not a checklist.",
        "I measure twice, build once, then measure again."
      ]
    },
    {
      category: "How I Work",
      items: [
        "Feedback is a gift. I listen before I defend.",
        "Clear docs save time. Tight loops save sanity.",
        "The best solutions happen when engineers and designers talk early.",
        "Care shows up in the edges — the moments others might skip."
      ]
    }
  ];

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden" 
      style={{ background: "#000" }}
    >
      {/* Ripped paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ 
        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', 
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' 
      }}>
        <Image
          src="/Ripped paper.png"
          alt="Background texture"
          fill
          className="object-cover"
          style={{ mixBlendMode: 'overlay' }}
        />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)"
      }} />

      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 400 400\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'1.5\\' numOctaves=\\'4\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
        backgroundSize: '400px 400px'
      }} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p
            className="text-[0.7rem] tracking-[0.4em] uppercase"
            style={{ color: "rgba(244,242,238,0.7)" }}
          >
            CHAPTER 04 <span style={{ color: "#E9C46A" }}>•</span> PRINCIPLES
          </p>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16 tracking-tight px-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#F4F2EE"
          }}
        >
          The Way I Build
        </motion.h2>

        {/* Principles sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20">
          {principles.map((principle, sectionIndex) => (
            <motion.div
              key={principle.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 + sectionIndex * 0.2 }}
              className="max-w-full"
            >
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + sectionIndex * 0.2 }}
                className="mb-6"
              >
                <h3
                  className="text-lg tracking-[0.3em] uppercase"
                  style={{ 
                    color: "#E9C46A",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600
                  }}
                >
                  {principle.category}
                </h3>
              </motion.div>

              {/* Items */}
              <div className="space-y-6 md:space-y-8">
                {principle.items.map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.6 + sectionIndex * 0.2 + itemIndex * 0.1,
                      ease: "easeOut"
                    }}
                    className="relative pl-6 md:pl-8"
                  >
                    {/* Decorative dash */}
                    <div
                      className="absolute left-0 top-3 w-3 h-px"
                      style={{ background: "rgba(233,196,106,0.5)" }}
                    />
                    <p
                      className="text-lg sm:text-xl md:text-2xl leading-relaxed"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#F4F2EE"
                      }}
                    >
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing handwritten note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p
            className="text-xl md:text-2xl italic"
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(244,242,238,0.75)",
              transform: 'rotate(-1deg)'
            }}
          >
            "It's not about being perfect. It's about being intentional."
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 mx-auto w-24 h-px"
          style={{ background: "rgba(233,196,106,0.4)" }}
        />
      </motion.div>
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";

export default function CraftCareLetterbox() {
  const prefersReducedMotion = useReducedMotion();

  const principles = [
    {
      category: "HOW I THINK",
      items: [
        "Start with people, not features.",
        "Clarity over cleverness.",
        "Simple first, then scalable.",
        "Defaults should feel right.",
        "Edge cases are part of the product.",
        "If it feels heavy, cut it."
      ]
    },
    {
      category: "HOW I WORK",
      items: [
        "Feedback early, never defensive.",
        "Write the plan, then code.",
        "Small PRs, tight loops.",
        "Pair with design before sprint one.",
        "Document decisions as you go.",
        "Ship, measure, iterate."
      ]
    }
  ];

  const staggerDelay = prefersReducedMotion ? 0 : 0.07;
  const animationDuration = prefersReducedMotion ? 0 : 0.18;

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16 md:py-20 relative overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Soft radial gray gradient for depth */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(26,26,26,0.4) 0%, transparent 70%)"
        }}
      />
      
      {/* Dim city skyline background - using a dark gradient */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #000 0%, #1a1a1a 50%, #0a0a0a 100%)"
        }}
      />

      {/* Film grain overlay - 2-3% opacity */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 400 400\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'1.5\\' numOctaves=\\'4\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
          backgroundSize: "400px 400px"
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.2 }}
        className="relative mx-auto z-10 md:-mt-20 mt-8"
        style={{ maxWidth: "1360px" }}
      >
        {/* Chapter label - kicker */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <p
            className="text-xs sm:text-[0.7rem] tracking-[0.4em] uppercase px-2"
            style={{ color: "rgba(244,242,238,0.7)" }}
          >
            CHAPTER 03 <span style={{ color: "#E9C46A" }}>•</span> PRINCIPLES
          </p>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-center tracking-tight px-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#F4F2EE",
            marginBottom: '40px'
          }}
        >
          The Way I Build
        </motion.h1>

        {/* Principles sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-[120px] items-start px-4 sm:px-0">
          {principles.map((principle, sectionIndex) => (
            <motion.div
              key={principle.category}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 + sectionIndex * 0.2 }}
              className="mx-auto text-center md:text-left"
              style={{ maxWidth: '36ch' }}
            >
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.5 + sectionIndex * 0.2 }}
                className="md:text-left text-center"
                style={{ marginBottom: '24px' }}
              >
                <h2
                  className="text-sm sm:text-base tracking-[0.35em] uppercase"
                  style={{ 
                    color: "rgba(233,196,106,0.5)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400
                  }}
                >
                  {principle.category}
                </h2>
              </motion.div>

              {/* Items list - semantic HTML */}
              <ul className="space-y-4 sm:space-y-5 md:space-y-6" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {principle.items.map((item, itemIndex) => {
                  const totalDelay = 0.6 + sectionIndex * 0.2 + itemIndex * staggerDelay;
                  return (
                    <motion.li
                      key={item}
                      initial={{ 
                        opacity: 0, 
                        y: prefersReducedMotion ? 0 : 12 
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0 
                      }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ 
                        duration: animationDuration,
                        delay: totalDelay,
                        ease: "easeOut"
                      }}
                      className="group relative"
                    >
                      <div className="relative" style={{ maxWidth: '36ch' }}>
                        <p
                          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed relative block cursor-default"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: "rgba(244,242,238,0.85)",
                            lineHeight: '1.4'
                          }}
                        >
                          {item}
                          
                          {/* Hairline underline - animates on hover/focus */}
                          <span
                            className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full group-focus-within:w-full transition-all ease-out"
                            style={{
                              background: "rgba(233,196,106,0.5)",
                              transitionDuration: prefersReducedMotion ? '0ms' : '150ms',
                              transitionProperty: prefersReducedMotion ? 'none' : 'width'
                            }}
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";

export default function OutroWhite({ onBack, onContact }) {
  const prefersReducedMotion = useReducedMotion();

  const lines = [
    "Still learning.",
    "Still dancing between logic and emotion.",
    "Always curious.",
    "— Het"
  ];

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        staggerChildren: prefersReducedMotion ? 0 : 0.15
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.4 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : 0.6
      }
    }
  };

  return (
    <section 
      className="w-full relative pb-12 md:pb-16 flex items-center justify-center"
      style={{ 
        background: "#F7F5F0",
        paddingTop: "20px"
      }}
    >
      {/* Subtle paper noise overlay (2-4% alpha) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 400 400\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'1.5\\' numOctaves=\\'3\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noise)\\'/%3E%3C/svg%3E')",
          backgroundSize: "400px 400px"
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center mt-12 sm:mt-0">
        {/* Text lines */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
          className="mb-10 md:mb-8 space-y-4 md:space-y-6"
        >
          {lines.map((line, index) => (
            <motion.p
              key={index}
              variants={lineVariants}
              className={
                index === lines.length - 1 
                  ? "mt-3 text-sm md:text-base italic text-[#121212]/80"
                  : "text-base md:text-xl font-semibold leading-relaxed text-[#121212]"
              }
              style={{
                fontFamily: index === lines.length - 1 
                  ? "'Caveat', cursive"
                  : "'Playfair Display', Georgia, serif"
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={buttonVariants}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 w-full"
        >
          <motion.button
            onClick={onBack}
            aria-label="Back to portfolio"
            whileHover={prefersReducedMotion ? {} : { 
              backgroundColor: "rgba(0, 0, 0, 0.03)"
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="h-11 px-5 rounded-none border-[0.5px] border-[#121212]/25 bg-[#121212]/3 text-[#121212] font-medium hover:bg-[#121212]/5 hover:border-[#121212]/35 transition-all focus:outline-none focus:ring-1 focus:ring-[#121212]/20 focus:ring-offset-2 focus:ring-offset-[#F7F5F0] active:bg-[#121212]/8 w-[min(280px,80%)] sm:w-auto"
            style={{
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Back to portfolio
          </motion.button>

          <motion.button
            onClick={onContact}
            aria-label="Say hello via email"
            whileHover={prefersReducedMotion ? {} : { 
              backgroundColor: "rgba(0, 0, 0, 0.03)"
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="h-11 px-5 rounded-none border-[0.5px] border-[#121212]/25 bg-[#121212]/3 text-[#121212] font-medium hover:bg-[#121212]/5 hover:border-[#121212]/35 transition-all focus:outline-none focus:ring-1 focus:ring-[#121212]/20 focus:ring-offset-2 focus:ring-offset-[#F7F5F0] active:bg-[#121212]/8 w-[min(280px,80%)] sm:w-auto"
            style={{
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Say hello
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


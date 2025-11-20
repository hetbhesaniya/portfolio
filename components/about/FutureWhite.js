import { motion, useReducedMotion } from "framer-motion";

export default function FutureWhite() {
  const prefersReducedMotion = useReducedMotion();

  const columns = [
    {
      label: "Now (0–90 days)",
      items: [
        "Ship a tiny tool",
        "Finish portfolio polish",
        "Apply for Full-time roles"
      ]
    },
    {
      label: "2025",
      items: [
        "Joined a team at ASU",
        "Worked on the ASU Events",
        "Learned about brand strategy and management"
      ]
    },
    {
      label: "Always",
      items: [
        "People over ego",
        "Learn in public",
        "Call mom Sundays"
      ]
    }
  ];

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.35 }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: prefersReducedMotion ? 0 : 0.3 + (index * 0.1)
      }
    })
  };

  return (
    <section 
      className="w-full relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16"
      style={{ 
        background: "#F7F5F0"
      }}
    >
      {/* Soft black→white vertical gradient at top (160px) */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "160px",
          background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 15%, rgba(247,245,240,0.3) 50%, rgba(247,245,240,0.85) 80%, rgba(247,245,240,1) 100%)"
        }}
      />

      {/* Subtle paper noise overlay (2-4% alpha) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 400 400\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'1.5\\' numOctaves=\\'3\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noise)\\'/%3E%3C/svg%3E')",
          backgroundSize: "400px 400px"
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 mt-12 sm:mt-0">
        {/* Heading block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingVariants}
          className="text-center mb-8 sm:mb-10 md:mb-14"
        >
          {/* Chapter label */}
          <div className="uppercase tracking-[0.12em] md:tracking-[0.18em] text-[11px] md:text-xs text-[#121212]/60 font-medium mb-2">
            CHAPTER 04 • WHAT'S NEXT
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 px-2 sm:px-0"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121212"
            }}
          >
            What's next
          </h2>
          <p 
            className="text-xs sm:text-sm md:text-base px-2 sm:px-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#4A4A4A",
              textTransform: "lowercase"
            }}
          >
            scenes I'm writing soon
          </p>
          
          {/* Thin gold rule */}
          <div className="h-px w-14 md:w-16 mx-auto bg-[#E9C46A]/25 mt-3 mb-6" />
        </motion.div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 md:gap-y-8 divide-y md:divide-y-0 divide-[#121212]/10 text-left mt-3 sm:mt-4 px-2 sm:px-0">
          {columns.map((column, columnIndex) => (
            <motion.div
              key={column.label}
              custom={columnIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={columnVariants}
              className="pt-6 md:pt-0 first:pt-0 md:first:pt-0"
            >
              {/* Column label */}
              <h3 
                className="uppercase tracking-[0.12em] md:tracking-[0.18em] text-[11px] md:text-xs text-[#121212]/60 font-medium mb-2"
                style={{
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {column.label}
              </h3>
              
              {/* Items list */}
              <ul className="space-y-1.5 md:space-y-2">
                {column.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "#121212"
                    }}
                  >
                    {item.replace(/\.$/, '')}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


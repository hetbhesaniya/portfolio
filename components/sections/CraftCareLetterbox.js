import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilmGrain from "@/components/polaroids/FilmGrain";

const CRAFT_ITEMS = [
  "Calm, honest interfaces",
  "Performance is UX",
  "Accessibility by default",
  "Measure > opinions"
];

const PEOPLE_ITEMS = [
  "Partner with engineers early",
  "Feedback without ego",
  "Tight loops, clear docs",
  "Care lives in the edges"
];

export default function CraftCareLetterbox() {
  const [activeTab, setActiveTab] = useState("Craft");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const tabRefs = useRef({ Craft: null, People: null });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleKeyDown = (e, tab) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabChange(tab);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const tabs = ["Craft", "People"];
      const currentIndex = tabs.indexOf(tab);
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      handleTabChange(tabs[prevIndex]);
      tabRefs.current[tabs[prevIndex]]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const tabs = ["Craft", "People"];
      const currentIndex = tabs.indexOf(tab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      handleTabChange(tabs[nextIndex]);
      tabRefs.current[tabs[nextIndex]]?.focus();
    }
  };

  const currentItems = activeTab === "Craft" ? CRAFT_ITEMS : PEOPLE_ITEMS;
  const duration = prefersReducedMotion ? 0 : 0.2;
  const stagger = prefersReducedMotion ? 0 : 0.06;

  return (
    <motion.section 
      className="min-h-[90vh] flex items-center justify-center px-6 py-20 relative" 
      style={{ background: "#000" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="relative w-full max-w-[1100px] mx-auto rounded-2xl overflow-hidden"
        style={{
          height: "clamp(600px, 90vh, 720px)",
          background: "rgba(18, 18, 18, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
        }}
      >
        {/* Letterbox bars */}
        <div
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: "7%",
            background: "rgba(13, 13, 13, 0.93)"
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: "7%",
            background: "rgba(13, 13, 13, 0.93)"
          }}
        />

        {/* Film grain overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ opacity: 0.025 }}>
          <FilmGrain />
        </div>

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col p-8 md:p-12">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12 gap-6">
            {/* Title */}
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#F4F2EE"
              }}
            >
              Craft & Mindset • People & Care
            </h2>

            {/* Segmented switch */}
            <div
              role="tablist"
              className="flex items-center gap-1 p-1 rounded-lg"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              {["Craft", "People"].map((tab) => (
                <button
                  key={tab}
                  ref={(el) => (tabRefs.current[tab] = el)}
                  role="tab"
                  tabIndex={activeTab === tab ? 0 : -1}
                  aria-selected={activeTab === tab}
                  onClick={() => handleTabChange(tab)}
                  onKeyDown={(e) => handleKeyDown(e, tab)}
                  className="px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E9C46A] focus:ring-offset-2 focus:ring-offset-black"
                  style={{
                    background: activeTab === tab ? "rgba(255, 255, 255, 0.12)" : "transparent",
                    color: activeTab === tab ? "#F4F2EE" : "rgba(244, 242, 238, 0.6)",
                    border: activeTab === tab ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid transparent"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 min-h-0">
            <AnimatePresence mode="wait">
              {currentItems.map((item, index) => (
                <motion.div
                  key={`${activeTab}-${item}`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8 }
                  }
                  transition={{
                    duration,
                    delay: index * stagger,
                    ease: "easeOut"
                  }}
                  className="flex items-center justify-center p-6 rounded-xl flex-shrink-0"
                  style={{
                    minHeight: "120px",
                    height: "120px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)"
                  }}
                >
                  <p
                    className="text-center text-lg md:text-xl font-medium"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#F4F2EE"
                    }}
                  >
                    {item}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


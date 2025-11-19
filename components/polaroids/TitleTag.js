import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * TitleTag - Compact cinematic caption component
 * @param {Object} props
 * @param {string} props.title - Short title (sentence-case, max ~30 chars)
 * @param {string | string[]} props.meta - Camera metadata (string or array)
 * @param {string} [props.oneLiner] - Optional one-liner (italic, truncated)
 */
export default function TitleTag({ title, meta, oneLiner }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const metaText = Array.isArray(meta) ? meta.join(" • ") : meta;

  return (
    <motion.div
      className="w-full max-w-[420px] lg:max-w-[400px] py-2 text-center lg:text-left mx-auto lg:mx-0"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
    >
      {/* Decorative leader line */}
      <div
        className="w-8 h-px mb-2 opacity-10 mx-auto lg:mx-0"
        style={{ background: "#F4F2EE" }}
        aria-hidden="true"
      />

      {/* Title */}
      <h3
        className="text-[22px] md:text-[26px] font-semibold leading-tight mb-1.5"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "#F4F2EE"
        }}
      >
        {title}
      </h3>

      {/* Meta */}
      <p
        className="text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-mono mb-2 break-words mx-auto lg:mx-0"
        style={{
          color: "#F4F2EE",
          opacity: 0.7,
          maxWidth: "380px"
        }}
      >
        {metaText}
      </p>

      {/* One-liner (optional) */}
      {oneLiner && (
        <p
          className="text-sm italic line-clamp-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#F4F2EE",
            opacity: 0.85
          }}
        >
          {oneLiner}
        </p>
      )}
    </motion.div>
  );
}


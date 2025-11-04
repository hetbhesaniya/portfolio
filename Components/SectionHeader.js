import { motion } from "framer-motion";

/**
 * Reusable section header component
 */
export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 asu-text-glow" style={{ color: 'var(--heading-accent)' }}>
        {title}
      </h2>
      <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--underline-accent)' }} />
      {subtitle && (
        <p className="text-xl max-w-3xl mx-auto mt-8" style={{ color: '#444' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}


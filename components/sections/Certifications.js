import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useDataFetch } from "@/hooks/useDataFetch";
import SectionHeader from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Certifications() {
  const { data: certifications, loading } = useDataFetch("/Data/certifications.json");
  const [showAll, setShowAll] = useState(false);
  const buttonRef = useRef(null);

  if (loading || !certifications.length) {
    return (
      <section id="certifications" className="py-20" style={{ background: 'var(--asu-ink)' }}>
        <div className="container mx-auto px-6 text-center">
          <p style={{ color: 'var(--asu-text-muted)' }}>Loading certifications...</p>
        </div>
      </section>
    );
  }

  const initialCerts = certifications.slice(0, 3);
  const remainingCerts = certifications.slice(3);
  const visibleCerts = showAll ? certifications : initialCerts;

  const handleToggle = () => {
    if (!buttonRef.current) {
      setShowAll(!showAll);
      return;
    }

    // Capture button's position relative to viewport before toggle
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonTop = buttonRect.top + window.scrollY;

    // Toggle state
    setShowAll(!showAll);

    // Adjust scroll after DOM updates to maintain button position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (buttonRef.current) {
          const newButtonRect = buttonRef.current.getBoundingClientRect();
          const newButtonTop = newButtonRect.top + window.scrollY;
          const heightDifference = newButtonTop - buttonTop;
          
          // Adjust scroll to keep button in same viewport position
          if (Math.abs(heightDifference) > 1) {
            window.scrollTo({
              top: window.scrollY + heightDifference,
              behavior: 'instant'
            });
          }
        }
      });
    });
  };

  return (
    <section id="certifications" className="py-20" style={{ background: 'var(--asu-ink)' }}>
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Certifications" 
          subtitle="Validated expertise and continuous learning credentials." 
        />

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={showAll ? "all" : "initial"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
          >
            {visibleCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="experience-card-hover rounded-md overflow-hidden border group"
                style={{ background: 'var(--asu-ink)', borderColor: 'var(--asu-border)' }}
              >
                <div className="p-2.5 sm:p-4 md:p-6">
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                    <div className="p-1.5 sm:p-2 md:p-3 rounded-md flex-shrink-0" style={{ background: 'rgba(255,198,39,0.12)' }}>
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: 'var(--accent-color)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2" style={{ color: 'var(--asu-text)' }}>
                        {cert.name}
                      </h3>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm mb-1 sm:mb-2" style={{ color: 'var(--asu-text-muted)' }}>
                        <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs mb-2 sm:mb-4 leading-relaxed" style={{ color: 'var(--asu-text-muted)' }}>
                    {cert.description}
                  </p>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                      {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs"
                          style={{
                            backgroundColor: 'var(--accent-bg-soft)',
                            color: 'var(--accent-color)',
                            border: '1px solid var(--accent-border-soft)'
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 3 && (
                        <Badge
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs"
                          style={{
                            backgroundColor: 'var(--asu-ink)',
                            color: 'var(--asu-text-muted)',
                            border: '1px solid var(--asu-border)'
                          }}
                        >
                          +{cert.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 pb-2 sm:pb-4 border-b" style={{ borderColor: 'var(--asu-border)' }}>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm" style={{ color: 'var(--asu-text-muted)' }}>
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{cert.issue_date}</span>
                    </div>
                  </div>

                  {cert.credential_url && (
                    <motion.a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-4 px-2.5 sm:px-4 py-1 sm:py-2 rounded-md font-semibold transition-all duration-300 text-xs sm:text-sm"
                      style={{
                        background: 'var(--accent-bg-soft)',
                        color: 'var(--accent-color)',
                        border: '1px solid var(--accent-border-soft)'
                      }}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>View Credential</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {remainingCerts.length > 0 && (
          <div ref={buttonRef} className="flex justify-center mt-8">
            <Button
              onClick={handleToggle}
              variant={showAll ? "outline" : "secondary"}
              size="md"
            >
              {showAll ? (
                <>
                  <ChevronUp size={20} />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown size={20} />
                  <span>See More</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}


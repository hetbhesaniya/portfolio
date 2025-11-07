import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useDataFetch } from "@/hooks/useDataFetch";
import SectionHeader from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/badge";

export default function Certifications() {
  const { data: certifications, loading } = useDataFetch("/Data/certifications.json");
  const [showAll, setShowAll] = useState(false);

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

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Certifications" 
          subtitle="Validated expertise and continuous learning credentials." 
        />

        <AnimatePresence initial={false}>
          <motion.div
            key={showAll ? "all" : "initial"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="rounded-md overflow-hidden border transition-all duration-300 group"
                style={{ background: 'var(--asu-ink)', borderColor: 'var(--asu-border)' }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-md flex-shrink-0" style={{ background: 'rgba(255,198,39,0.12)' }}>
                      <Award className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--asu-text)' }}>
                        {cert.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--asu-text-muted)' }}>
                        <Building2 className="w-4 h-4" />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--asu-text-muted)' }}>
                    {cert.description}
                  </p>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className="px-2 py-1 text-xs"
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
                          className="px-2 py-1 text-xs"
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

                  <div className="space-y-2 pb-4 border-b" style={{ borderColor: 'var(--asu-border)' }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--asu-text-muted)' }}>
                      <Calendar className="w-4 h-4" />
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
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-md font-semibold transition-all duration-300 text-sm"
                      style={{
                        background: 'var(--accent-bg-soft)',
                        color: 'var(--accent-color)',
                        border: '1px solid var(--accent-border-soft)'
                      }}
                    >
                      <ExternalLink size={16} />
                      <span>View Credential</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {remainingCerts.length > 0 && (
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all duration-300"
              style={{
                background: showAll ? 'var(--asu-ink)' : 'var(--accent-bg-soft)',
                color: showAll ? 'var(--asu-text)' : 'var(--accent-color)',
                border: `1px solid ${showAll ? 'var(--asu-border)' : 'var(--accent-border-soft)'}`
              }}
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
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}


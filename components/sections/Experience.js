import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, MapPin, Calendar, ChevronRight, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useDataFetch } from "@/hooks/useDataFetch";
import SectionHeader from "@/components/common/SectionHeader";

export default function Experience() {
  const { data: jobs, loading } = useDataFetch("/Data/Experience.json");
  const [selectedExperience, setSelectedExperience] = useState(null);

  if (loading || !jobs.length) {
    return (
      <section id="experience" className="py-16" style={{ background: 'var(--asu-ink)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ color: 'var(--asu-text-muted)' }}>Loading experience...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="experience" className="py-16" style={{ background: 'var(--asu-ink)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Experience" />

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="experience-card-hover cursor-pointer group rounded-lg border overflow-hidden"
                  onClick={() => setSelectedExperience(job)}
                  style={{
                    background: 'var(--asu-ink)',
                    borderColor: 'var(--asu-border)'
                  }}
                >
                  <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                    >
                      {job.logo ? (
                        <Image
                          src={job.logo}
                          alt={`${job.company} logo`}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain rounded-full"
                        />
                      ) : (
                        <div className="rounded-xl flex items-center justify-center shadow-md overflow-hidden" style={{
                          background: index % 2 === 0
                            ? 'linear-gradient(135deg, var(--asu-maroon) 0%, var(--asu-maroon-600) 100%)'
                            : 'linear-gradient(135deg, var(--asu-gold) 0%, var(--asu-gold-600) 100%)'
                        }}>
                          <Briefcase className="w-7 h-7 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--heading-accent)' }}>
                        {job.role}
                      </h3>
                      <p className="text-base font-semibold mb-2" style={{ color: 'var(--asu-text)' }}>
                        {job.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--asu-text-muted)' }}>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="hidden lg:flex flex-wrap items-center gap-2 max-w-xs">
                      {job.skills.slice(0, 4).map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className="px-3 py-1.5 text-xs font-medium rounded-full transition-all"
                          style={{
                            backgroundColor: 'var(--skill-badge-bg)',
                            color: 'var(--skill-badge-text)',
                            border: 'none'
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge
                          className="px-3 py-1.5 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: 'var(--asu-ink)',
                            color: 'var(--asu-text-muted)',
                            border: '1px solid var(--asu-border)'
                          }}
                        >
                          +{job.skills.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      className="w-6 h-6 transition-colors flex-shrink-0 hidden sm:block"
                      style={{
                        color: 'var(--asu-text-muted)'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modal */}
      <Dialog open={!!selectedExperience} onOpenChange={() => setSelectedExperience(null)}>
        {selectedExperience && (
          <>
            <DialogClose onClose={() => setSelectedExperience(null)} />
            <DialogHeader>
              <div className="flex items-start gap-4">
                {selectedExperience.logo ? (
                  <div className="w-16 h-16 flex items-center justify-center">
                    <Image
                      src={selectedExperience.logo}
                      alt={`${selectedExperience.company} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, var(--asu-maroon) 0%, var(--asu-maroon-600) 100%)'
                    }}
                  >
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-1">
                    {selectedExperience.role}
                  </DialogTitle>
                  <p className="text-xl font-semibold" style={{ color: 'var(--asu-text)' }}>
                    {selectedExperience.company}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-sm" style={{ color: 'var(--asu-text-muted)' }}>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedExperience.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedExperience.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <DialogContent className="space-y-6">
              {/* Responsibilities */}
              <div>
                <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--heading-accent)' }}>
                  Responsibilities & Contributions
                </h4>
                <ul className="space-y-2">
                  {selectedExperience.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ color: 'var(--asu-text-muted)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-color)' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Achievements */}
              {(selectedExperience.achievements && selectedExperience.achievements.length > 0) || 
               (selectedExperience.description && selectedExperience.description.some(item => 
                 item.match(/\d+%/) || item.toLowerCase().includes('reduce') || item.toLowerCase().includes('improve') || item.toLowerCase().includes('support')
               )) ? (
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--heading-accent)' }}>
                    <Award className="w-5 h-5" />
                    Key Achievements
                  </h4>
                  <div className="space-y-3">
                    {selectedExperience.achievements && selectedExperience.achievements.length > 0 ? (
                      selectedExperience.achievements.map((item, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg flex items-start gap-3"
                          style={{
                            background: 'var(--accent-bg-soft)',
                            border: '1px solid var(--accent-border-soft)'
                          }}
                        >
                          <span className="text-xl">🎯</span>
                          <span style={{ color: 'var(--asu-text)' }}>{item}</span>
                        </div>
                      ))
                    ) : (
                      selectedExperience.description
                        .filter(item => item.match(/\d+%/) || item.toLowerCase().includes('reduce') || item.toLowerCase().includes('improve') || item.toLowerCase().includes('support'))
                        .map((item, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg flex items-start gap-3"
                            style={{
                              background: 'var(--accent-bg-soft)',
                              border: '1px solid var(--accent-border-soft)'
                            }}
                          >
                            <span className="text-xl">🎯</span>
                            <span style={{ color: 'var(--asu-text)' }}>{item}</span>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              ) : null}

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--heading-accent)' }}>
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      className="px-3 py-1.5 text-xs font-medium rounded-full transition-all"
                      style={{
                        backgroundColor: 'var(--skill-badge-bg)',
                        color: 'var(--skill-badge-text)',
                        border: 'none'
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Eye, Code2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { useDataFetch } from "@/hooks/useDataFetch";
import SectionHeader from "@/Components/SectionHeader";

export default function Projects() {
  const { data: projects, loading } = useDataFetch("/Data/projects.json");
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading || !projects.length) {
    return (
      <section id="projects" className="py-16" style={{ background: 'var(--asu-ink)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ color: 'var(--asu-text-muted)' }}>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="py-16" style={{ background: 'var(--asu-ink)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Projects" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="experience-card-hover cursor-pointer group rounded-lg overflow-hidden"
                onClick={() => setSelectedProject(project)}
                style={{
                  background: 'var(--asu-ink)',
                  borderColor: 'var(--asu-border)',
                  border: '1px solid var(--asu-border)'
                }}
            >
              {project.image_url && (
                <div className="relative overflow-hidden">
                    <Image
                    src={project.image_url}
                    alt={project.title}
                      width={400}
                      height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--heading-accent)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--asu-text-muted)' }}>
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <Badge
                          key={i}
                          className="px-2 py-1 text-xs"
                          style={{
                            backgroundColor: 'var(--accent-bg-soft)',
                            color: 'var(--accent-color)',
                            border: '1px solid var(--accent-border-soft)'
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge
                          className="px-2 py-1 text-xs"
                          style={{
                            backgroundColor: 'var(--asu-ink)',
                            color: 'var(--asu-text-muted)',
                            border: '1px solid var(--asu-border)'
                          }}
                        >
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        {selectedProject && (
          <>
            <DialogClose onClose={() => setSelectedProject(null)} />
            <DialogHeader>
              <div className="flex items-start gap-4">
                {selectedProject.image_url ? (
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-xl">
                    <Image
                      src={selectedProject.image_url}
                      alt={selectedProject.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, var(--asu-maroon) 0%, var(--asu-maroon-600) 100%)'
                    }}
                      >
                    <Code2 className="w-10 h-10 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-2">
                    {selectedProject.title}
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>

            <DialogContent className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--heading-accent)' }}>
                  Overview
                </h4>
                <p style={{ color: 'var(--asu-text-muted)' }}>
                  {selectedProject.description}
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--heading-accent)' }}>
                  <ExternalLink className="w-5 h-5" />
                  Links
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.demo_url && (
                    <a
                      href={selectedProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md font-semibold transition-all duration-300 flex items-center gap-2 asu-btn-primary"
                    >
                      <Eye size={18} />
                      <span>View Live</span>
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md font-semibold transition-all duration-300 flex items-center gap-2"
                      style={{
                        background: 'var(--accent-bg-soft)',
                        color: 'var(--accent-color)',
                        border: '1px solid var(--accent-border-soft)'
                      }}
                    >
                      <Github size={18} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--heading-accent)' }}>
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className="px-3 py-1 text-sm"
                      style={{
                        backgroundColor: 'var(--accent-color)',
                        color: 'white'
                      }}
                    >
                      {tech}
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

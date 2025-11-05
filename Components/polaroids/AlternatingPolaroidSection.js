import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PolaroidStack from "./PolaroidStack";
import Lightbox from "./Lightbox";
import FilmGrain from "./FilmGrain";

const NEW_STREETS_ITEMS = [
  {
    id: "deer",
    type: "image",
    src: "/new-streets/Deer.jpg",
    alt: "A deer at the fence—welcome to elsewhere.",
    caption: "a deer at the fence."
  },
  {
    id: "bus-stop",
    type: "image",
    src: "/new-streets/bus-stop.jpg",
    alt: "I learned bus lines before shortcuts.",
    caption: "bus lines before shortcuts."
  },
  {
    id: "cooking",
    type: "image",
    src: "/new-streets/cooking.JPG",
    alt: "Burnt dinner twice; the third tasted like mine.",
    caption: "burnt dinner, then mine."
  },
  {
    id: "sunset-at-lake",
    type: "image",
    src: "/new-streets/sunset-at-lake.jpg",
    alt: "Sunset at the lake reset everything.",
    caption: "sunset at the lake."
  },
  {
    id: "sunset",
    type: "video",
    src: "/new-streets/sunset.webm",
    poster: "/new-streets/sunset-at-lake.jpg",
    alt: "The Circle - people who turned noise into music.",
    caption: "the circle.",
    star: true
  }
];

const CIRCLE_ITEMS = [
  {
    id: "celebration",
    type: "video",
    src: "/desk-build/Celebration.webm",
    poster: "/desk-build/Friends.jpg",
    alt: "Confetti in a small room was enough.",
    caption: "confetti in a small room."
  },
  {
    id: "gelato",
    type: "image",
    src: "/desk-build/gelato.JPG",
    alt: "Gelato after labs, laughter on loop.",
    caption: "gelato after labs."
  },
  {
    id: "me-at-horseshoebend",
    type: "image",
    src: "/desk-build/Me-at-horseshoebend.jpg",
    alt: "We drove to the bend to feel small.",
    caption: "we drove to the bend."
  },
  {
    id: "my-bestfriends",
    type: "image",
    src: "/desk-build/my-bestfriends.JPG",
    alt: "Work got better when we did it.",
    caption: "work got better."
  },
  {
    id: "friends",
    type: "image",
    src: "/desk-build/Friends.jpg",
    alt: "People who turned noise into music.",
    caption: "people who turned noise into music."
  }
];

const SMALL_JOYS_ITEMS = [
  {
    id: "dad",
    type: "image",
    src: "/small-joys/DAD.JPG",
    alt: "Dad is the blueprint.",
    caption: "dad is the blueprint."
  },
  {
    id: "mom",
    type: "image",
    src: "/small-joys/Mom.jpeg",
    alt: "Mom is the heartbeat.",
    caption: "mom is the heartbeat."
  },
  {
    id: "sister-with-her-daughter",
    type: "image",
    src: "/small-joys/Sister-with-her-daughter.jpg",
    alt: "My sister's steel; my niece's light.",
    caption: "sister's steel, niece's light."
  },
  {
    id: "my-niece",
    type: "video",
    src: "/small-joys/My-niece.webm",
    poster: "/small-joys/Home.jpeg",
    alt: "My niece's light.",
    caption: "niece's light."
  },
  {
    id: "home",
    type: "image",
    src: "/small-joys/Home.jpeg",
    alt: "Home is people.",
    caption: "home is people."
  }
];

export default function AlternatingPolaroidSection({ onPostCreditOpen = () => {} }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const openLightbox = (items, startIndex = 0) => {
    setLightboxItems(items);
    setLightboxStartIndex(startIndex);
    setLightboxOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.14
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <>
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        <FilmGrain />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Contact sheet label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p
              className="text-xs uppercase tracking-[0.2em] font-mono"
              style={{ color: '#F4F2EE' }}
            >
              ROLL 02 — NEW STREETS · ISO 400 • light leaks allowed
            </p>
          </motion.div>

          {/* Rows container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-24"
          >
            {/* Row 1: New Streets - Stack left, text right */}
            <motion.div
              variants={rowVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <PolaroidStack
                  title="New Streets"
                  items={NEW_STREETS_ITEMS}
                  placement="left"
                  onOpenLightbox={(startIndex) => openLightbox(NEW_STREETS_ITEMS, startIndex)}
                  onPostCreditOpen={onPostCreditOpen}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <h2
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  New Streets
                </h2>
                <p
                  className="text-xs tracking-[0.15em] mb-8 font-mono"
                  style={{ color: '#F4F2EE', opacity: 0.7 }}
                >
                  frames from the first months
                </p>
                <div
                  className="space-y-6 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  <p>A deer at the fence—welcome to elsewhere.</p>
                  <p>I learned bus lines before shortcuts.</p>
                  <p>Burnt dinner twice; the third tasted like mine.</p>
                  <p className="italic" style={{ opacity: 0.85, fontStyle: 'italic' }}>
                    Sunset at the lake reset everything.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Row 2: The Circle - Stack right, text left */}
            <motion.div
              variants={rowVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <h2
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  The Circle
                </h2>
                <p
                  className="text-xs tracking-[0.15em] mb-8 font-mono"
                  style={{ color: '#F4F2EE', opacity: 0.7 }}
                >
                  people who turned noise into music
                </p>
                <div
                  className="space-y-6 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  <p>Confetti in a small room was enough.</p>
                  <p>Gelato after labs, laughter on loop.</p>
                  <p>We drove to the bend to feel small.</p>
                  <p className="italic" style={{ opacity: 0.85, fontStyle: 'italic' }}>
                    Work got better when we did it.
                  </p>
                </div>
              </motion.div>
              <div className="order-1 lg:order-2">
                <PolaroidStack
                  title="The Circle"
                  items={CIRCLE_ITEMS}
                  placement="right"
                  orientation="landscape"
                  onOpenLightbox={(startIndex) => openLightbox(CIRCLE_ITEMS, startIndex)}
                  onPostCreditOpen={onPostCreditOpen}
                />
              </div>
            </motion.div>

            {/* Row 3: Small Joys - Stack left, text right */}
            <motion.div
              variants={rowVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <PolaroidStack
                  title="Small Joys"
                  items={SMALL_JOYS_ITEMS}
                  placement="left"
                  onOpenLightbox={(startIndex) => openLightbox(SMALL_JOYS_ITEMS, startIndex)}
                  onPostCreditOpen={onPostCreditOpen}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <h2
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  Small Joys
                </h2>
                <p
                  className="text-xs tracking-[0.15em] mb-8 font-mono"
                  style={{ color: '#F4F2EE', opacity: 0.7 }}
                >
                  home is people
                </p>
                <div
                  className="space-y-6 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  <p>Dad is the blueprint.</p>
                  <p>Mom is the heartbeat.</p>
                  <p>My sister's steel; my niece's light.</p>
                  <p className="italic" style={{ opacity: 0.85, fontStyle: 'italic' }}>
                    This is my why—every build is a thank-you.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Closing gold rule and text */}
            <motion.div
              variants={rowVariants}
              className="pt-12 mt-16"
            >
              <div
                className="w-24 h-px mx-auto mb-8"
                style={{ background: '#E9C46A' }}
              />
              <p
                className="text-center text-lg italic"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#F4F2EE',
                  opacity: 0.8
                }}
              >
                somewhere between quiet streets and loud thoughts, I found my rhythm.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        items={lightboxItems}
        isOpen={lightboxOpen}
        startIndex={lightboxStartIndex}
        onClose={() => setLightboxOpen(false)}
        onPostCreditOpen={onPostCreditOpen}
      />
    </>
  );
}


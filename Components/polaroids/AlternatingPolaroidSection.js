import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PolaroidStack from "./PolaroidStack";
import Lightbox from "./Lightbox";
import FilmGrain from "./FilmGrain";
import TitleTag from "./TitleTag";

const NEW_STREETS_ITEMS = [
  {
    id: "deer",
    type: "image",
    src: "/new-streets/Deer.jpg",
    alt: "Deer at the fence",
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
    alt: "Confetti in a small room",
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

export default function AlternatingPolaroidSection({ 
  onPostCreditOpen = () => {},
  newStreetsCaption = null,
  circleCaption = null,
  smallJoysCaption = null
}) {
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
            <motion.figure
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
              <motion.figcaption
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2 self-center"
              >
                {newStreetsCaption && (
                  <TitleTag
                    title={newStreetsCaption.title}
                    meta={newStreetsCaption.meta}
                    oneLiner={newStreetsCaption.oneLiner}
                  />
                )}
              </motion.figcaption>
            </motion.figure>

            {/* Row 2: The Circle - Stack right, text left */}
            <motion.figure
              variants={rowVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <motion.figcaption
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1 self-center"
              >
                {circleCaption && (
                  <TitleTag
                    title={circleCaption.title}
                    meta={circleCaption.meta}
                    oneLiner={circleCaption.oneLiner}
                  />
                )}
              </motion.figcaption>
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
            </motion.figure>

            {/* Row 3: Small Joys - Stack left, text right */}
            <motion.figure
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
              <motion.figcaption
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2 self-center"
              >
                {smallJoysCaption && (
                  <TitleTag
                    title={smallJoysCaption.title}
                    meta={smallJoysCaption.meta}
                    oneLiner={smallJoysCaption.oneLiner}
                  />
                )}
              </motion.figcaption>
            </motion.figure>

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


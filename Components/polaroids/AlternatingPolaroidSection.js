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
    alt: "A deer in a natural setting.",
    caption: "deer."
  },
  {
    id: "cooking",
    type: "image",
    src: "/new-streets/cooking.JPG",
    alt: "Cooking scene, a moment in the kitchen.",
    caption: "cooking."
  },
  {
    id: "bus-stop",
    type: "image",
    src: "/new-streets/bus-stop.jpg",
    alt: "Empty bus stop bench, quiet moment.",
    caption: "bus-stop."
  },
  {
    id: "sunset-at-lake",
    type: "image",
    src: "/new-streets/sunset-at-lake.jpg",
    alt: "Sunset reflecting on a calm lake.",
    caption: "sunset at lake."
  },
  {
    id: "sunset",
    type: "video",
    src: "/new-streets/sunset.webm",
    poster: "/new-streets/sunset-at-lake.jpg",
    alt: "Sunset video, peaceful moment.",
    caption: "sunset.",
    star: true
  }
];

const DESK_BUILD_ITEMS = [
  {
    id: "celebration",
    type: "video",
    src: "/desk-build/Celebration.webm",
    poster: "/desk-build/Friends.jpg",
    alt: "Celebration moment, joy and accomplishment.",
    caption: "celebration."
  },
  {
    id: "friends",
    type: "image",
    src: "/desk-build/Friends.jpg",
    alt: "Friends together, shared moments.",
    caption: "friends."
  },
  {
    id: "gelato",
    type: "image",
    src: "/desk-build/gelato.JPG",
    alt: "Gelato, a sweet treat.",
    caption: "gelato."
  },
  {
    id: "me-at-horseshoebend",
    type: "image",
    src: "/desk-build/Me-at-horseshoebend.jpg",
    alt: "Me at Horseshoe Bend, adventure moment.",
    caption: "me at horseshoe bend."
  },
  {
    id: "my-bestfriends",
    type: "image",
    src: "/desk-build/my-bestfriends.JPG",
    alt: "My best friends, treasured relationships.",
    caption: "my best friends."
  }
];

const SMALL_JOYS_ITEMS = [
  {
    id: "my-niece",
    type: "video",
    src: "/small-joys/My-niece.webm",
    poster: "/small-joys/Home.jpeg",
    alt: "My niece, precious family moment.",
    caption: "my niece."
  },
  {
    id: "home",
    type: "image",
    src: "/small-joys/Home.jpeg",
    alt: "Home, a place of comfort and belonging.",
    caption: "home."
  },
  {
    id: "sister-with-her-daughter",
    type: "image",
    src: "/small-joys/Sister-with-her-daughter.jpg",
    alt: "Sister with her daughter, family love.",
    caption: "sister with her daughter."
  },
  {
    id: "dad",
    type: "image",
    src: "/small-joys/DAD.JPG",
    alt: "Dad, family bond.",
    caption: "dad."
  },
  {
    id: "mom",
    type: "image",
    src: "/small-joys/Mom.jpeg",
    alt: "Mom, unconditional love.",
    caption: "mom."
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
                  className="text-xs uppercase tracking-[0.15em] mb-8 font-mono"
                  style={{ color: '#F4F2EE', opacity: 0.7 }}
                >
                  FRAMES FROM THE FIRST MONTHS
                </p>
                <div
                  className="space-y-6 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  <p>Moving to the U.S. flipped my world into grayscale.</p>
                  <p>New streets. New silence. New self.</p>
                  <p>
                    That's where adulting began — learning, unlearning, missing home, finding calm inside chaos.
                  </p>
                  <p className="italic" style={{ opacity: 0.8 }}>
                    still calling mom for recipes.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Row 2: The Desk & The Build - Stack right, text left */}
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
                  The Desk & The Build
                </h2>
                <p
                  className="text-xs uppercase tracking-[0.15em] mb-8 font-mono"
                  style={{ color: '#F4F2EE', opacity: 0.7 }}
                >
                  TOOLS, HABITS, TEMPO
                </p>
                <div
                  className="space-y-6 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  <p>Perfection isn't control — it's care.</p>
                  <p>I listen first, then ship.</p>
                  <p>If it doesn't move people, it isn't done.</p>
                </div>
              </motion.div>
              <div className="order-1 lg:order-2">
                <PolaroidStack
                  title="The Desk & The Build"
                  items={DESK_BUILD_ITEMS}
                  placement="right"
                  orientation="landscape"
                  onOpenLightbox={(startIndex) => openLightbox(DESK_BUILD_ITEMS, startIndex)}
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
                  className="text-xs uppercase tracking-[0.15em] mb-8 font-mono"
                  style={{ color: '#F4F2EE', opacity: 0.7 }}
                >
                  THE LITTLE THINGS
                </p>
                <div
                  className="space-y-6 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#F4F2EE'
                  }}
                >
                  <p>The little things keep the big things human.</p>
                  <p>I'm 75% happy on most days — the rest is curiosity.</p>
                  <p className="italic" style={{ opacity: 0.8 }}>
                    still learning. still dancing between logic and emotion.
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


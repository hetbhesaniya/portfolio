import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * @typedef {Object} PolaroidItem
 * @property {string} id
 * @property {"image" | "video"} type
 * @property {string} src
 * @property {string} [poster]
 * @property {string} alt
 * @property {string} caption
 * @property {boolean} [star]
 */

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {PolaroidItem[]} props.items
 * @param {"left" | "right"} [props.placement]
 * @param {"portrait" | "landscape"} [props.orientation]
 * @param {Function} [props.onOpenLightbox]
 * @param {Function} [props.onPostCreditOpen]
 * @param {string} [props.className]
 */
export default function PolaroidStack({
  title,
  items,
  placement = "left",
  orientation = "portrait",
  onOpenLightbox = () => {},
  onPostCreditOpen = () => {},
  className = ""
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // Check if hint was shown before
    const seenHint = sessionStorage.getItem("seenPolaroidHint");
    if (!seenHint) {
      const timer = setTimeout(() => setShowHint(true), 800);
      const hideTimer = setTimeout(() => setShowHint(false), 2000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleInteraction = () => {
    if (showHint) {
      setShowHint(false);
      sessionStorage.setItem("seenPolaroidHint", "true");
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    handleInteraction();
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next
        setCurrentIndex((prev) => (prev + 1) % items.length);
      } else {
        // Swipe right - previous
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    }
  };

  const handleNext = () => {
    handleInteraction();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrevious = () => {
    handleInteraction();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const topCard = items[currentIndex];
  const visibleStack = items.slice(currentIndex, currentIndex + 3).concat(
    items.slice(0, Math.max(0, 3 - (items.length - currentIndex)))
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* One-time hint overlay */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
            style={{ color: '#F4F2EE' }}
          >
            <p className="text-xs font-mono whitespace-nowrap">
              {isTouchDevice ? "Swipe to see more →" : "Use arrows to navigate"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stack container */}
      <div
        className="relative max-w-[340px] w-full mx-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ minHeight: '380px' }}
      >
        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-12 z-30 bg-black/60 hover:bg-black/80 text-[#F4F2EE] hover:text-[#E9C46A] p-1.5 md:p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E9C46A] focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="md:w-5 md:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12 z-30 bg-black/60 hover:bg-black/80 text-[#F4F2EE] hover:text-[#E9C46A] p-1.5 md:p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E9C46A] focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            </button>
          </>
        )}
        {visibleStack.map((item, stackIndex) => {
          const isTop = stackIndex === 0;
          const zIndex = 10 - stackIndex;
          // More visible peeking - alternate left/right for natural stack
          const offsetX = stackIndex === 1 ? -15 : stackIndex === 2 ? 12 : 0;
          const offsetY = stackIndex * 12;
          const rotation = isTop ? ((currentIndex % 5) - 2) * 1.2 : (stackIndex % 2 === 0 ? -0.8 : 0.8);

          return (
            <motion.figure
              key={`${item.id}-${currentIndex}-${stackIndex}`}
              initial={isTop && !prefersReducedMotion ? { opacity: 0, y: 16 } : { opacity: stackIndex === 0 ? 1 : 0.9 }}
              animate={isTop ? { opacity: 1, y: 0 } : { opacity: stackIndex === 1 ? 0.9 : 0.8 }}
              transition={{ duration: 0.4 }}
              className="absolute group cursor-pointer"
              style={{
                zIndex,
                left: `${offsetX}px`,
                top: `${offsetY}px`,
                transform: `rotate(${rotation}deg)`,
                filter: 'grayscale(100%)',
                width: stackIndex === 0 ? '100%' : stackIndex === 1 ? '97%' : '94%'
              }}
              tabIndex={-1}
              role="presentation"
            >
              {/* Gold edge glow on hover */}
              <div
                className="absolute -inset-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm"
                style={{
                  border: '1px solid #E9C46A',
                  boxShadow: '0 0 12px rgba(233, 196, 106, 0.4)',
                  zIndex: 20
                }}
              />

              {/* Polaroid frame */}
              <div
                className="relative bg-white transition-all duration-300 flex flex-col"
                style={{
                  padding: '8px 8px 0 8px',
                  paddingBottom: isTop ? '0' : '0',
                  boxShadow: isTop ? '0 4px 20px rgba(0,0,0,0.35)' : '0 2px 12px rgba(0,0,0,0.25)',
                  borderBottom: isTop ? '0' : '12px solid white'
                }}
              >
                {/* Media content */}
                <div className={`relative overflow-hidden bg-black ${orientation === "landscape" ? "aspect-[5/4]" : "aspect-[4/5]"}`}>
                  {item.type === "video" ? (
                    <>
                      {isTop ? (
                        <video
                          src={item.src}
                          poster={item.poster}
                          autoPlay
                          loop
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                          style={{ filter: 'grayscale(100%)' }}
                          aria-label={item.alt}
                          preload="metadata"
                        />
                      ) : (
                        <Image
                          src={item.poster || item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 340px, 340px"
                          quality={75}
                        />
                      )}
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      loading={isTop ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 340px, 340px"
                      quality={isTop ? 85 : 70}
                    />
                  )}
                </div>

                {/* Caption area - always visible on top card */}
                {isTop && (
                  <div className="bg-white" style={{ paddingBottom: '12px' }}>
                    <figcaption
                      className="mt-2 px-2 pb-1 text-center"
                      style={{
                        fontFamily: "'Caveat', 'Dancing Script', 'Brush Script MT', cursive",
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#0A0A0A',
                        letterSpacing: '0.02em',
                        lineHeight: '1.4',
                        minHeight: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'rotate(-0.5deg)',
                        fontStyle: 'normal'
                      }}
                    >
                      {item.caption}
                    </figcaption>
                  </div>
                )}
              </div>

              {/* Gold count badge - only on top card */}
              {isTop && (
                <div
                  className="absolute right-4 bg-[#E9C46A] text-[#0A0A0A] text-xs font-bold px-2 py-0.5 rounded-sm shadow-md"
                  style={{ 
                    zIndex: 25,
                    bottom: '48px'
                  }}
                >
                  {items.length}
                </div>
              )}
            </motion.figure>
          );
        })}
      </div>


      {/* Mobile indicator */}
      {isTouchDevice && (
        <div className="mt-2 text-center text-xs" style={{ color: '#F4F2EE', opacity: 0.6 }}>
          {currentIndex + 1} / {items.length}
        </div>
      )}
    </div>
  );
}


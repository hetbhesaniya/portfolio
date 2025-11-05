import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
 * @param {PolaroidItem[]} props.items
 * @param {boolean} props.isOpen
 * @param {number} [props.startIndex]
 * @param {Function} props.onClose
 * @param {Function} [props.onPostCreditOpen]
 */
export default function Lightbox({
  items,
  isOpen,
  startIndex = 0,
  onClose,
  onPostCreditOpen = () => {}
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [preloadedIndices, setPreloadedIndices] = useState(new Set());
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
      preloadNeighbors(startIndex);
    }
  }, [isOpen, startIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen && items[currentIndex]?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen, currentIndex, items]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    // Trap focus
    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleTab);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const preloadNeighbors = (index) => {
    const neighbors = [
      (index - 1 + items.length) % items.length,
      (index + 1) % items.length
    ];
    neighbors.forEach((idx) => {
      if (!preloadedIndices.has(idx)) {
        const item = items[idx];
        if (item.type === "image") {
          // Use native browser Image constructor, not Next.js Image component
          const img = new window.Image();
          img.src = item.src;
        } else if (item.poster) {
          // Use native browser Image constructor, not Next.js Image component
          const img = new window.Image();
          img.src = item.poster;
        }
        setPreloadedIndices((prev) => new Set([...prev, idx]));
      }
    });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    preloadNeighbors(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    preloadNeighbors(prevIndex);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentItem = items[currentIndex];
  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="absolute inset-0 bg-black/95"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="relative w-full max-w-4xl mx-4 z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-[#F4F2EE] hover:text-[#E9C46A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9C46A] rounded p-2"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Media container */}
          <figure className="relative bg-black rounded-lg overflow-hidden">
            <div className="relative bg-black flex items-center justify-center" style={{ minHeight: '60vh', maxHeight: '90vh', width: '100%' }}>
              {currentItem.type === "video" ? (
                <video
                  ref={videoRef}
                  src={currentItem.src}
                  poster={currentItem.poster}
                  autoPlay
                  loop
                  playsInline
                  muted
                  preload="auto"
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  style={{ filter: 'grayscale(100%)' }}
                  aria-label={currentItem.alt}
                  onLoadedData={() => {
                    if (videoRef.current) {
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={currentItem.src}
                    alt={currentItem.alt}
                    fill
                    className="object-contain"
                    loading="eager"
                    priority
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    quality={90}
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
              )}

              {/* Star badge */}
              {currentItem.star && (
                <button
                  onClick={onPostCreditOpen}
                  className="absolute top-4 right-4 text-2xl focus:outline-none focus:ring-2 focus:ring-[#E9C46A] rounded p-1"
                  style={{ color: '#E9C46A' }}
                  aria-label="Open post-credit scene"
                  title="post-credit scene"
                >
                  ⭐
                </button>
              )}
            </div>

            {/* Navigation arrows */}
            {items.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#F4F2EE] p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#F4F2EE] p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Counter */}
            <div
              className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-sm font-mono"
              style={{ color: '#F4F2EE' }}
            >
              {currentIndex + 1} / {items.length}
            </div>
          </figure>

          {/* Caption */}
          <figcaption
            id="lightbox-title"
            className="mt-4 text-center text-sm"
            style={{
              fontFamily: 'ui-rounded, system-ui, sans-serif',
              fontStyle: 'italic',
              color: '#F4F2EE',
              letterSpacing: '0.05em'
            }}
          >
            {currentItem.caption}
          </figcaption>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


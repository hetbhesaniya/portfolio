import { useState, useEffect, useRef } from 'react';

export default function StoryModeHint() {
  const [text, setText] = useState("psst... there's a story mode ✨");
  const revertTimerRef = useRef(null);
  const highlightTimerRef = useRef(null);

  const handleClick = () => {
    // Clear any existing timers
    if (revertTimerRef.current) {
      clearTimeout(revertTimerRef.current);
    }
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
    }

    // Find the story trigger element
    const trigger = document.querySelector('[data-story-trigger]');

    if (trigger) {
      // Update text
      setText("See the blinking icon above - Tap to know more about me ✨");

      // Scroll to trigger
      trigger.scrollIntoView({ 
        behavior: "smooth", 
        block: "center", 
        inline: "center" 
      });

      // Add highlight classes after a brief delay to ensure scroll starts
      setTimeout(() => {
        trigger.classList.add(
          'ring-4',
          'ring-offset-2',
          'ring-rose-700',
          'animate-pulse',
          'rounded-lg'
        );

        // Remove highlight after ~3200ms
        highlightTimerRef.current = setTimeout(() => {
          trigger.classList.remove(
            'ring-4',
            'ring-offset-2',
            'ring-rose-700',
            'animate-pulse',
            'rounded-lg'
          );
        }, 3200);
      }, 100);

      // Move focus if focusable
      setTimeout(() => {
        if (trigger && typeof trigger.focus === 'function') {
          try {
            trigger.focus();
          } catch (e) {
            // If focus fails, keep focus on button
          }
        }
      }, 400);

      // Auto-revert text after ~6000ms
      revertTimerRef.current = setTimeout(() => {
        setText("psst... there's a story mode ✨");
      }, 6000);
    } else {
      // No target found - show fallback
      setText("Look for the 🎬 Story Mode button in the header.");

      // Auto-revert after ~6000ms
      revertTimerRef.current = setTimeout(() => {
        setText("psst... there's a story mode ✨");
      }, 6000);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (revertTimerRef.current) {
        clearTimeout(revertTimerRef.current);
      }
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      aria-label="Reveal how to enter Story Mode"
      className="text-xs italic transition-opacity duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1"
      style={{
        textDecoration: 'underline',
        textDecorationStyle: 'dotted',
        color: 'var(--asu-text-muted)'
      }}
    >
      {text}
    </button>
  );
}

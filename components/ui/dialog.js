import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onOpenChange}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-lg shadow-xl"
              style={{
                background: 'var(--asu-ink)',
                border: '1px solid var(--asu-border)'
              }}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DialogHeader({ children }) {
  return <div className="p-6 border-b" style={{ borderColor: 'var(--asu-border)' }}>{children}</div>;
}

export function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-2xl font-bold ${className}`} style={{ color: 'var(--heading-accent)' }}>{children}</h2>;
}

export function DialogContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function DialogClose({ onClose }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="absolute top-4 right-4 p-2 rounded-full transition-colors"
      style={{ color: 'var(--asu-text-muted)' }}
    >
      <X size={24} />
    </motion.button>
  );
}


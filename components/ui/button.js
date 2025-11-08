import { motion } from "framer-motion";

export function Button({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "", 
  disabled = false,
  loading = false,
  fullWidth = false,
  as: Component = "button",
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed " +
    "active:scale-95 ";

  const variants = {
    primary: "bg-[var(--hero-button-bg)] text-[var(--hero-button-text)] hover:brightness-110 " +
      "shadow-md hover:shadow-lg focus:ring-[var(--accent-color)] " +
      "border border-transparent",
    secondary: "bg-[var(--accent-bg-soft)] text-[var(--accent-color)] " +
      "border border-[var(--accent-border-soft)] hover:bg-[var(--accent-bg-soft)] hover:brightness-110 " +
      "focus:ring-[var(--accent-color)] shadow-sm hover:shadow-md",
    outline: "bg-transparent text-[var(--asu-text)] " +
      "border-2 border-[var(--asu-border)] hover:border-[var(--accent-color)] " +
      "hover:text-[var(--accent-color)] focus:ring-[var(--accent-color)]",
    ghost: "bg-transparent text-[var(--asu-text)] hover:bg-[var(--accent-bg-soft)] " +
      "hover:text-[var(--accent-color)] focus:ring-[var(--accent-color)] border border-transparent"
  };

  const sizes = {
    sm: "px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-md gap-1.5 sm:gap-2",
    md: "px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg gap-2",
    lg: "px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-lg gap-2 sm:gap-3",
    xl: "px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl rounded-lg gap-3"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  const motionProps = Component === "button" 
    ? {
        whileHover: !disabled && !loading ? { scale: 1.02, y: -1 } : {},
        whileTap: !disabled && !loading ? { scale: 0.98 } : {},
        disabled: disabled || loading
      }
    : {};

  const content = loading ? (
    <div className="flex items-center justify-center gap-2">
      <div 
        className="animate-spin rounded-full border-2 border-current border-t-transparent"
        style={{
          width: size === "sm" ? "14px" : size === "md" ? "16px" : size === "lg" ? "18px" : "20px",
          height: size === "sm" ? "14px" : size === "md" ? "16px" : size === "lg" ? "18px" : "20px"
        }}
      />
      <span>Loading...</span>
    </div>
  ) : (
    children
  );

  if (Component === "button") {
    return (
      <motion.button
        {...motionProps}
        className={buttonClass}
        style={{
          minHeight: size === "sm" ? "32px" : size === "md" ? "40px" : size === "lg" ? "48px" : "56px",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent"
        }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  // For anchor tags and other components
  return (
    <motion.a
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={buttonClass}
      style={{
        minHeight: size === "sm" ? "32px" : size === "md" ? "40px" : size === "lg" ? "48px" : "56px",
        textDecoration: "none",
        display: "inline-flex",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent"
      }}
      {...props}
    >
      {content}
    </motion.a>
  );
}

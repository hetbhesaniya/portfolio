export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}


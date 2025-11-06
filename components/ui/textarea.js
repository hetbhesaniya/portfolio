export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${className}`}
      {...props}
    />
  );
}

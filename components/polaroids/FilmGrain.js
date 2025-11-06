/**
 * Subtle film grain overlay component
 */
export default function FilmGrain({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-[0.08] ${className}`}
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 400 400\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'grain\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23grain)\\'/%3E%3C/svg%3E')`,
        backgroundSize: '400px 400px'
      }}
      aria-hidden="true"
    />
  );
}


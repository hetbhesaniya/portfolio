import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--asu-ink)', color: 'var(--asu-text)' }}>
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--heading-accent)' }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-xl mb-8" style={{ color: 'var(--asu-text-muted)' }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-md font-semibold transition-all duration-300 inline-block"
          style={{
            background: 'var(--accent-color)',
            color: 'white'
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}


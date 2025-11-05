import { motion } from "framer-motion";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="py-12" style={{ background: 'var(--asu-ink)', borderTop: '1px solid var(--asu-border)' }}>
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mb-8 text-2xl font-bold cursor-pointer transition-colors duration-300 asu-text-glow"
                        style={{ color: 'var(--heading-accent)' }}
                    >
                        Het Bhesaniya
                    </motion.button>
                    
                    <div className="flex items-center justify-center space-x-2 mb-2" style={{ color: 'var(--asu-text-muted)' }}>
                        <span>Forged with code, refined by data</span>
                    </div>
                    
                    <p className="text-xs italic mb-4" style={{ color: 'var(--asu-text-muted)' }}>
                        psst... there's a story mode ✨
                    </p>
                    
                    <p className="text-sm" style={{ color: 'var(--asu-text-muted)' }}>
                        © {new Date().getFullYear()} Het Bhesaniya. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

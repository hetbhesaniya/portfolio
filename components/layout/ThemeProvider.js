import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "asu-light", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("asu-light");

    // Load saved theme
    useEffect(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
        if (saved === "asu-dark" || saved === "asu-light") {
            setTheme(saved);
        }
    }, []);

    // Apply theme to <html> attribute for CSS variables
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const value = useMemo(() => ({
        theme,
        toggleTheme: () => setTheme((t) => (t === "asu-dark" ? "asu-light" : "asu-dark")),
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

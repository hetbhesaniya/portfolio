import Navigation from "../Components/layout/Navigation";
import Hero from "../Components/sections/Hero";
import About from "../Components/sections/About";
import Experience from "../Components/sections/Experience";
import Skills from "../Components/sections/Skills";
import Projects from "../Components/sections/Projects";
import Certifications from "../Components/sections/Certifications";
import Contact from "../Components/sections/Contact";
import Footer from "../Components/layout/Footer";

export default function Portfolio() {
    return (
        <div className="overflow-x-hidden">
            <Navigation />
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
        </div>
    );
}
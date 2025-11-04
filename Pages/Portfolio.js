import Navigation from "../Components/Navigation";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Experience from "../Components/Experience";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Certifications from "../Components/Certifications";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

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
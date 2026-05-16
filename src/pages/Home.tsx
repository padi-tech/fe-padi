import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import Projects from "../components/home/Projects";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonials";
import Contact from "../components/home/Contact";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = location.hash.slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="mt-20 hero-gradient">
        <Hero />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

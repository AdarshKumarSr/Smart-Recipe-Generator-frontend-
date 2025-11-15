import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import bgimg from "../assets/meal.jpeg";
import ContactUs from "./ContactForm";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current.querySelectorAll(".fade"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background (normal brightness) */}
      <img
        src={bgimg}
        alt="Background Meal"
        className="absolute top-0 left-0 w-full h-full object-cover brightness-105"
      />

      {/* Light Overlay (NOT too heavy, fixes brightness problem) */}
      <div className="absolute inset-0 bg-white/25"></div>

      {/* Glass card (lighter blur → smooth performance) */}
      <div
        className="
          relative z-10 max-w-3xl mx-auto px-10 py-10
          rounded-3xl bg-white/30 backdrop-blur-md
          border border-white/40 shadow-xl fade
        "
      >
        <h1 className="fade text-6xl font-extrabold mb-4 text-gray-900 drop-shadow">
          Cuisinex
        </h1>

        <p className="fade text-lg sm:text-xl text-gray-800 mb-8 leading-relaxed">
          Your <span className="text-orange-500 font-semibold">AI Kitchen Companion</span> —
          discover smart recipes tailored to your ingredients & taste.
        </p>

        <div className="fade flex justify-center gap-6">
          <Link
            to="/recipes"
            className="
              bg-gradient-to-r from-orange-400 to-orange-600
              text-white px-8 py-3 rounded-xl font-semibold
              shadow-lg hover:scale-105 transition
            "
          >
            🍳 Start Cooking
          </Link>

          <Link
            to="/contact"
            className="
              border border-gray-700 text-gray-900 px-8 py-3 rounded-xl
              hover:bg-gray-900 hover:text-white transition shadow
            "
          >
            contact us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ServiceCard from "../Components/ServiceCard";
import Footer from "../Components/Footer";
import { ChefHat, Search, Salad, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      icon: Search,
      title: "Ingredient-Based Search",
      description:
        "Enter whatever you have at home — and get recipe ideas instantly powered by AI.",
    },
    {
      icon: ChefHat,
      title: "Smart Recipe Suggestions",
      description:
        "Our algorithm picks the best 5 matches from thousands of recipes for your ingredients.",
    },
    {
      icon: Salad,
      title: "Healthy & Dietary Filters",
      description:
        "Filter recipes by diet — vegetarian, vegan, keto, or protein-rich meals in one click.",
    },
    {
      icon: Sparkles,
      title: "Personalized Recommendations",
      description:
        "Cuisinex learns your cooking style and tailors recipes for your taste over time.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in heading
      gsap.from(".services-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Fade in subheading
      gsap.from(".services-subheading", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Animate cards stagger
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20 flex flex-col min-h-screen bg-orange-50/30">
      <section
        ref={containerRef}
        className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center"
      >
        <h1 className="services-heading text-4xl font-bold text-gray-800 mb-4">
          What Makes <span className="text-orange-500">Cuisinex</span> Special?
        </h1>

        <p className="services-subheading text-gray-600 max-w-2xl mb-16">
          Discover how Cuisinex turns your kitchen into a smart cooking space —
          with recipes designed around your ingredients, health, and taste.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Cook Smarter? 🍳
        </h2>
        <p className="mb-6">
          Start your culinary journey with intelligent recipe suggestions today.
        </p>
        <a
          href="/recipes"
          className="bg-white text-orange-600 px-6 py-3 rounded-md font-semibold hover:bg-orange-50 transition"
        >
          Explore Recipes
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

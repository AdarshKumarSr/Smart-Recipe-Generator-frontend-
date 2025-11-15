import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import pizza from "../assets/pizza.png";
import squash from "../assets/squash.png";
import { findRecipes } from "../Api/RecipeApi";
import MoodCard from "../Components/MoodCard";

const Home = () => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch recommended recipes on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await findRecipes("tomato, egg");
        setRecommended(data.slice(0, 3)); // show top 3 recipes
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-orange-50">
      {/* HERO */}
      <Hero />

      {/* Popular Dishes */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center tracking-tight">
          Explore Our Popular Dishes 🍽️
        </h2>

        <p className="text-gray-600 mb-14 text-center max-w-2xl mx-auto text-lg">
          Hand-crafted recipes that deliver taste, freshness, and innovation —
          curated especially for your culinary journey.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* --- Card 1 --- */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            <img src={squash} alt="Pasta Primavera" className="h-56 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Pasta Primavera
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A vibrant fusion of squash & veggies — light, fresh, and perfect for any occasion.
              </p>
            </div>
          </div>

          {/* --- Card 2 --- */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            <img src={pizza} alt="Cheesy Pizza" className="h-56 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cheesy Pizza
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Crispy crust, rich sauce, and melty cheese — pure perfection from our kitchen.
              </p>
            </div>
          </div>

          {/* <- mood card --> */}
          <MoodCard />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const allMoods = [
  { label: "⚡ Quick Snack", url: "quick+snack", color: "from-orange-400 to-orange-600" },
  { label: "🥗 Healthy Meal", url: "healthy+meal", color: "from-green-400 to-green-600" },
  { label: "🍲 Comfort Food", url: "comfort+food", color: "from-yellow-400 to-yellow-600" },
  { label: "💪 High Protein", url: "high+protein", color: "from-blue-400 to-blue-600" },
  { label: "🍰 Sweet Dessert", url: "sweet+dessert", color: "from-pink-400 to-pink-600" },
  { label: "🌶️ Spicy Craving", url: "spicy+craving", color: "from-red-400 to-red-600" },
  { label: "⏳ Lazy 5-Minute", url: "lazy+5+minute", color: "from-purple-400 to-purple-600" },
  { label: "🌿 Vegan Delight", url: "vegan+delight", color: "from-emerald-400 to-emerald-600" },
];

export default function MoodCard() {
  const [moods, setMoods] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    shuffleMoods();
  }, []);

  const shuffleMoods = () => {
    const random = [...allMoods].sort(() => Math.random() - 0.5).slice(0, 4);
    setMoods(random);

    gsap.fromTo(
      boxRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.4, ease: "power2.out" }
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">

      <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Find Your Flavor
      </h3>

      <p className="text-gray-600 text-sm text-center mb-6">
        Pick your vibe — we’ll suggest the perfect dish.
      </p>

      <button
        onClick={shuffleMoods}
        className="
          w-full py-3 bg-gray-900 text-white rounded-xl font-semibold
          hover:bg-gray-800 active:scale-95 transition-all shadow-md mb-6
        "
      >
        check it out 🔄
      </button>

      <div ref={boxRef} className="grid grid-cols-2 gap-4 mt-2">
        {moods.map((mood, idx) => (
          <button
            key={idx}
            onClick={() => (window.location.href = `/recipes?ai=${mood.url}`)}
            className={`
              bg-gradient-to-r ${mood.color}
              text-white py-3 px-3 text-sm font-semibold rounded-xl
              hover:scale-[1.04] active:scale-95 transition-all shadow-lg
              hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]
            `}
          >
            {mood.label}
          </button>
        ))}
      </div>

      {/* ⚠️ AI Warning */}
      <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
        ⚠️ <span className="font-semibold">Note:</span> AI suggestions rely on a free-tier API.  
        At peak hours the AI may respond slower, return a fallback recipe,
        or temporarily stop working.  
        If this happens, try again after a few seconds.
      </p>

      {/* Hidden tailwind injector */}
      <div className="hidden">
        from-orange-400 to-orange-600
        from-green-400 to-green-600
        from-yellow-400 to-yellow-600
        from-blue-400 to-blue-600
        from-pink-400 to-pink-600
        from-red-400 to-red-600
        from-purple-400 to-purple-600
        from-emerald-400 to-emerald-600
        bg-gradient-to-r
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { findRecipes, aiRecipe } from "../Api/RecipeApi";

const placeholderImg = "https://via.placeholder.com/200x200.png?text=Food";

export default function Recipes() {
  const location = useLocation();
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [aiRecipeData, setAiRecipeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiBtn, setAiBtn] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [filters, setFilters] = useState({
    diet: "",
    difficulty: "",
    cuisine: "",
    tag: "",
    maxTime: "",
    minRating: "",
  });

  const normalize = (item) => (item.recipe ? item.recipe : item);

  const sanitizeAI = (obj) => ({
    name: obj?.name || "Unnamed Dish",
    ingredients: obj?.ingredients || [],
    instructions: obj?.instructions || "",
    timeMinutes: obj?.timeMinutes || 10,
    difficulty: obj?.difficulty || "easy",
    servingSize: obj?.servingSize || "N/A",
    cuisine: obj?.cuisine || "N/A",
    rating: obj?.rating || 4,
    reviewsCount: obj?.reviewsCount || 10,
    calories: obj?.calories || 200,
    protein: obj?.protein || 10,
    tags: obj?.tags || [],
    dietTags: obj?.dietTags || [],
    youtubeLink: obj?.youtubeLink || "",
    imageUrl: obj?.imageUrl || null,
    imageBase64: obj?.imageBase64 || null,
  });


  const runUnifiedSearch = async () => {
    if (!ingredients.trim()) return alert("Enter ingredients!");

    setLoading(true);
    setAiBtn(false);
    setAiRecipeData(null);

    try {
      const payload = {
        ingredientsText: ingredients,
        ...filters,
      };

      const data = await findRecipes(payload);
      console.log("Unified /find response:", data);

      //  Backend says: use AI
      if (data.aiSuggested === true) {
        setAiBtn(true);
        setRecipes([]);
        setAiRecipeData(null);
        return;
      }

      //  DB RESULTS (MatchResult array)
      if (Array.isArray(data)) {
        // BUT array is empty → no match → AI button
        if (data.length === 0) {
          setAiBtn(true);
          setRecipes([]);
          return;
        }

        // Valid DB match
        setRecipes(data.map(normalize));
        setAiBtn(false);
        setAiRecipeData(null);
        return;
      }

      //  Gemini result returned recipe=null → AI fallback
      if (data.recipe === null) {
        setAiBtn(true);
        setRecipes([]);
        return;
      }

      // Should never hit, but safe AI fallback
      setAiBtn(true);
      setRecipes([]);

    } finally {
      setLoading(false);
    }
  };


  // search btn
  const handleSearch = async () => {
    await runUnifiedSearch();

    const params = new URLSearchParams({
      ingredients,
      ...filters,
    });

    navigate(`/recipes?${params.toString()}`);
  };

  // filter 
  const applyFilters = async () => {
    await runUnifiedSearch();

    const params = new URLSearchParams({
      ingredients,
      ...filters,
    });

    navigate(`/recipes?${params.toString()}`);
  };

  const callAIRecipe = async (override = null) => {
    setAiLoading(true);

    try {
      const ingArr = override || ingredients.split(/[\s,]+/).filter(Boolean);
      const json = await aiRecipe(ingArr);

      if (json.recipe) {
        setAiRecipeData(sanitizeAI(json.recipe));
        setAiBtn(false);
        setRecipes([]);
      }
    } finally {
      setAiLoading(false);
    }
  };

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const aiIng = params.get("ai");

    if (aiIng) {
      const list = aiIng.split(/[\s,]+/);
      setIngredients(aiIng);
      callAIRecipe(list);
    }
  }, [location]);

  const handleFilterChange = (k, v) =>
    setFilters((p) => ({ ...p, [k]: v }));

  const toggleExpand = (i) =>
    setExpandedIndex(expandedIndex === i ? null : i);

  
  return (
    <div className="pt-28 min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
          🔍 Find Your Perfect Recipe
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Search manually or let AI create something delicious.
        </p>

        {/* SEARCH BAR */}
        <div className="flex justify-center mb-10">
          <input
            className="w-2/3 p-3 border border-gray-300 rounded-l-xl shadow-sm"
            placeholder="egg tomato garlic"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 rounded-r-xl font-semibold"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-3xl shadow-xl mb-10 border">
          <h2 className="text-xl font-semibold mb-4">🔍 Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <select onChange={(e) => handleFilterChange("diet", e.target.value)} className="border p-2 rounded-xl shadow-sm">
              <option value="">All Diets</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
            </select>

            <select onChange={(e) => handleFilterChange("difficulty", e.target.value)} className="border p-2 rounded-xl shadow-sm">
              <option value="">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select onChange={(e) => handleFilterChange("cuisine", e.target.value)} className="border p-2 rounded-xl shadow-sm">
              <option value="">All Cuisines</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="American">American</option>
              <option value="Fusion">Fusion</option>
            </select>

            <select onChange={(e) => handleFilterChange("tag", e.target.value)} className="border p-2 rounded-xl shadow-sm">
              <option value="">All Tags</option>
              <option value="spicy">Spicy</option>
              <option value="sweet">Sweet</option>
              <option value="home-style">Home Style</option>
              <option value="protein-rich">Protein Rich</option>
              <option value="quick">Quick</option>
            </select>

            <input
              type="number"
              placeholder="Max Time"
              onChange={(e) => handleFilterChange("maxTime", e.target.value)}
              className="border p-2 rounded-xl shadow-sm"
            />

            <select onChange={(e) => handleFilterChange("minRating", e.target.value)} className="border p-2 rounded-xl shadow-sm">
              <option value="">Any Rating</option>
              <option value="3">3⭐+</option>
              <option value="4">4⭐+</option>
              <option value="4.5">4.5⭐+</option>
            </select>
          </div>

          <button
            onClick={applyFilters}
            className="mt-5 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-xl"
          >
            Apply Filters
          </button>
        </div>

        {/* AI SECTION */}
        {aiBtn && (
          <div className="p-6 bg-orange-50 border rounded-2xl text-center mb-6 shadow">
            <p className="text-lg font-semibold text-orange-700">
              No recipes found. Want AI to create one?
            </p>
            <button
              onClick={() => callAIRecipe()}
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg mt-3"
            >
              {aiLoading ? "Generating..." : "Generate with AI 🤖"}
            </button>
          </div>
        )}

        {/* AI RESULT */}
        {aiRecipeData && (
          <div className="bg-orange-50 p-6 rounded-2xl shadow-md border">
            <h2 className="text-xl font-bold mb-3">🤖 AI-Generated Recipe</h2>
            <h3 className="text-2xl font-bold mb-3">{aiRecipeData.name}</h3>

            <img
              src={
                aiRecipeData.imageBase64
                  ? `data:image/jpeg;base64,${aiRecipeData.imageBase64}`
                  : aiRecipeData.imageUrl || placeholderImg
              }
              className="w-full max-h-72 rounded-xl shadow mb-4"
            />

            <p><strong>Ingredients:</strong> {aiRecipeData.ingredients.join(", ")}</p>
            <p className="mt-4 whitespace-pre-line">
              <strong>Instructions:</strong><br />
              {aiRecipeData.instructions}
            </p>
          </div>
        )}

        {/* DB RESULTS */}
        {recipes.length > 0 && (
          <>
           <p className="mb-10 text-xs text-red-500 font-medium">
              ⚠️ AI features are still under development and may not always respond. Thanks for your patience!
            </p>
            <p className="text-lg font-semibold mb-4">Here’s what we found 👇</p>
           


            <div className="flex flex-col gap-4">
              {recipes.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-2xl shadow-sm">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggleExpand(idx)}
                  >
                    <img
                      src={item.imageUrl || placeholderImg}
                      className="w-20 h-20 rounded-xl object-cover shadow"
                    />

                    <div className="flex-1 px-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Difficulty: {item.difficulty} • {item.timeMinutes} mins
                      </p>
                    </div>

                    <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-xl shadow">
                      {expandedIndex === idx ? "Hide" : "View"}
                    </button>
                  </div>

                  {expandedIndex === idx && (
                    <div className="mt-3 bg-white p-4 border rounded-xl shadow-sm">
                      <p><strong>Ingredients:</strong> {item.ingredients.join(", ")}</p>
                      <p className="mt-2"><strong>Instructions:</strong> {item.instructions}</p>
                      <p><strong>Cuisine:</strong> {item.cuisine}</p>
                      <p><strong>Diet:</strong> {(item.dietTags || []).join(", ")}</p>
                      <p><strong>Tags:</strong> {(item.tags || []).join(", ")}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* EMPTY STATE */}
        {!loading && recipes.length === 0 && !aiRecipeData && !aiBtn && (
          <p className="text-center text-gray-600 italic">
            No recipes yet. Try searching or apply filters.
          </p>
        )}

      </div>
    </div>
  );
}

import axios from "axios";

const BASE_URL = "https://smart-recipe-generator.up.railway.app/api/recipes";

// heath check
export const pingServer = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/ping`);
    return res.data;
  } catch {
    return "Server not reachable";
  }
};

// (find)
// BACKEND EXPECTS:
// { ingredientsText: "egg tomato", diet, difficulty, cuisine, tag, maxTime, minRating }

export const findRecipes = async (payload) => {
  try {
    const body = {};

    // backend expects ingredientsText, not array
    if (payload.ingredientsText) {
      body.ingredientsText = payload.ingredientsText.trim();
    }

    // add filters only if not empty
    ["diet", "difficulty", "cuisine", "tag"].forEach((k) => {
      if (payload[k] && payload[k].trim() !== "") body[k] = payload[k];
    });

    if (payload.maxTime) body.maxTime = Number(payload.maxTime);
    if (payload.minRating) body.minRating = Number(payload.minRating);

    console.log("📤 FINAL find() payload:", body);

    const res = await axios.post(`${BASE_URL}/find`, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("🟢 RAW /find Response:", res.data);
    return res.data;

  } catch (err) {
    console.error("❌ findRecipes error:", err);
    return { aiSuggested: true };
  }
};
// ai direct
export const aiRecipe = async (ingredientsArray) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/ai-recipe`,
      { ingredients: ingredientsArray },
      { headers: { "Content-Type": "application/json" } }
    );

    return res.data;
  } catch (err) {
    console.error("AI recipe error:", err);
    throw err;
  }
};

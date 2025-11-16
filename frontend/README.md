
---

# Cuisinex – Smart Recipe Generator (Frontend)

A frontend web application that enables AI-powered recipe discovery with secure Google Login, smart filtering, and a smooth responsive UI.

## Live Demo
Frontend: https://smart-recipe-generator-frontend-zoy3.onrender.com  
Backend API: https://smart-recipe-generator.up.railway.app  
Portfolio: https://portfolio-e7gt.onrender.com/

---

## Tech Stack

- React + Vite  
- Tailwind CSS  
- GSAP for animations  
- React Router  
- Axios  
- Lucide Icons  

---

## Features

### Authentication
- Google OAuth 2.0 based login  
- Redirect handled through backend  
- JWT received post-authentication  
- User session persisted in LocalStorage  

### AI-Based Recipe Suggestions
- When no suitable match exists in the database  
- Recipes are generated using Gemini AI  

### Smart Search and Filters
Users can search by ingredient input and apply filters based on:  
- Cuisine  
- Diet  
- Difficulty  
- Cooking duration  
- Tags  

### UI and Experience
- Subtle GSAP transitions  
- Clean and responsive layout  

---

## Folder Structure

```

src/
├── Api/
│     └── recipeApi.js
├── Components/
│     ├── GoogleButton.jsx
│     ├── AuthRollback.jsx
│     ├── Navbar.jsx
│     ├── Hero.jsx
│     ├── MoodCard.jsx
│     └── ServiceCard.jsx
├── Pages/
│     ├── Home.jsx
│     ├── Recipes.jsx
│     ├── Services.jsx
│     └── Contact.jsx
├── context/
│     └── AuthContext.jsx
├── App.jsx
└── main.jsx

```

---

## API Integration

All requests originate from:

```

[https://smart-recipe-generator.up.railway.app/api/recipes](https://smart-recipe-generator.up.railway.app/api/recipes)

````

Example:

```js
const BASE_URL = "https://smart-recipe-generator.up.railway.app/api/recipes";

export const findRecipes = async (payload) => {
  return axios.post(`${BASE_URL}/find`, payload);
};
````

OAuth callback route:

```jsx
<Route path="/auth/callback" element={<AuthCallback />} />
```

---

## Local Development

Install dependencies:
`npm install`

Run development server:
`npm run dev`

Build for production:
`npm run build`

Preview build:
`npm run preview`

---

## Environment Notes

Google OAuth is configured with a fixed redirect URL:
`https://smart-recipe-generator-frontend-zoy3.onrender.com/auth/callback`
Backend receives the code, validates it, and issues a JWT.

---

## Developer © <a href="https://portfolio-e7gt.onrender.com/" target="_blank"><strong>Adarsh Kumar</strong></a>

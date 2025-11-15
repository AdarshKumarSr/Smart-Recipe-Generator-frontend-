
---

# 🍽️ **Cuisinex – Smart Recipe Generator (Frontend)**

AI-powered recipe discovery with Google Login, smart filters, and beautiful UI.

🔗 **Live Project:**
👉 **[https://smart-recipe-generator-frontend-zoy3.onrender.com](https://smart-recipe-generator-frontend-zoy3.onrender.com)**

---

## 🚀 **Tech Stack**

* **React + Vite**
* **TailwindCSS**
* **GSAP Animations**
* **React Router**
* **Axios**
* **Lucide Icons**

---

## ✨ **Features**

### 🔐 Google Login (OAuth 2.0)

* Full Google OAuth redirection flow
* After authentication, backend returns JWT
* Saves user session in LocalStorage

### 🍳 AI Recipe Suggestions

* When no strong match is found in DB
* Gemini AI generates a new recipe

⚠ **AI Warning:**
AI suggestions rely on **free-tier Gemini API**.
At peak hours responses may slow down or temporarily fail.

### 🔍 Smart Search

* Search by **ingredients** (natural text)
* Filter by:

  * Cuisine
  * Diet
  * Difficulty
  * Max time
  * Tags

### 🎨 Smooth UI

* GSAP fade & slide animations
* Fully responsive mobile-first layout

---

## 📁 **Folder Structure**

```
src/
 ├── Api/
 │     └── recipeApi.js      → API wrapper
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

## 🔌 **Frontend → Backend API**

All API calls are made to:

```
https://smart-recipe-generator.up.railway.app/api/recipes
```

Example:

```js
const BASE_URL = "https://smart-recipe-generator.up.railway.app/api/recipes";

export const findRecipes = async (payload) => {
  return axios.post(`${BASE_URL}/find`, payload);
};
```

### OAuth Callback Page:

```jsx
<Route path="/auth/callback" element={<AuthCallback />} />
```

---

## 🧪 **Local Development**

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

---

## 🌍 **Environment**

The frontend uses static redirect URLs for Google Login:

```
https://smart-recipe-generator-frontend-zoy3.onrender.com/auth/callback
```

Backend processes the code and issues a token.

---

## 📸 **Screenshots**

(Add screenshots here)

```
![Home Page](./screenshots/home.png)
![Login](./screenshots/login.png)
![AI Result](./screenshots/ai-result.png)
```

---

## 👨‍💻 **Developer**

[**Adarsh Kumar**](https://portfolio-e7gt.onrender.com/)  
🌐 Portfolio • software Developer


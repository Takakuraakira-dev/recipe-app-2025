import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import "./index.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("pasta");
  const [loading, setLoading] = useState(false);

  // TheMealDB API
  const fetchRecipes = async (searchTerm) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("APIエラー:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(query);
  }, [query]);

  return (
    <div className="app">
      <h1>🍳 Recipe Finder</h1>
      <SearchBar onSearch={setQuery} />
      {loading && <p>🔄 検索中です…</p>}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>検索結果がありません😢</p>
        )}
      </div>
    </div>
  );
}

export default App;

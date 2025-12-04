import { useState, useEffect } from "react"; 
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import "./index.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("pasta");
  const [loading, setLoading] = useState(false);

  
  const fetchRecipes = async (searchTerm) => {
    try {
      setLoading(true);
  
      // 🔥 日本語なら英語に変換
      const translated =
        jpToEn[searchTerm] || searchTerm; // 辞書にない場合はそのまま英語扱い
  
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${translated}`
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

export default Home;

// 日本語 → 英語への簡易辞書
const jpToEn = {
  "カレー": "curry",
  "肉": "meat",
  "魚": "fish",
  "チキン": "chicken",
  "パスタ": "pasta",
  "サラダ": "salad",
  "スープ": "soup",
  "ご飯": "rice",
  "牛肉": "beef",
  "豚肉": "pork",
  "卵": "egg",
  "パン": "bread",
};


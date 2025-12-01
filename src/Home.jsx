import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import "./index.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("パスタ"); // 初期検索を日本語に変更
  const [loading, setLoading] = useState(false);

  // 🔥 日本語 → 英語翻訳（無料API）
  const translateToEnglish = async (text) => {
    try {
      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: "ja",
          target: "en"
        }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();
      return data.translatedText;
    } catch (error) {
      console.error("翻訳エラー:", error);
      return text; // 翻訳失敗時はそのまま使う
    }
  };

  // 🔥 レシピ検索
  const fetchRecipes = async (searchTerm) => {
    try {
      setLoading(true);

      // 🔥 日本語 → 英語翻訳
      const translated = await translateToEnglish(searchTerm);

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
      <h1>🍳 レシピ検索アプリ</h1>

      {/* 🔍 日本語で検索 */}
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

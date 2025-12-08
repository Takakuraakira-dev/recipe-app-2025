import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import "./index.css";

// 🌸 日本語 → 英語 変換辞書（拡張版）
const jpToEn = {
  "カレー": "curry",
  "かれー": "curry",
  "カレ": "curry",
  "肉": "meat",
  "にく": "meat",
  "魚": "fish",
  "さかな": "fish",
  "チキン": "chicken",
  "鶏": "chicken",
  "とり": "chicken",
  "パスタ": "pasta",
  "ぱすた": "pasta",
  "サラダ": "salad",
  "さらだ": "salad",
  "スープ": "soup",
  "すーぷ": "soup",
  "ご飯": "rice",
  "ごはん": "rice",
  "牛肉": "beef",
  "豚肉": "pork",
  "卵": "egg",
  "たまご": "egg",
  "パン": "bread",
  "えび": "shrimp",
  "エビ": "shrimp",
  "海老": "shrimp",
  "うどん": "udon",
  "ラーメン": "ramen",
  "らーめん": "ramen",
  "ピザ": "pizza",
};

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("pasta");
  const [loading, setLoading] = useState(false);

  // ⭐ 検索関数（部分一致 + 日本語変換対応）
  const fetchRecipes = async (searchTerm) => {
    try {
      setLoading(true);

      const lower = searchTerm.toLowerCase();

      // 辞書から日本語を英語へ変換
      const translated =
        Object.keys(jpToEn).find((key) => lower.includes(key.toLowerCase()))
          ? jpToEn[
              Object.keys(jpToEn).find((key) =>
                lower.includes(key.toLowerCase())
              )
            ]
          : searchTerm;

      console.log("🔎 実際に検索するワード:", translated);

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


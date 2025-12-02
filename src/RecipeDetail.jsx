// src/RecipeDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ★ 翻訳用の state
  const [translatedInstructions, setTranslatedInstructions] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();

        if (!data.meals || data.meals.length === 0) {
          setError("レシピが見つかりませんでした。");
          setRecipe(null);
          return;
        }

        setRecipe(data.meals[0]);
      } catch (err) {
        console.error(err);
        setError("レシピの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // ★ 翻訳ボタンを押したとき
  const handleTranslate = async () => {
    if (!recipe?.strInstructions) return;

    // すでに翻訳済みなら「表示切り替え」だけ
    if (translatedInstructions) {
      setShowJapanese(true);
      return;
    }

    try {
      setIsTranslating(true);
      setError("");

      const text = recipe.strInstructions;

      // Google翻訳の非公式API（ポートフォリオ用途ならOK）
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ja&dt=t&q=${encodeURIComponent(
        text
      )}`;

      const res = await fetch(url);
      const data = await res.json();

      // 返ってくる配列から翻訳結果だけを取り出し
      const jaText = data[0].map((part) => part[0]).join("");

      setTranslatedInstructions(jaText);
      setShowJapanese(true);
    } catch (err) {
      console.error(err);
      setError("翻訳に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsTranslating(false);
    }
  };

  // ★ 英語に戻す
  const handleShowEnglish = () => {
    setShowJapanese(false);
  };

  if (loading) return <p>読み込み中です...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return null;

  const instructionsText =
    showJapanese && translatedInstructions
      ? translatedInstructions
      : recipe.strInstructions;

  // 材料リストを組み立て（今まで使っていたやり方でOK）
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${ing} ${measure || ""}`.trim());
    }
  }

  return (
    <div className="app">
      <button onClick={() => navigate(-1)}>← 戻る</button>

      <h1>{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
        style={{ maxWidth: "480px", borderRadius: "10px" }}
      />

      <h2>材料</h2>
      <ul style={{ textAlign: "left", display: "inline-block" }}>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>作り方</h2>

      {/* ★ 翻訳ボタン（デザインほぼそのまま） */}
      <div className="translate-actions">
        <button
          className="translate-button"
          onClick={handleTranslate}
          disabled={isTranslating}
        >
          {isTranslating
            ? "翻訳中..."
            : translatedInstructions && showJapanese
            ? "（日本語表示中）"
            : "日本語に翻訳"}
        </button>

        {translatedInstructions && (
          <button
            className="translate-button secondary"
            onClick={handleShowEnglish}
          >
            英語で表示
          </button>
        )}
      </div>

      <p
        style={{
          marginTop: "16px",
          textAlign: "left",
          whiteSpace: "pre-line",
        }}
      >
        {instructionsText}
      </p>
    </div>
  );
}

export default RecipeDetail;


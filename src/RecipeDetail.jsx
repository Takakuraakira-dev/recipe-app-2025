import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setRecipe(data.meals[0]);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>読み込み中...</p>;

  return (
    <div className="detail-container">
      <Link className="back-btn" to="/">
        ← 戻る
      </Link>

      <h1>{recipe.strMeal}</h1>

      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h2>作り方</h2>

      {/* ★ここに日本語翻訳を入れたい場合、下の英語を翻訳して置き換えるだけ★ */}
      <p style={{ whiteSpace: "pre-wrap" }}>
        {recipe.strInstructions}
      </p>
    </div>
  );
}

export default RecipeDetail;


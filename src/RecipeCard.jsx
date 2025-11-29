import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const { idMeal, strMeal, strMealThumb, strInstructions } = recipe;

  return (
    <div className="recipe-card">
      <img src={strMealThumb} alt={strMeal} className="recipe-image" />
      <h2>{strMeal}</h2>
      <p>{strInstructions ? strInstructions.substring(0, 100) + "..." : "説明がありません"}</p>

      {/* ★ 明示的なリンクを追加！ */}
      <Link to={`/recipe/${idMeal}`} className="details-link">
        👉 レシピ詳細を見る
      </Link>
    </div>
  );
}

export default RecipeCard;


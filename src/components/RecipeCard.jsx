import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      {/* 料理画像 */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-img"
      />

      {/* 料理名 */}
      <h3 className="recipe-title">{recipe.strMeal}</h3>

      {/* 内部リンクで詳細ページへ */}
      <Link 
        to={`/recipe/${recipe.idMeal}`}
        className="detail-btn"
      >
        レシピを見る →
      </Link>
    </div>
  );
}

export default RecipeCard;


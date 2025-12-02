import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const { idMeal, strMeal, strMealThumb, strInstructions } = recipe;

  return (
    <Link to={`/recipe/${idMeal}`} className="recipe-link">
      <div className="recipe-card">
        <img src={strMealThumb} alt={strMeal} className="recipe-image" />

        <h2>{strMeal}</h2>

        <p>
          {strInstructions
            ? strInstructions.substring(0, 100) + "..."
            : "説明がありません"}
        </p>
      </div>
    </Link>
  );
}

export default RecipeCard;


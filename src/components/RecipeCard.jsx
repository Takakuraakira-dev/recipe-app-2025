function RecipeCard({ recipe }) {
    return (
      <div className="recipe-card">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3>{recipe.strMeal}</h3>
        <a href={recipe.strSource || recipe.strYoutube} target="_blank" rel="noreferrer">
          レシピを見る
        </a>
      </div>
    );
  }
  
  export default RecipeCard;
  
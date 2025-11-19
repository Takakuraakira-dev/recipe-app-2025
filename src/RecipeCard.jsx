function RecipeCard({ recipe }) {
    const { strMeal, strMealThumb, strInstructions } = recipe;
  
    return (
      <div className="recipe-card">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="recipe-image"
        />
  
        <h2>{strMeal}</h2>
  
        <p>
          {strInstructions
            ? strInstructions.substring(0, 100) + "..."
            : "説明がありません"}
        </p>
      </div>
    );
  }
  
  export default RecipeCard;
  
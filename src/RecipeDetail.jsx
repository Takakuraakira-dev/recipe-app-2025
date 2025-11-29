import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) return <p>読み込み中…</p>;
  if (!recipe) return <p>レシピが見つかりません😢</p>;

  return (
    <div className="detail-page">
      <h1>{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "80%", borderRadius: "10px" }}
      />

      <h2>📋 作り方</h2>
      <p>{recipe.strInstructions}</p>

      <h2>🍴 材料</h2>
      <ul>
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];

          return (
            ingredient &&
            ingredient.trim() && (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            )
          );
        })}
      </ul>

      <Link to="/" style={{ display: "block", marginTop: "20px" }}>
        ← 戻る
      </Link>
    </div>
  );
}

export default RecipeDetail;

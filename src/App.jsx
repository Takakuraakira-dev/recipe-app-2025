import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import RecipeDetail from "./RecipeDetail";

function App() {
  return (
    <Routes>
      {/* ホーム（検索ページ） */}
      <Route path="/" element={<Home />} />

      {/* レシピ詳細ページ */}
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  );
}

export default App;



import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ShopDetail from "./ShopDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop/:id" element={<ShopDetail />} />
    </Routes>
  );
}

export default App;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ShopDetail() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/search`);
      const data = await res.json();
      const found = data.find((item) => item.id === Number(id));
      setShop(found);
    }
    fetchData();
  }, [id]);

  if (!shop) return <p>読み込み中...</p>;

  return (
    <div className="app">
      <img src={shop.image} style={{ width: "100%", borderRadius: "10px" }} />
      <h1>{shop.name}</h1>
      <p>{shop.genre} / {shop.area}</p>
      <p>{shop.budget}</p>
      <p>{shop.description}</p>
    </div>
  );
}

export default ShopDetail;

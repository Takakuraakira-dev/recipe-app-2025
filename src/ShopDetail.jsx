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
      <img
        src={shop.image}
        alt={shop.name}
        style={{
          width: "80%",
          maxWidth: "500px",
          height: "260px",
          objectFit: "cover",
          borderRadius: "12px",
          margin: "0 auto 20px",
          display: "block",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      />

      <h1>{shop.name}</h1>
      <p>{shop.genre} / {shop.area}</p>
      <p>{shop.budget}</p>
      <p>{shop.description}</p>
    </div>
  );
}

export default ShopDetail;

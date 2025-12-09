import { useState, useEffect } from "react";

function Home() {
  const [shops, setShops] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchShops = async () => {
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    setShops(data);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <div className="app">
      <h1>🍽 飲食店検索</h1>

      <input
        type="text"
        placeholder="ラーメン、カフェ、渋谷 など"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button onClick={fetchShops}>検索</button>

      <div className="list">
        {shops.map((s) => (
          <div key={s.id} className="card">
            <img src={s.image} alt={s.name} />
            <h3>{s.name}</h3>
            <p>{s.genre} / {s.area}</p>
            <p>{s.budget}</p>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


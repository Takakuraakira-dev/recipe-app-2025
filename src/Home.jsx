
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [shops, setShops] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function search() {
      // 🔥 キーワードが空なら「おすすめ」だけ表示
      if (keyword.trim() === "") {
        const res = await fetch(`/api/search`);
        const data = await res.json();
  
        // おすすめ3店だけ取り出す
        const recommended = data.slice(0, 3);
        setShops(recommended);
        return;
      }
  
      // 🔥 キーワードがあるなら検索
      const res = await fetch(`/api/search?keyword=${keyword}`);
      const data = await res.json();
      setShops(data);
    }
  
    search();
  }, [keyword]);
  

    search();
  }, [keyword]); // ← keyword が変わるたびに実行

  return (
    <div className="app">
      <h1>🍽 飲食店検索</h1>

      <input
        type="text"
        placeholder="ラーメン、カフェ、渋谷 など"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div className="list">
        {shops.map((s) => (
          <Link key={s.id} to={`/shop/${s.id}`} className="card">
            <img src={s.image} alt={s.name} />

            <div className="badges">
              <span className="badge">{s.genre}</span>
              <span className="badge">{s.area}</span>
            </div>

            <h3>{s.name}</h3>
            <p>{s.budget}</p>
            <p className="description">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

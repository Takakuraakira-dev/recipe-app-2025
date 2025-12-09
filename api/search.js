import { restaurants } from "../src/data/restaurants.js";

export default function handler(req, res) {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(200).json(restaurants);
  }

  const lower = keyword.toLowerCase();

  // 日本語・英語・部分一致すべて対応
  const results = restaurants.filter((item) => {
    return (
      item.name.includes(keyword) ||            // 店名（日本語）
      item.genre.includes(keyword) ||           // ジャンル（日本語）
      item.area.includes(keyword) ||            // エリア（日本語）
      item.name.toLowerCase().includes(lower) || 
      item.genre.toLowerCase().includes(lower) ||
      item.area.toLowerCase().includes(lower)
    );
  });

  res.status(200).json(results);
}

import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = input.trim();
    if (word === "") return;

    onSearch(word); // 🔥 日本語を Home.jsx に渡す（翻訳は Home.jsx 側で行う）
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="食材名・料理名を日本語で入力してください"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  );
}

export default SearchBar;


import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSearch(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="食材や料理名を入力..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  );
}

export default SearchBar;

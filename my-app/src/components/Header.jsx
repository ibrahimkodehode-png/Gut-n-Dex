import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

const categories = [
  "fiction",
  "mystery",
  "thriller",
  "romance",
  "fantasy",
  "morality",
  "society",
  "power",
  "justice",
  "adventure",
  "tragedy",
  "war",
  "philosophy",
];

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${query}`);
  };

  return (
    <header className="header">
      <h1>El.Library</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <nav>
        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat}`}>
            {cat}
          </Link>
        ))}
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}

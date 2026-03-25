import useFavorites from "../hooks/useFavorites";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div>
      <h2 className="page-title">Your Favorites</h2>
      <div className="grid">
        {favorites.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}

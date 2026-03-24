import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/gutendex";
import Loader from "../components/Loader";
import useFavorites from "../hooks/useFavorites";
import "../styles/bookdetails.css";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, favorites, removeFavorite } = useFavorites();

  useEffect(() => {
    getBookById(id)
      .then((data) => setBook(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!book) return <p>Book not found.</p>;

  const isFav = favorites.some((b) => b.id === book.id);

  return (
    <div className="book-details">
      <img src={book.formats["image/jpeg"]} alt={book.title} />
      <div className="info">
        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong> {book.authors[0]?.name || "Unknown"}
        </p>
        <p>
          <strong>Downloads:</strong> {book.download_count}
        </p>
        <p>
          <strong>Languages:</strong> {book.languages.join(", ")}
        </p>
        <p>
          <strong>Subjects:</strong> {book.subjects.join(", ")}
        </p>

        {/* read online button */}
        <a
          href={book.formats["text/html"] || book.formats["application/pdf"]}
          target="_blank"
          rel="noopener noreferrer"
          className="read-online"
        >
          Start Reading Online
        </a>

        {/* Favorites button */}
        <button
          onClick={() => (isFav ? removeFavorite(book.id) : addFavorite(book))}
        >
          {isFav ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

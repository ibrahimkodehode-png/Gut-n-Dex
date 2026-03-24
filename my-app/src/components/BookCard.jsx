import { Link } from "react-router-dom";
import "../styles/BookCard.css";

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.formats["image/jpeg"]} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.authors[0]?.name}</p>

      <Link to={`/book/${book.id}`}>View</Link>
    </div>
  );
}

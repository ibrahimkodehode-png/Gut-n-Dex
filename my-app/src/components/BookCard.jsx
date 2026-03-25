import { Link } from "react-router-dom";
import "../styles/BookCard.css";

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="book-card-link">
      <div className="book-card">
        <div className="book-top">
          <div className="image-wrapper">
            <img src={book.formats["image/jpeg"]} alt={book.title} />
          </div>

          <div className="book-info">
            <h3>{book.title}</h3>

            {book.authors && (
              <p>
                <strong>👤 Author:</strong>{" "}
                {book.authors.map((a) => a.name).join(", ")}
              </p>
            )}

            {book.languages && (
              <p>
                <strong>🌐 Languages:</strong>{" "}
                {book.languages.map((lang, idx) => (
                  <span key={idx} className="badge language-badge">
                    {lang.toUpperCase()}
                  </span>
                ))}
              </p>
            )}

            {book.download_count !== undefined && (
              <p>
                <strong>⬇️ Downloads:</strong>{" "}
                {book.download_count.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {book.subjects && book.subjects.length > 0 && (
          <div className="subjects-row">
            {book.subjects.slice(0, 3).map((subj, idx) => (
              <span key={idx} className="subject-badge">
                {subj}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/gutendex";
import Loader from "../components/Loader";
import useFavorites from "../hooks/useFavorites";
import "../styles/bookdetails.css";

const languageNames = {
  en: "English",
  fr: "French",
  ar: "Arabic",
  zh: "Chinese",
  ru: "Russian",
  de: "German",
  es: "Spanish",
  it: "Italian",
  pt: "Portuguese",
  no: "Norwegian",
  nl: "Dutch",
  sv: "Swedish",
  da: "Danish",
  fi: "Finnish",
  la: "Latin",
};

const translateTargets = [
  { code: "ar", label: "Arabic" },
  { code: "fr", label: "French" },
  { code: "zh-CN", label: "Chinese" },
  { code: "ru", label: "Russian" },
];

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, favorites, removeFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    getBookById(id)
      .then((data) => setBook(data))
      .finally(() => setLoading(false));
  }, [id]);

  const isFav = favorites.some((b) => b.id === book?.id);

  const readableUrl = useMemo(() => {
    if (!book?.formats) return null;

    return (
      book.formats["text/html"] ||
      book.formats["text/html; charset=utf-8"] ||
      book.formats["text/plain; charset=utf-8"] ||
      book.formats["text/plain"] ||
      book.formats["application/pdf"] ||
      null
    );
  }, [book]);

  const translatedLinks = useMemo(() => {
    if (!readableUrl) return [];
    return translateTargets.map((lang) => ({
      ...lang,
      url: `https://translate.google.com/translate?sl=auto&tl=${lang.code}&u=${encodeURIComponent(
        readableUrl,
      )}`,
    }));
  }, [readableUrl]);

  if (loading) return <Loader />;
  if (!book) return <p className="book-not-found">Book not found.</p>;

  const cover =
    book.formats["image/jpeg"] ||
    "https://via.placeholder.com/400x600?text=No+Cover";

  const authorNames =
    book.authors?.length > 0
      ? book.authors.map((a) => a.name).join(", ")
      : "Unknown";

  const prettyLanguages =
    book.languages?.length > 0
      ? book.languages.map((lang) => languageNames[lang] || lang.toUpperCase())
      : [];

  return (
    <section className="book-details-wrap">
      <div className="book-details">
        <div className="book-cover-panel">
          <img src={cover} alt={book.title} />
          <div className="book-cover-glow"></div>
        </div>

        <div className="info">
          <div className="title-block">
            <span className="book-kicker">Digital Library Edition</span>
            <h1>{book.title}</h1>
            <p className="author-line">by {authorNames}</p>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-label">Downloads</span>
              <strong>{book.download_count?.toLocaleString() || 0}</strong>
            </div>

            <div className="stat-card">
              <span className="stat-label">Book ID</span>
              <strong>#{book.id}</strong>
            </div>

            <div className="stat-card">
              <span className="stat-label">Languages</span>
              <strong>{prettyLanguages.length || 0}</strong>
            </div>
          </div>

          {prettyLanguages.length > 0 && (
            <div className="section-block">
              <h3>Available Languages</h3>
              <div className="chip-row">
                {prettyLanguages.map((lang, index) => (
                  <span key={index} className="chip language-chip">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {book.subjects?.length > 0 && (
            <div className="section-block">
              <h3>Subjects</h3>
              <div className="chip-row">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span key={index} className="chip subject-chip">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="section-block">
            <h3>Reading Options</h3>
            <div className="actions-row">
              {readableUrl && (
                <a
                  href={readableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-online primary-btn"
                >
                  Start Reading
                </a>
              )}

              <button
                className="favorite-btn secondary-btn"
                onClick={() =>
                  isFav ? removeFavorite(book.id) : addFavorite(book)
                }
              >
                {isFav ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>

          {translatedLinks.length > 0 && (
            <div className="section-block">
              <h3>Read with Translation</h3>
              <p className="muted-text">
                These open the readable version in a translated view.
              </p>

              <div className="translate-grid">
                {translatedLinks.map((lang) => (
                  <a
                    key={lang.code}
                    href={lang.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="translate-btn"
                  >
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

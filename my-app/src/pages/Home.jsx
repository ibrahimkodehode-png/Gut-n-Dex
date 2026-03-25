import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooks } from "../api/gutendex";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("search") || "harry";
  const page = Number(searchParams.get("page")) || 1;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    searchBooks(query, page)
      .then((data) => {
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / 20));
      })
      .catch(() => setError("Failed to load books"))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ search: query, page: newPage });
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="page-title">Results for: "{query}"</h2>

      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}

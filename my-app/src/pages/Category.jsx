import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getBooksByCategory } from "../api/gutendex";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

export default function Category() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);

    getBooksByCategory(topic, page)
      .then((data) => {
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / 20));
      })
      .finally(() => setLoading(false));
  }, [topic, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="page-title">{topic}</h2>

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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBooksByCategory } from "../api/gutendex";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

export default function Category() {
  const { topic } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await getBooksByCategory(topic, page);
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / 20));
      } catch (err) {
        console.error("Failed to load books:", err);
        setBooks([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [topic, page]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
        {topic.toUpperCase()}
      </h1>

      {loading ? (
        <Loader />
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No books found in this category.
        </p>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </section>

          <div className="mt-8 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        </>
      )}
    </main>
  );
}

import { useEffect, useState } from "react";
import { searchBooks } from "../api/gutendex";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("harry");
  const [page, setPage] = useState(1);

  useEffect(() => {
    searchBooks(query, page).then((data) => {
      setBooks(data.results);
    });
  }, [query, page]);

  return (
    <>
      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>

      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
}

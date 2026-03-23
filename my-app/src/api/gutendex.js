const BASE_URL = "https://gutendex.com/books";

export const searchBooks = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}?search=${query}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

export const getBooksByCategory = async (topic, page = 1) => {
  const res = await fetch(`${BASE_URL}?topic=${topic}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
};

export const getBookById = async (id) => {
  const res = await fetch(`${BASE_URL}?ids=${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  const data = await res.json();
  return data.results[0];
};

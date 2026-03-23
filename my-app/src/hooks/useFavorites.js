import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    if (!favorites.find((b) => b.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((b) => b.id !== id));
  };

  return { favorites, addFavorite, removeFavorite };
}

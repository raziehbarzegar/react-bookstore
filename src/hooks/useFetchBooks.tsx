import { useEffect, useState } from "react";
import type { IBook } from "../types/server";
import { getAllBooks } from "../services/api";

function useFetchBooks() {
  const [books, setBooks] = useState<IBook[]>([]);
  useEffect(() => {
    getAllBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return { books };
}
export default useFetchBooks;

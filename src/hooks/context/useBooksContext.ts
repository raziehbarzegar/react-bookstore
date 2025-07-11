import { useContext } from "react";
import { BooksContext } from "../../context/books/BooksContext";

function useBooksContext() {
  return useContext(BooksContext);
}
export default useBooksContext;

import { createContext } from "react";
import type { IBook } from "../../types/server";

interface BooksContext {
  books: IBook[];
}
const defaultValue: BooksContext = {
  books: [],
};
export const BooksContext = createContext<BooksContext>(defaultValue);

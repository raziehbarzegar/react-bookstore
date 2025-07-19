import { createContext, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import type { IBook } from "../../types/server";

interface IBooksProviderProps {
  children: React.ReactNode;
}

interface BooksContext {
  books: IBook[];
  isLoading: boolean;
  error: string | null;
  getBookById: (id: string) => IBook | null;
}

const BooksContext = createContext<BooksContext>({} as BooksContext);

const baseUrl = "http://localhost:8000";

function BooksProvider({ children }: IBooksProviderProps) {
  const {
    data: books,
    isLoading,
    error,
  } = useFetch({
    baseUrl: baseUrl,
    endpoint: "/books",
  });

  const getBookById = (id: string) => {
    const book = books.find((item: IBook) => item.id === id);
    return book ? book : null;
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        isLoading,
        error,
        getBookById,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;

export function useBooks() {
  return useContext(BooksContext);
}

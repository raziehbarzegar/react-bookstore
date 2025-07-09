import useFetchBooks from "../../hooks/useFetchBooks";
import { BooksContext } from "./BooksContext";

interface BooksContextProvider {
  children: React.ReactNode;
}
function BooksContextProvider({ children }: BooksContextProvider) {
  const { books } = useFetchBooks();

  return (
    <BooksContext.Provider
      value={{
        books,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export default BooksContextProvider;

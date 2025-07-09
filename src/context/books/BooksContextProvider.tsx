import useBooks from "../../hooks/useBooks";
import { BooksContext } from "./BooksContext";

interface BooksContextProvider {
  children: React.ReactNode;
}
function BooksContextProvider({ children }: BooksContextProvider) {
  const { books } = useBooks();

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

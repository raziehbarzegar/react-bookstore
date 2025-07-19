import Container from "../../components/container/Container";
import Book from "../../components/book/Book";
import Spinner from "../../components/spinner/Spinner";
import { useBooks } from "../../context/books/BooksProvider";

function Store() {
  const { books, isLoading } = useBooks();

  return (
    <section className="pt-32 dark:bg-gray-900">
      <Container>
        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <Spinner className="w-[100px] h-[100px]" />
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-center text-primary py-12 tracking-wide">
              Explore Our Books
            </h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-28 gap-x-10 justify-center my-24">
                {books.map((book) => (
                  <Book
                    key={book.id}
                    bookId={book.id}
                    bookImg={book.imageUrl}
                    bookAuthor={book.author}
                    bookTitle={book.title}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

export default Store;

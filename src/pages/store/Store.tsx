import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import type { IBook } from "../../types/server";
import { getAllBooks } from "../../services/api";
import Book from "../../components/book/Book";

function Store() {
  const [books, setBooks] = useState<IBook[]>([]);
  useEffect(() => {
    getAllBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <section className="dark:bg-gray-900">
      <Container>
        <h2 className="text-4xl font-bold text-center text-primary py-12 tracking-wide">
          Explore Our Books
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-28 gap-x-10 justify-center my-24">
            {books.map((book) => (
              <Book
                key={book.id}
                bookImg={book.imageUrl}
                bookAuthor={book.author}
                bookTitle={book.title}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Store;

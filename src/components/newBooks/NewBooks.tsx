import Container from "../container/Container";
import Book from "../book/Book";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import useBooksContext from "../../hooks/context/useBooksContext";

function NewBooks() {
  const { books } = useBooksContext();
  const newBooks = books.slice(-3).reverse();

  return (
    <section className="dark:bg-gray-900 py-10">
      <Container>
        <div className="pb-14">
          <h3 className="text-3xl font-bold text-center pt-5">New Books</h3>
          <p className="text-center mb-16 text-gray-400 text-sm pt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-x-7 gap-y-24 w-fit mx-auto">
          {newBooks.map((book) => (
            <Book
              key={book.id}
              bookId={book.id}
              bookImg={book.imageUrl}
              bookTitle={book.title}
              bookAuthor={book.author}
            />
          ))}
        </div>
        <div className="flex justify-center mt-7">
          <Link
            to="/store"
            className="flex gap-1 items-center group bg-primary text-white hover:bg-white hover:text-primary transition-all duration-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="font-medium">Explore All Books</span>
            <IoIosArrowForward className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default NewBooks;

import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../button/Button";

interface Book {
  bookId: string;
  bookImg: string;
  bookTitle: string;
  bookAuthor: string;
}
function Book({ bookId, bookImg, bookTitle, bookAuthor }: Book) {
  return (
    <Link
      to={`/books/${bookId}`}
      className="shadow w-[300px] relative max-w-64 text-center rounded-md px-4 pb-4 group transition-colors duration-200  hover:!bg-primary hover:text-white dark:bg-gray-800"
    >
      <img
        src={bookImg}
        alt="book"
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 max-w-24 h-36 object-cover"
        loading="lazy"
      />
      <div className="pt-[40%]">
        <div className="text-yellow-500 flex justify-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="">
          <h3 className="font-semibold pt-2 line-clamp-1">{bookTitle}</h3>
          <span className="text-gray-700 text-sm dark:text-gray-200 group-hover:text-white">
            {bookAuthor}
          </span>
        </div>

        <Button
          variant="primary"
          className="group-hover:!bg-white group-hover:!text-primary mt-3 px-3 py-1"
        >
          <Link to={`/books/${bookId}`}>Order Now</Link>
        </Button>
      
      </div>
    </Link>
  );
}

export default Book;

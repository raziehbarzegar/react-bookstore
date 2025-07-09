import { FaStar } from "react-icons/fa6";

interface Book {
  bookImg: string;
  bookTitle: string;
  bookDescription: string;
}
function Book({ bookImg, bookTitle, bookDescription }: Book) {
  return (
    <div className="shadow relative max-w-64 text-center rounded-md px-4 pb-4 group transition-colors duration-200  hover:!bg-primary hover:text-white dark:bg-gray-800">
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
        <h3 className="font-semibold pt-2 line-clamp-1">{bookTitle}</h3>
        <p className="line-clamp-2 text-gray-400 group-hover:text-white text-sm text-justify">
          {bookDescription}
        </p>
        <button className="bg-primary text-white group-hover:bg-white group-hover:text-primary mt-3 px-3 py-1 rounded-full cursor-pointer">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Book;

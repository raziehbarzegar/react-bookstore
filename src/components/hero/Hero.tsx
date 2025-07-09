import backgroundImage from "../../assets/website/blue-pattern.png";
import { useEffect, useState } from "react";
import Container from "../container/Container";
import { getAllBooks } from "../../services/api";
import type { IBook } from "../../types/server";
import type { BackgroundStyle } from "../../types/styles";

function Hero() {
  const [latestBooks, setLatestBooks] = useState<IBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const backgroundStyle: BackgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {
    getAllBooks()
      .then((data) => {
        if (data.length > 0) {
          setLatestBooks(data.slice(-3).reverse());
          setSelectedBook(data[data.length - 1]);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <>
      {selectedBook && (
        <div className=" bg-gray-100 dark:bg-gray-800" style={backgroundStyle}>
          <Container className="relative flex flex-col md:flex-row items-center h-[800px] md:h-[700px] ">
            <div className="flex justify-center p-16 md:order-1 md:basis-1/2">
              <div className="max-w-96">
                <img
                  src={selectedBook.imageUrl}
                  alt={`${selectedBook.title}`}
                  className="h-[320px] lg:w-[300px] lg:h-auto"
                />
              </div>
              <div className="flex lg:flex-col gap-6 absolute top-[50%] md:top-[72%] lg:right-[5%] lg:top-[26%]">
                {latestBooks.map((book) => (
                  <div
                    key={book.id}
                    className="hover:scale-105 duration-200"
                    onClick={() => {
                      if (book.id !== selectedBook.id) {
                        setSelectedBook(book);
                      }
                    }}
                  >
                    <img
                      src={book.imageUrl}
                      alt={`${book.title}`}
                      className="max-w-[100px] h-[100px]"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-4 md:basis-1/2">
              <div className="mt-16 relative w-full">
                <h3 className="font-bold text-4xl text-center md:text-left md:text-6xl">
                  {selectedBook.title}
                </h3>
                <span className="absolute text-sm md:text-base text-primary py-4 font-bold top-[90%] right-0 md:right-[15%]">
                  by Anonymous
                </span>
              </div>

              <p className="mt-10 text-justify">{selectedBook.description}</p>
              <button className="bg-primary text-white mt-5 px-3 py-1 rounded-full cursor-pointer">
                Order Now
              </button>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Hero;

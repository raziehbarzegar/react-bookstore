import backgroundImage from "../../assets/website/blue-pattern.png";
import { useCallback, useEffect, useState } from "react";
import Container from "../container/Container";
import type { BackgroundStyle } from "../../types/styles";
import useBooksContext from "../../hooks/context/useBooksContext";
import type { IBook } from "../../types/server";
import { Link } from "react-router";
import Button from "../button/Button";

function Hero() {
  const { books } = useBooksContext();

  if (books.length === 0) return;
  const latestBooks = books.slice(-3).reverse();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentBook: IBook = latestBooks[currentIndex];
  const [isPaused, setIspaused] = useState<boolean>(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % latestBooks.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, nextImage]);

  const backgroundStyle: BackgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section
      className="pt-24 bg-gray-100 dark:bg-gray-800  pb-10"
      style={backgroundStyle}
      onMouseEnter={() => setIspaused(true)}
      onMouseLeave={() => setIspaused(false)}
    >
      <Container className="relative flex flex-col md:flex-row items-center">
        <div className="flex justify-center p-16 md:order-1 md:basis-1/2">
          <div className="max-w-96">
            <img
              src={currentBook.imageUrl}
              alt=""
              className="h-[320px] lg:w-[300px] lg:h-[450px] object-cover shadow-sm rou"
            />
          </div>
          <div className="flex lg:flex-col gap-6 absolute top-[50%] md:top-[75%] lg:right-[5%] lg:top-[26%]">
            {latestBooks.map((book, index) => (
              <div
                key={book.id}
                className={`${
                  index === currentIndex ? "scale-125" : ""
                } hover:scale-105 duration-200`}
                onClick={() => {
                  if (index !== currentIndex) {
                    setCurrentIndex(index);
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
          <div className="mt-20 relative w-full">
            <h3 className="font-bold text-4xl text-center md:text-left lg:text-6xl">
              {currentBook.title}
            </h3>
            <span className="absolute text-base md:text-base text-primary py-4 font-bold top-[90%] right-0 md:right-[18%] lg:right-[15%]">
              by {currentBook.author}
            </span>
          </div>
          <div className="w-full text-left px-3">
            <p className="mt-10 text-justify line-clamp-4">
              {currentBook.description}
            </p>
          </div>
          <Button variant="primary" className="py-2 px-4 mt-5 hover:!bg-primary/80">
            <Link to={`/books/${currentBook.id}`}>Order Now</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Hero;

import Container from "../../components/container/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IBook } from "../../types/server";
import { getBookById } from "../../services/api";
import { useShoppingCartContext } from "../../hooks/context/useShoppingCartContext";
import Button from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";

function Product() {
  const [book, setBook] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const productId = useParams<{ id: string }>().id as string;
  const {
    handleIncreaseProductQty,
    getProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
  } = useShoppingCartContext();

  useEffect(() => {
    setIsLoading(true);
    getBookById(productId)
      .then((data) => {
        setBook(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen pt-32 flex items-center justify-center">
          <Spinner className="w-[100px] h-[100px]" />
        </div>
      ) : (
        <div className="pt-36 dark:bg-gray-800 py-20">
          <Container>
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
              <div>
                <img
                  src={book?.imageUrl}
                  alt={book?.title}
                  className="w-64 md:w-80 rounded-lg shadow-lg border border-gray-300"
                />
              </div>

              <div className="flex flex-col gap-4 text-gray-800 dark:text-gray-100">
                <h1 className="text-4xl font-bold">{book?.title}</h1>
                <h2 className="text-lg text-primary font-semibold">
                  by {book?.author}
                </h2>
                <p className="text-sm">Pages: {book?.pages}</p>
                <p className="text-sm">
                  Price: $
                  {book?.priceCents != null
                    ? (book?.priceCents / 100).toFixed(2)
                    : ""}
                </p>
                <div className="">
                  {getProductQty(productId) === 0 ? (
                    <Button
                      variant="primary"
                      onClick={() => handleIncreaseProductQty(productId)}
                      className="w-full hover:!bg-white hover:!text-primary/80 px-6 py-2 mt-4"
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="primary"
                          onClick={() => handleIncreaseProductQty(productId)}
                          className="flex justify-center font-bold w-8 h-8 hover:!bg-primary/80 px-3 py-1 text-md"
                        >
                          +
                        </Button>
                        <span className="inline-block text-lg font-medium text-gray-700 dark:text-gray-200">
                          {getProductQty(productId)}
                        </span>
                        <Button
                          variant="primary"
                          onClick={() => handleDecreaseProductQty(productId)}
                          className="flex justify-center font-bold w-8 h-8 hover:!bg-primary/80 px-3 py-1 text-md"
                        >
                          -
                        </Button>
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveProduct(productId)}
                        className="w-fit hover:!bg-red-600/80 px-4 py-1 text-sm mt-2"
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-16 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Description
              </h3>
              <p className="text-justify leading-relaxed">
                {book?.description}
              </p>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Product;

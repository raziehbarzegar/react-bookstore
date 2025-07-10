import Container from "../../components/container/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IBook } from "../../types/server";
import { getBookById } from "../../services/api";
import { useShoppingCartContext } from "../../hooks/context/useShoppingCartContext";

function Product() {
  const [book, setBook] = useState<IBook | null>(null);
  const productId = Number(useParams().id);
  const {
    handleIncreaseProductQty,
    getProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
  } = useShoppingCartContext();

  useEffect(() => {
    getBookById(productId).then((data) => {
      setBook(data);
    });
  }, [productId]);

  return (
    <div className="dark:bg-gray-800 py-20">
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
                <button
                  onClick={() => handleIncreaseProductQty(productId)}
                  className="w-full bg-primary text-white hover:bg-white hover:text-primary duration-300 px-6 py-2 rounded-full mt-4"
                >
                  Add To Cart
                </button>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleIncreaseProductQty(productId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      +
                    </button>
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                      {getProductQty(productId)}
                    </span>
                    <button
                      onClick={() => handleDecreaseProductQty(productId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      -
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(productId)}
                    className="w-fit bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm mt-2"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Description
          </h3>
          <p className="text-justify leading-relaxed">{book?.description}</p>
        </div>
      </Container>
    </div>
  );
}

export default Product;

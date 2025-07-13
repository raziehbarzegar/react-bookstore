import { useEffect, useState } from "react";
import type { IBook } from "../../types/server";
import { getBookById } from "../../services/api";
import { useShoppingCartContext } from "../../hooks/context/useShoppingCartContext";
import { Link } from "react-router-dom";

interface ICartItem {
  productId: string;
  qty: number;
}

function CartItem({ productId, qty }: ICartItem) {
  const [product, setProduct] = useState<IBook>();
  const {
    handleIncreaseProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
  } = useShoppingCartContext();

  useEffect(() => {
    getBookById(productId).then((data) => {
      setProduct(data);
    });
  }, []);

  return (
    <div className="flex justify-center rounded-md dark:bg-gray-900">
      <Link
        to={`/books/${productId}`}
        className="shadow-md rounded-lg py-8 px-16 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="w-24 sm:w-36">
          <img
            src={product?.imageUrl}
            alt={product?.title}
            className="rounded-md w-full h-auto border border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {product?.title}
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleIncreaseProductQty(productId)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
            >
              +
            </button>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {qty}
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
        </div>
      </Link>
    </div>
  );
}

export default CartItem;

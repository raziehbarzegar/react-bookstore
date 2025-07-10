import { useEffect, useState } from "react";
import type { IBook } from "../../types/server";
import { getBookById } from "../../services/api";
import { useShoppingCartContext } from "../../hooks/context/useShoppingCartContext";

interface ICartItem {
  productId: number;
  qty: number;
}

function CartItem({ productId, qty }: ICartItem) {
  const [product, setProduct] = useState<IBook>();
  const { handleIncreaseProductQty, handleDecreaseProductQty,handleRemoveProduct } =
    useShoppingCartContext();

  useEffect(() => {
    getBookById(productId).then((data) => {
      setProduct(data);
    });
  }, []);

  return (
    <div className="w-fit shadow-md dark:shadow-gray-700 rounded-lg py-8 px-16 sm:px-3 flex flex-col sm:flex-row sm:items-center gap-4">
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

        <button onClick={()=>handleRemoveProduct(productId)} className="w-fit bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm mt-2">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;

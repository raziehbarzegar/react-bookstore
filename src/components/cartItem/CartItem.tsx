import { Link } from "react-router-dom";
import Button from "../button/Button";
import { useShoppingCart } from "../../context/shoppingCart/ShoppingCartProvider";
import { useBooks } from "../../context/books/BooksProvider";

interface ICartItem {
  productId: string;
  qty: number;
}

function CartItem({ productId, qty }: ICartItem) {
  const { getBookById } = useBooks();
  const book = getBookById(String(productId));

  const {
    handleIncreaseProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
  } = useShoppingCart();

  const ControlledPropagation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    handleIncreaseProductQty(productId);
  };

  return (
    <div className="flex justify-center rounded-md dark:bg-gray-900">
      <Link
        to={`/books/${productId}`}
        className="shadow-md rounded-lg py-8 px-16 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="w-24 sm:w-36">
          <img
            src={book?.imageUrl}
            alt={book?.title}
            className="rounded-md w-full h-auto border border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {book?.title}
          </h3>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              onClick={(e) => ControlledPropagation(e)}
              className="flex justify-center w-8 h-8 hover:!bg-primary/80 px-3 py-1 text-md font-bold"
            >
              +
            </Button>
            <span className="text-xl font-medium text-gray-700 dark:text-gray-200">
              {qty}
            </span>

            <Button
              variant="primary"
              onClick={() => handleDecreaseProductQty(productId)}
              className="flex justify-center w-8 h-8 hover:!bg-primary/80 px-3 py-1 text-md font-bold"
            >
              -
            </Button>
          </div>

          <Button
            className="w-fit hover:!bg-red-600/80 px-4 py-1 text-md mt-2"
            variant="danger"
            onClick={() => handleRemoveProduct(productId)}
          >
            Remove
          </Button>
        </div>
      </Link>
    </div>
  );
}

export default CartItem;

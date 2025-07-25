import Button from "../../components/button/Button";
import CartItem from "../../components/cartItem/CartItem";
import Container from "../../components/container/Container";
import Spinner from "../../components/spinner/Spinner";
import { useBooks } from "../../context/books/BooksProvider";
import { useShoppingCart } from "../../context/shoppingCart/ShoppingCartProvider";

function Cart() {
  const { cartItems, cartQty, getTotalPriceInCents } = useShoppingCart();
  const { isLoading } = useBooks();

  if (isLoading)
    return (
      <div className="flex items-center pt-32 justify-center my-10">
        <Spinner className="w-[100px] h-[100px]" />
      </div>
    );

  return (
    <div className="dark:bg-gray-800">
      <Container className="py-32 flex flex-col gap-8 md:flex-row items-center md:items-start justify-center max-w-[900px]">
        <div className="w-full order-1 md:order-2 md:basis-3/4 flex justify-center">
          <div className="w-[75%] sm:w-[60%] md:w-full rounded-lg py-8 px-16 sm:px-8 bg-gray-100 dark:bg-gray-900 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Order Summary
            </h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              Total items: <strong>{cartQty}</strong>
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Total price:
              <strong>{`$${(getTotalPriceInCents() / 100).toFixed(2)}`}</strong>
            </p>
            <Button
              variant="primary"
              className="text-sm lg:text-md px-4 py-2 w-full hover:!bg-primary/80 !rounded-md"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
        <div className="Order-2 md:order-1 flex flex-col md:basis-1/4 gap-4 mx-auto">
          {cartItems.map((item) => (
            <CartItem {...item} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Cart;

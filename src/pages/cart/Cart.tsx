import CartItem from "../../components/cartItem/CartItem";
import Container from "../../components/container/Container";
import { useShoppingCartContext } from "../../hooks/context/useShoppingCartContext";

function Cart() {
  const { cartItems, cartQty, getTotalPriceInCents } = useShoppingCartContext();
  return (
    <div className="dark:bg-gray-800">
      <Container className="py-32 flex flex-col gap-8 md:flex-row items-center md:items-start justify-center max-w-[900px]">
        <div className="w-full order-1 md:order-2 md:basis-3/4 flex justify-center">
          <div className="w-[75%] sm:w-[60%] md:w-full rounded-lg py-8 px-16 sm:px-8 bg-gray-300 dark:bg-gray-900 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Order Summary
            </h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              Total items: <strong>{cartQty}</strong>
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Total price: <strong>{`$${getTotalPriceInCents() / 100}`}</strong>
            </p>
            <button className="text-sm lg:text-md bg-primary text-white px-4 py-2 w-full rounded hover:bg-primary/90">
              Proceed to Checkout
            </button>
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

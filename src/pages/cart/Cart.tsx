import CartItem from "../../components/cartItem/CartItem";
import Container from "../../components/container/Container";
import { useShoppingCartContext } from "../../hooks/context/useShoppingCartContext";

function Cart() {
  const { cartItems } = useShoppingCartContext();
  return (
    <div className="pt-36 bg-white dark:bg-gray-800 py-20">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-x-4 justify-center">
          {cartItems.map((item) => (
            <CartItem {...item} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Cart;

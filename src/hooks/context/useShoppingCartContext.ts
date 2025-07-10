import { useContext } from "react";
import { ShoppingCartContext } from "../../context/shoppingCart/ShoppingCartContext";

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

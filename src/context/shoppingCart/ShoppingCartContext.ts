import { createContext } from "react";
interface ShoppingCartContext {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleIncreaseProductQty: (id: number) => void;
  handleDecreaseProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  handleRemoveProduct: (id: number) => void;
  cartQty: number;
}
export interface CartItem {
  productId: number;
  qty: number;
}

export const ShoppingCartContext = createContext<ShoppingCartContext>(
  {} as ShoppingCartContext
);

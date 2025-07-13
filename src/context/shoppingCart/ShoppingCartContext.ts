import { createContext } from "react";
interface ShoppingCartContext {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleIncreaseProductQty: (id: string) => void;
  handleDecreaseProductQty: (id: string) => void;
  getProductQty: (id: string) => number;
  handleRemoveProduct: (id: string) => void;
  cartQty: number;
  getTotalPriceInCents:()=>number
}
export interface CartItem {
  productId: string;
  qty: number;
}

export const ShoppingCartContext = createContext<ShoppingCartContext>(
  {} as ShoppingCartContext
);

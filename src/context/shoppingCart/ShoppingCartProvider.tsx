import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useBooks } from "../books/BooksProvider";

interface ShoppingCartProvider {
  children: React.ReactNode;
}

interface ShoppingCartContext {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleIncreaseProductQty: (id: string) => void;
  handleDecreaseProductQty: (id: string) => void;
  getProductQty: (id: string) => number;
  handleRemoveProduct: (id: string) => void;
  cartQty: number;
  getTotalPriceInCents: () => number;
}

export interface CartItem {
  productId: string;
  qty: number;
}

const ShoppingCartContext = createContext<ShoppingCartContext>(
  {} as ShoppingCartContext
);

function ShoppingCartProvider({ children }: ShoppingCartProvider) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cartItems",
    []
  );
  const { books } = useBooks();

  const handleIncreaseProductQty = (id: string) => {
    setCartItems((currentItems) => {
      let selectedItem = currentItems.find((item) => item.productId == id);
      if (selectedItem == null) {
        return [...currentItems, { productId: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          return item.productId == id ? { ...item, qty: item.qty + 1 } : item;
        });
      }
    });
  };
  const handleDecreaseProductQty = (id: string) => {
    setCartItems((currentItems) => {
      let selectedItem = currentItems.find((item) => item.productId == id);

      if (selectedItem?.qty === 1) {
        return currentItems.filter((item) => item.productId !== id);
      } else {
        return currentItems.map((item) => {
          return item.productId == id ? { ...item, qty: item.qty - 1 } : item;
        });
      }
    });
  };
  const getProductQty = (id: string) => {
    return cartItems.find((item) => item.productId == id)?.qty || 0;
  };
  const handleRemoveProduct = (id: string) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.productId != id);
    });
  };

  const getTotalPriceInCents = () => {
    let totalPriceCents = 0;

    cartItems.forEach((cartItem) => {
      const book = books.find(
        (b) => String(b.id) === String(cartItem.productId)
      );
      if (book) {
        totalPriceCents += book.priceCents * cartItem.qty;
      }
    });
    return totalPriceCents;
  };

  let cartQty = useMemo(() => {
    return cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleIncreaseProductQty,
        handleDecreaseProductQty,
        getProductQty,
        handleRemoveProduct,
        cartQty,
        getTotalPriceInCents,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

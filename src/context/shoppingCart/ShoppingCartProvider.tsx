import React, { useMemo } from "react";
import { ShoppingCartContext, type CartItem } from "./ShoppingCartContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import useFetchBooks from "../../hooks/useFetchBooks";
import type { IBook } from "../../types/server";

interface ShoppingCartProvider {
  children: React.ReactNode;
}

function ShoppingCartProvider({ children }: ShoppingCartProvider) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cartItems",
    []
  );

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
  
  const { books } = useFetchBooks();
  
  const getTotalPriceInCents = () => {

    let totalPriceCents = 0;

    cartItems.forEach((cartItem) => {
      const book = books.find(
        (b) => String(b.id) === String(cartItem.productId)
      );
      if (book) {
        totalPriceCents += book.priceCents;
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

import React, { useMemo } from "react";
import { ShoppingCartContext, type CartItem } from "./ShoppingCartContext";
import useLocalStorage from "../../hooks/useLocalStorage";

interface ShoppingCartProvider {
  children: React.ReactNode;
}

function ShoppingCartProvider({ children }: ShoppingCartProvider) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cartItems",
    []
  );

  const handleIncreaseProductQty = (id: number) => {
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
  const handleDecreaseProductQty = (id: number) => {
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
  const getProductQty = (id: number) => {
    return cartItems.find((item) => item.productId == id)?.qty || 0;
  };
  const handleRemoveProduct = (id: number) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.productId != id);
    });
  };

  let cartQty = useMemo(() => {
    cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
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
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;

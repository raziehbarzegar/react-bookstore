import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Store from "./pages/store/Store";
import BooksContextProvider from "./context/books/BooksContextProvider";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import ShoppingCartProvider from "./context/shoppingCart/ShoppingCartProvider";

export function App() {
  return (
    <BooksContextProvider>
      <ShoppingCartProvider>
        <div className="dark:text-white">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/books/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </div>
      </ShoppingCartProvider>
    </BooksContextProvider>
  );
}

export default App;

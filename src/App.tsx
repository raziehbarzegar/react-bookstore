import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Store from "./pages/store/Store";
import BooksContextProvider from "./context/books/BooksContextProvider";
import Product from "./pages/product/Product";

export function App() {
  return (
    <BooksContextProvider>
      <div className="dark:text-white">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/books/:id" element={<Product />} />
          </Routes>
        </Layout>
      </div>
    </BooksContextProvider>
  );
}

export default App;

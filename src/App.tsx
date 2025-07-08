import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="dark:text-white">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

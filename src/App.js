import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import LoginSignup from "./Components/LoginSignUp/LoginSignup";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import ProductsByCategory from "./Components/ProductsByCategory/ProductsByCategory";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/categories" element={<ProductsByCategory />}>
            <Route
              path=":categoryId/products"
              element={<ProductsByCategory />}
            />
          </Route>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import AppNavBar from "./Components/AppNavbar";
import HeroBanner from "./Components/HeroBanner";
import CategorySection from "./Components/CategorySection";
// import ProductListing from './Components/ProductListing';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AllProducts from "./Components/AllProducts";
import ProductListing from "./Components/ProductListing";
import Footer from "./Components/Footer";
import ContactPage from "./Components/ContactPage";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/CartContext";
import ProductDetails from "./Components/ProductDetails";
import Checkout from "./Components/Checkout";
import ShippingMethod from "./Components/ShippingMethod";
import PaymentMethod from "./Components/PaymentMethod";
import ConfirmationPage from "./Components/ConfirmationPage";
import OrderSuccess from "./Components/OrderSuccess";


function App() {
  return (
    <>
    <CartProvider>
     
      <Router>
        <div>
          <AppNavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<HeroBanner />} />
            <Route path="/categories" element={<CategorySection />} />
            <Route
              path="/products/women"
              element={<ProductListing category="women" />}
            />
            <Route
              path="/products/men"
              element={<ProductListing category="men" />}
            />
            <Route
              path="/products/electronics"
              element={<ProductListing category="electronics" />}
            />
            <Route
              path="/products/jewelery"
              element={<ProductListing category="jewelery" />}
            />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            {/* <Route
              path="/products/jwellery"
              element={<ProductListing category="jwellery" />}
            /> */}

            <Route path="/products" element={<AllProducts category="all" />} />
            <Route path="/contactus" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shipping-method" element={<ShippingMethod />} />
            <Route path="/payment-method" element={<PaymentMethod/>} />
            <Route path="/confirmation" element={<ConfirmationPage/>} />
            <Route path="/order-success" element={<OrderSuccess/>} />


            
          </Routes>
          <Footer />
        </div>
      </Router>
     
      </CartProvider>

      
    </>
  );
}

export default App;

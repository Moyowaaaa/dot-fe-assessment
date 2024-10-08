import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./pages/details";
import AddProduct from "./pages/addProduct";
import { CartProvider } from "./context/CartContext";

function App() {
  const [count, setCount] = useState(0);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<Details />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </Router>
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;

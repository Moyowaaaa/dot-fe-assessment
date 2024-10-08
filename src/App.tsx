import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/editProduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./pages/details";
import AddProduct from "./pages/addProduct";
import { CartProvider } from "./context/CartContext";
import { Toaster, resolveValue } from "react-hot-toast";
import EditProduct from "./pages/editProduct";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            success: {
              className: "toast-success",
              duration: 3000,
              style: {
                backgroundColor: "#344054",
                color: "white",
                minWidth: "max-content",
              },
            },
            error: {
              className: "toast-error",
              duration: 3000,
              style: {
                backgroundColor: "red",
                color: "white",
                minWidth: "max-content",
              },
            },
          }}
        />
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<Details />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id/edit" element={<EditProduct />} />
            </Routes>
          </Router>
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;

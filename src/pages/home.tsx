import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import { useGetProducts } from "../services/products/product-queries";
import { useGetCategories } from "../services/categories/categories-queries";
import ProductList from "../components/ProductList";

const Home = () => {
  const { data: categories } = useGetCategories();

  //   console.log(categories);

  return (
    <>
      <div className="w-full  mx-auto min-h-screen max-h-[100rem]  h-screen relative">
        <Navbar />
        <div className="w-full h-max  w-full flex bg-[#f1f0f5]">
          <Sidebar />
          <div className="w-full mx-auto h-max">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

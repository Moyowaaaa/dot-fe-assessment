import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import { useGetProducts } from "../services/products/product-queries";
import { useGetCategories } from "../services/categories/categories-queries";
import ProductList from "../components/ProductList";
import FilterSection from "../components/FilterSection";
import { ProductFilters } from "../services/products/product-model";
import PageLayout from "../layout/PageLayout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<ProductFilters>({
    order: "desc",

    maxPrice: 9999999,
    minPrice: 0,
    search: "",
    sortBy: "",
  });

  console.log({ filters });

  return (
    <>
      <PageLayout>
        <div className="w-full mx-auto h-max py-10">
          <div
            className="w-10/12  mx-auto 
                          items-center justify-between flex
"
          >
            <h1 className="font-bold text-xl">All Products</h1>

            <button
              onClick={() => navigate("/add-product")}
              className="py-2 w-[12rem] mr-12 bg-[#0f1428] text-white text-sm rounded-md flex items-center justify-center gap-4
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p>Add New Product</p>
            </button>
          </div>
          <FilterSection filters={filters} setFilters={setFilters} />
          <ProductList filters={filters} />
        </div>
      </PageLayout>
    </>
  );
};

export default Home;

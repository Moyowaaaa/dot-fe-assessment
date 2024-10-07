import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useGetProducts } from "../services/products/product-queries";
import { Product } from "../services/products/product-model";
import Loader from "./Loader";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const {
    data: products,
    isLoading,
    error,
  } = useGetProducts({
    page,
    limit,
    search,
    ...filters,
  });
  console.log(products);

  if (!products) return null;

  return (
    <>
      <div className="w-full mx-auto flex flex-col gap-2 justify-center">
        <div className="w-10/12 py-20 mx-auto">
          {isLoading ? (
            <div className="w-full h-[30rem] flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {!products ? (
                <div className="w-full h-[30rem] flex items-center justify-center">
                  No Items Found :(
                </div>
              ) : (
                <div className="w-full flex flex-wrap gap-4 w-full ">
                  {(products.products as Product[])?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;

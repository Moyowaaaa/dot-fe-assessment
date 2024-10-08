import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetProducts } from "../services/products/product-queries";
import { Product, ProductFilters } from "../services/products/product-model";
import Loader from "./Loader";

const ProductList = ({
  filters,
  page,
  limit,
}: {
  filters: ProductFilters;
  page: number;
  limit: number;
}) => {
  const { data, isLoading, error } = useGetProducts({
    page,
    limit,
    ...filters,
  });

  const products = useMemo(() => {
    if (data) return data.products;
    return null;
  }, [data, filters]);

  return (
    <>
      <div className="w-full mx-auto flex flex-col gap-2 justify-center ">
        <div className="w-11/12 lg:w-10/12 py-6 mx-auto">
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
                <div className="w-full flex flex-col items-center lg:items-start lg:flex-row flex-wrap gap-4 w-full ">
                  {products.length === 0 ? (
                    <p>No items found :(</p>
                  ) : (
                    <>
                      {(products as Product[])?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </>
                  )}
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

import React, { SetStateAction } from "react";
import { ProductFilters } from "../services/products/product-model";

const FilterSection = ({
  filters,
  setFilters,
}: {
  filters: ProductFilters;
  setFilters: React.Dispatch<SetStateAction<ProductFilters>>;
}) => {
  return (
    <>
      <div className="w-full mx-auto h-max py-10">
        <div className="w-10/12  mx-auto flex flex-col gap-4">
          <div className="flex w-full gap-4  justify-between pr-16">
            <div className="flex items-center gap-4">
              <div className="gap-2 w-[20rem] flex flex-col ">
                <h1 className="font-[700]">Search</h1>
                <input
                  type="text"
                  className="w-full bg-white p-2 rounded-[8px]"
                  placeholder="Search products..."
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      search: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="gap-2 w-[20rem] flex flex-col ">
                <h1 className="font-[700]">Price Range</h1>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-full bg-white p-2 w-3/12 rounded-[8px]"
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        minPrice: parseInt(e.target.value),
                      });
                    }}
                  />

                  <p>to</p>
                  <input
                    type="number"
                    className="w-full bg-white p-2 w-3/12 rounded-[8px]"
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        maxPrice:
                          parseInt(e.target.value) > 0
                            ? parseInt(e.target.value)
                            : 999999,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="gap-2 w-[20rem] flex flex-col self-end">
              <h1 className="font-[700]">Sort By</h1>

              <select
                className="p-2 rounded-lg"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value,
                  })
                }
              >
                <option value={"price"}>Price</option>
                <option value={"category"}>Category</option>
              </select>
            </div>
          </div>

          <div className="gap-2 w-[20rem] flex flex-col ">
            <h1 className="font-[700]">Order</h1>
            <select
              className="p-2 rounded-lg"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  order: e.target.value,
                })
              }
            >
              <option value={"desc"}>Ascending</option>
              <option value={"asc"}>Descending</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;

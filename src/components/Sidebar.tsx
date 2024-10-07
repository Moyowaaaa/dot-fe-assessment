import React, { useMemo } from "react";
import { useGetCategories } from "../services/categories/categories-queries";

const Sidebar = () => {
  const { data, isLoading, error } = useGetCategories();

  const categories = useMemo(() => {
    if (data) return data.products;
    return null;
  }, [data]);

  return (
    <>
      <div className="min-h-screen  w-2/12  py-6 h-full bg-[white] h-[110vh]">
        <h1 className="px-4">All</h1>

        {!categories ? (
          <div className="gap-2 flex flex-col">
            <p>No Categories found</p>
          </div>
        ) : (
          <>
            {categories?.map((category: any, index: number) => (
              <div className="gap-2 flex flex-col" key={index}>
                <h1 className="px-4">{category.category}</h1>

                <p className="pl-8">{category.subCategory}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;

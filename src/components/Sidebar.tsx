import React from "react";
import { useGetCategories } from "../services/categories/categories-queries";

const Sidebar = () => {
  const { data: categories, isLoading, error } = useGetCategories();

  if (!categories) return null;

  return (
    <>
      <div className="h-full w-2/12  py-6 h-full bg-[white] h-[110vh]">
        <h1 className="px-4">All</h1>

        <div className="gap-2 flex flex-col">
          <h1 className="px-4">Electronics</h1>

          <p className="pl-8">sub -all</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

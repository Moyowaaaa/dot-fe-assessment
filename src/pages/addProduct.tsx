import React from "react";
import PageLayout from "../layout/PageLayout";
import { useNavigate } from "react-router-dom";

// const SpecificationField: React.FC<{
//   spec: { key: string; value: string };
//   onKeyChange: (value: string) => void;
//   onValueChange: (value: string) => void;
//   onRemove: () => void;
//   isRemovable: boolean;
// }> = ({ spec, onKeyChange, onValueChange, onRemove, isRemovable }) => (
//   <div className="flex items-center gap-2">
//     <input
//       type="text"
//       placeholder="Key"
//       value={spec.key}
//       onChange={(e) => onKeyChange(e.target.value)}
//       className="w-5/12 p-2 border-2 rounded-md"
//     />
//     <input
//       type="text"
//       placeholder="Value"
//       value={spec.value}
//       onChange={(e) => onValueChange(e.target.value)}
//       className="w-5/12 p-2 border-2 rounded-md"
//     />
//     {isRemovable && (
//       <button
//         type="button"
//         onClick={onRemove}
//         className="p-2 bg-red-500 text-white rounded-md"
//       >
//         Remove
//       </button>
//     )}
//   </div>
// );

const AddProduct = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageLayout>
        <div className="w-full min-h-screen mx-auto h-max py-10">
          <div
            className="w-11/12 lg:w-10/12  mx-auto gap-10 lg:gap-6
            flex-col
                          justify-between flex
"
          >
            <h1 className="font-bold text-xl">Create New Product</h1>

            <div className="w-full  bg-white rounded-md p-6">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl">Create New Product</h1>

                <p
                  className="hover:border-b-2 cursor-pointer w-max"
                  onClick={() => navigate("/")}
                >
                  &larr; <span>Back to products</span>
                </p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                  <div className="flex flex-col gap-2 w-full lg:w-6/12">
                    <label>Product Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full lg:w-6/12">
                    <label>Product Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                  <div className="flex flex-col gap-2 w-full lg:w-6/12">
                    <label>Category</label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full lg:w-6/12">
                    <label>Sub Category</label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                  <div className="flex flex-col gap-2 w-full lg:w-6/12">
                    <label>Price</label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full lg:w-6/12">
                    <label>Stock</label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 rounded-md"
                    />
                  </div>
                </div>

                <div className="w-full gap-2 flex flex-col">
                  <label>Description</label>
                  <textarea className="resize-none h-[5rem] border-2 rounded-md"></textarea>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label>Image URL</label>
                  <input
                    type="text"
                    className="w-full p-2 border-2 rounded-md"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default AddProduct;

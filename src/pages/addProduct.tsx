import React, { useState } from "react";
import PageLayout from "../layout/PageLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // For showing success/error messages
import { useAddProduct } from "../services/products/product-mutations";
import { Product } from "../services/products/product-model";
import Loader from "../components/Loader";

interface specificationFields {
  specification: { key: string; value: string };
  onKeyChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onRemove: () => void;
}

const SpecificationField = ({
  specification,
  onKeyChange,
  onValueChange,
  onRemove,
}: specificationFields) => (
  <div className="flex items-center gap-2">
    <input
      type="text"
      placeholder="Key"
      value={specification.key}
      onChange={(e) => onKeyChange(e.target.value)}
      className="w-6/12 p-2 border-2 rounded-md"
    />
    <input
      type="text"
      placeholder="Value"
      value={specification.value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-6/12 p-2 border-2 rounded-md"
    />
    <button
      type="button"
      onClick={onRemove}
      className="py-2 px-4 bg-red-500 text-white rounded-md"
    >
      X
    </button>
  </div>
);

const AddProduct = () => {
  const navigate = useNavigate();
  const { mutateAsync: addProduct } = useAddProduct();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);

  const handleSpecificationChange = (
    index: number,
    field: keyof { key: string; value: string },
    value: string
  ) => {
    setSpecifications((prev) => {
      const newSpecs = [...prev];
      newSpecs[index][field] = value;
      return newSpecs;
    });
  };

  const addSpecification = () => {
    setSpecifications((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications((prev) =>
      prev.filter((_, specIndex) => specIndex !== index)
    );
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    const productSpecifications: Record<string, string> = {};
    specifications.forEach((spec) => {
      if (spec.key && spec.value) {
        productSpecifications[spec.key] = spec.value;
      }
    });

    const newProduct = {
      name,
      category,
      subCategory,
      price,
      stock,
      description,
      imageUrl,
      specifications: productSpecifications,
      brand,
      rating: 0,
      reviews: 0,
    };

    console.log(newProduct);

    try {
      await addProduct(newProduct as Product);
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Product added successfully");

        navigate("/");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred, please try again");
    }
  };

  return (
    <>
      <PageLayout>
        <div className="w-full min-h-screen mx-auto h-max py-10">
          <div className="w-11/12 lg:w-10/12 mx-auto gap-10 lg:gap-6 flex-col justify-between flex">
            <h1 className="font-bold text-xl">Create New Product</h1>

            <div className="w-full flex flex-col gap-4 bg-white rounded-md p-6">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl">Create New Product</h1>
                <p
                  className="hover:border-b-2 cursor-pointer w-max"
                  onClick={() => navigate("/")}
                >
                  &larr; <span>Back to products</span>
                </p>
              </div>

              {isLoading ? (
                <div className="h-[30rem] flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                    <div className="flex flex-col gap-2 w-full lg:w-6/12">
                      <label>Product Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border-2 rounded-md"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full lg:w-6/12">
                      <label>Brand</label>
                      <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full p-2 border-2 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                    <div className="flex flex-col gap-2 w-full lg:w-6/12">
                      <label>Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border-2 rounded-md"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full lg:w-6/12">
                      <label>Sub Category</label>
                      <input
                        type="text"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full p-2 border-2 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                    <div className="flex flex-col gap-2 w-full lg:w-6/12">
                      <label>Price</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        className="w-full p-2 border-2 rounded-md"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full lg:w-6/12">
                      <label>Stock</label>
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value))}
                        className="w-full p-2 border-2 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label>Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="resize-none h-[5rem] border-2 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full p-2 border-2 rounded-md"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Specifications</label>
                    <div className="w-full items-end gap-6 flex">
                      <div className="w-full flex flex-col gap-2">
                        {specifications.map((specification, index) => (
                          <SpecificationField
                            key={index}
                            specification={specification}
                            onKeyChange={(value) =>
                              handleSpecificationChange(index, "key", value)
                            }
                            onValueChange={(value) =>
                              handleSpecificationChange(index, "value", value)
                            }
                            onRemove={() => removeSpecification(index)}
                          />
                        ))}
                      </div>
                      <div className="w-max">
                        <button
                          type="button"
                          onClick={addSpecification}
                          className="mt-2 py-2 px-4 bg-[black] text-white rounded-md"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <button
                      type="submit"
                      className="py-3 min-w-[8rem] bg-[#0f1428] font-900 text-white text-sm rounded-md"
                    >
                      Create Product
                    </button>

                    <button
                      onClick={() => navigate("/")}
                      className="py-3 min-w-[8rem] bg-[white] font-bold text-black text-sm rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default AddProduct;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import { useGetProduct } from "../services/products/product-queries";
import toast from "react-hot-toast";
import { Product } from "../services/products/product-model";
import { useUpdateProduct } from "../services/products/product-mutations";

interface SpecificationField {
  specification: { key: string; value: string };
  onKeyChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onRemove: () => void;
}

const SpecificationField: React.FC<SpecificationField> = ({
  specification,
  onKeyChange,
  onValueChange,
  onRemove,
}) => (
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

const EditProduct: React.FC = () => {
  const { id } = useParams();
  if (!id) return null;

  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProduct(id);
  const { mutateAsync: updateProduct } = useUpdateProduct(id);

  const [productDetails, setProductDetails] = useState({
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
    specifications: [{ key: "", value: "" }],
  });

  useEffect(() => {
    if (product) {
      setProductDetails({
        ...product,
        specifications: Object.entries(product.specifications).map(
          ([key, value]) => ({ key, value })
        ),
        stock: product.stock.toString(),
        price: product.price.toString(),
      });
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecificationChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setProductDetails((prev) => {
      const newSpecs = [...prev.specifications];
      newSpecs[index][field] = value;
      return { ...prev, specifications: newSpecs };
    });
  };

  const addSpecification = () => {
    setProductDetails((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    setProductDetails((prev) => ({
      ...prev,
      specifications: prev.specifications.filter(
        (_, specIndex) => specIndex !== index
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productSpecifications: Record<string, string> = {};
    productDetails.specifications.forEach((spec) => {
      if (spec.key && spec.value) {
        productSpecifications[spec.key] = spec.value;
      }
    });

    const updatedProduct = {
      ...productDetails,
      price: Number(productDetails.price),
      stock: Number(productDetails.stock),
      specifications: productSpecifications,
    };

    try {
      await updateProduct(updatedProduct as Product);
      toast.success("New product details saved");
      navigate("/");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <PageLayout>
      <div className="w-full min-h-screen mx-auto h-max py-10">
        <div className="w-11/12 lg:w-10/12 mx-auto gap-10 lg:gap-6 flex-col justify-between flex">
          <h1 className="font-bold text-xl">Edit Product</h1>

          <div className="w-full flex flex-col gap-4 bg-white rounded-md p-6">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">
                Edit Product: {productDetails.name}
              </h1>
              <p
                className="hover:border-b-2 cursor-pointer w-max"
                onClick={() => navigate("/")}
              >
                &larr; <span>Back to products</span>
              </p>
            </div>

            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                <div className="flex flex-col gap-2 w-full lg:w-6/12">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productDetails.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-6/12">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={productDetails.brand}
                    onChange={handleInputChange}
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
                    name="category"
                    value={productDetails.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-6/12">
                  <label>Sub Category</label>
                  <input
                    type="text"
                    name="subCategory"
                    value={productDetails.subCategory}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                <div className="flex flex-col gap-2 w-full lg:w-6/12">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={productDetails.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-6/12">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={productDetails.stock}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 rounded-md"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label>Description</label>
                <textarea
                  name="description"
                  value={productDetails.description}
                  onChange={handleInputChange}
                  className="resize-none h-[5rem] border-2 rounded-md p-2"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label>Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={productDetails.imageUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Specifications</label>
                <div className="w-full items-end gap-6 flex">
                  <div className="w-full flex flex-col gap-2">
                    {productDetails.specifications.map(
                      (specification, index) => (
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
                      )
                    )}
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
                  Update Product
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="py-3 min-w-[8rem] bg-[white] font-bold text-black text-sm rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditProduct;

import React from "react";
import PageLayout from "../layout/PageLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetProduct } from "../services/products/product-queries";
import Loader from "../components/Loader";
import { sentenceCase } from "../utils/utils";
import { useDeleteProduct } from "../services/products/product-mutations";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  if (!id) return null;

  const { data: product, isLoading, error } = useGetProduct(id);

  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const onDeleteProduct = async () => {
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <>
      <PageLayout>
        <div className="w-full mx-auto h-max py-10">
          <div
            className="w-10/12  mx-auto gap-6
            flex-col
                          justify-between flex
"
          >
            <h1 className="font-bold text-xl">Product Details</h1>

            {isLoading ? (
              <div className="w-full h-[30rem] flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <div className="w-full  flex flex-col">
                  <div className="w-full py-6 bg-white px-4 ">
                    <p
                      className="hover:border-b-2 cursor-pointer w-max"
                      onClick={() => navigate("/")}
                    >
                      &larr; <span>Back to products</span>
                    </p>
                  </div>
                  <div className="w-full h-[32rem] flex">
                    <div className="h-full  min-w-[20rem] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width=" 100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        className=" bg-[#e6e6e6]"
                      >
                        <path
                          d="M16.2 21H6.93137C6.32555 21 6.02265 21 5.88238 20.8802C5.76068 20.7763 5.69609 20.6203 5.70865 20.4608C5.72312 20.2769 5.93731 20.0627 6.36569 19.6343L14.8686 11.1314C15.2646 10.7354 15.4627 10.5373 15.691 10.4632C15.8918 10.3979 16.1082 10.3979 16.309 10.4632C16.5373 10.5373 16.7354 10.7354 17.1314 11.1314L21 15V16.2M16.2 21C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2M16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="w-10/12 border-t-2  bg-[white] flex flex-col gap-4 p-4">
                      <h1 className="text-2xl font-[700] text-[#817eeb] ">
                        {product?.category} <span>&gt;</span>{" "}
                        {product?.subCategory}
                      </h1>

                      <h1 className="text-2xl font-bold">{product?.name}</h1>
                      <p className="text-[#737a84] font-500">
                        {product?.description}
                      </p>
                      <div className="flex gap-2 items-end">
                        <h1 className="text-2xl font-bold">
                          ${product?.price}
                        </h1>
                        <p className="text-[#737a84] font-500">
                          in stock: {product?.stock}
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width=" 20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"
                            stroke="#fcc513"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="#fcc513"
                          />
                        </svg>
                        <p className="font-[#767984] font-500">
                          {product?.rating} ({product.reviews} Reviews)
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <h1 className="text-xl font-[700]">Specifications</h1>
                        {Object.keys(product.specifications).map((key) => (
                          <p key={key} className="font-[#767984]">
                            <strong>{sentenceCase(key)}: </strong>
                            {String(product.specifications[key])}
                          </p>
                        ))}
                      </div>
                      <div className="w-max pt-4 flex items-center gap-4">
                        <button className="py-3 w-[8rem] bg-[#0f1428] font-900 text-white text-sm rounded-md">
                          Add to Cart
                        </button>

                        <button className="py-3 w-[8rem] bg-[#0f1428] font-900 text-white text-sm rounded-md">
                          Edit Product
                        </button>

                        <button
                          onClick={() => onDeleteProduct()}
                          className="py-3 w-[8rem] bg-[red] font-900 text-white text-sm rounded-md"
                        >
                          Delete Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Details;

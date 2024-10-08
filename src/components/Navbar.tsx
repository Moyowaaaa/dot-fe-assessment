import React, { useContext, useRef, useState } from "react";
import { CartContext, CartProvider } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Navbar = () => {
  const navigate = useNavigate();
  const { getTotalItems, cart } = useContext(CartContext);
  const { removeFromCart, addToCart, decreaseQuantity, getTotalPrice } =
    useContext(CartContext);
  const [showCart, setShowCart] = useState<boolean>(false);
  const cartBarRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(cartBarRef, () => setShowCart(false));

  const onRemoveFromCart = (productId: number) => {
    try {
      removeFromCart(productId);
      toast.success("Removed item from cart");
    } catch (error) {
      toast.error(`An error occured, please try again`);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center w-full lg:max-w-[85rem] mx-auto justify-between  py-4 w-full pl-6 pr-4 lg:pl-20 lg:gap-[70rem]">
          <h1
            className="text-2xl font-bold hover:underline cursor-pointer "
            onClick={() => navigate("/")}
          >
            Test App
          </h1>

          <div
            className="flex gap-1 cursor-pointer"
            onClick={() => setShowCart(!showCart)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="h-4 w-4  rounded-[50%] text-xs bg-black text-white flex items-center justify-center">
              {getTotalItems()}
            </div>
          </div>
        </div>
        <div
          className={`fixed h-screen w-full top-0 bg-transparent right-0  px-6 flex flex-col
            ease-in-out duration-700 ${
              showCart ? " translate-x-0" : " translate-x-[150%]"
            }
            `}
        >
          <div className="overlay"></div>
          <div
            className={`w-[30rem] h-screen top-0 right-0 fixed bg-white flex flex-col ease-in-out duration-700 `}
            ref={cartBarRef}
          >
            <div
              className="absolute right-10 top-6 cursor-pointer"
              onClick={() => setShowCart(!showCart)}
            >
              X
            </div>
            <div className="flex flex-col gap-2 mt-12 px-10">
              <h1 className="font-bold text-xl">Shopping Cart</h1>
              <p>You have {getTotalItems()} items in your cart</p>

              {cart?.map((c, index) => (
                <div className="w-full    flex items-center gap-4" key={index}>
                  <div className="w-4/12  h-[7rem] bg-[#e6e6e6]"></div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg max-w-[8rem]">{c.name}</h1>
                    <p>${c.price} each</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div
                      className="py-2 px-4 w-max border-2 h-max w-max rounded-md cursor-pointer"
                      onClick={() => decreaseQuantity(c.id)}
                    >
                      -
                    </div>
                    {c?.quantity}
                    <div
                      onClick={() => addToCart(c)}
                      className="py-2 px-4 w-max border-2 h-max w-max rounded-md"
                    >
                      +
                    </div>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => onRemoveFromCart(c.id)}
                  >
                    x
                  </div>
                </div>
              ))}
              <div className="w-full justify-between flex font-bold text-lg">
                <h1>Total:</h1>
                {cart.length > 0 && <p>{getTotalPrice()}</p>}
              </div>
              <button className="py-2 w-full bg-[#0f1428] text-white text-sm rounded-md">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

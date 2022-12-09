import { Disclosure } from "@headlessui/react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import logo from "../images/grocessies_logo-removebg-preview.png";

export default function Navbar(props) {
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cart"));

  return (
    <Disclosure as="nav" className="bg-lime-600">
      <>
        <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8 ">
          <div className="relative flex h-24 items-center justify-between">
            <div className="flex flex-1 items-center justify-center  sm:justify-start">
              <div className="flex justify-start">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-10 w-auto sm:h-16 cursor-pointer"
                  src={logo}
                  alt=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                />
              </div>
              <div className="">
                <Dropdown />
              </div>
            </div>

            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/product/cart");
                }}
                className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
              >
                Cart
                <div className="color-black px-2">
                  {props.length
                    ? props.length
                    : !cartItems
                    ? 0
                    : cartItems?.length}
                </div>
              </button>

              {localStorage.getItem("userId") ? (
                <>
                  <button
                    className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/active-orders");
                    }}
                  >
                    My Orders
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("userId");
                      navigate("/");
                    }}
                    className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                    className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signin");
                    }}
                    className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}

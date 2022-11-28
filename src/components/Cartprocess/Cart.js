import React, { useEffect, useState } from "react";
import Navbar from "../Mainpage/Navbar";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

export default function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(
    !localStorage.getItem("cart")
      ? []
      : JSON.parse(localStorage.getItem("cart"))
  );

  let item;

  useEffect(() => {
    if (cartItems) {
      // console.log(cartItems, "items");
      cartItems.map((cartItem) => {
        if (cartItem.productId) {
          axios
            .get(`/product-details/${cartItem.productId}`)
            .then((a) => {
              // console.log(cartItem.count, "1");
              // console.log(a.data, "2");
              item = { count: cartItem.count, data: a.data };
              // console.log(item, "item in useffect");
              setProducts((current) => [...current, item]);
            })
            .catch((b) => {
              console.log(Error);
            });
        }
      });
    } else {
      console.log({ error: "no items in the cart" });
    }
  }, []);

  console.log(products, "p");

  const addItemHandler = (product) => {
    console.log(product, "89");

    for (let i = 0; i < cartItems?.length; i++) {
      if (cartItems[i].productId === product.data._id) {
        console.log(product.count++, "new count");

        console.log(cartItems[i].count++, " cartItems[i].count++");
        setCart(cartItems);
        console.log(cart, "cart");
        break;
      }
      if (i === cartItems.length - 1) {
        console.log({ error: "prodcut not found" });
      }
    }
  };

  const removeItemHandler = (product) => {
    if (product.count === 1) {
      const filtered = cartItems.filter((cartItem) => {
        return cartItem.productId !== product.data._id;
      });
      setCart(filtered);
    } else {
      for (let i = 0; i < cartItems?.length; i++) {
        if (cartItems[i].productId === product.data._id) {
          cartItems[i].count--;
          product.count--;
          setCart(cartItems);
        }
      }
    }
  };

  const removeRowHandler = (product) => {
    try {
      const filtered = cartItems.filter((cartItem) => {
        return cartItem.productId !== product.data._id;
      });
      setCart(filtered);
    } catch (error) {
      console.log({ error: "error in removing item" });
    }
  };

  console.log(cart, "cart");

  const emptyBasketHandler = () => {
    try {
      localStorage.removeItem("cart");
    } catch (error) {
      console.log({ error: "error in emptying basket" });
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <Navbar length={cartItems?.length} />
      <div className=" relative m-8 p-6">
        <div className="col-span-2 font-bold pb-4 text-2xl">Shopping Cart</div>
        <div className="pt-3">
          <table className="table-auto w-full rounded-md bg-gray-100 ">
            <thead>
              <tr className="border-b-2 border-gray-400">
                <th className="p-3">ITEM DESCRIPTION</th>
                <th>UNIT PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
                <th></th>
              </tr>
            </thead>
            {products.length === 0 ? (
              <tbody>
                <tr>
                  <td className="p-2 pl-4 text-xl">No item in your Cart.</td>
                </tr>
              </tbody>
            ) : (
              products.map((product) => {
                return (
                  <tbody key={product.data._id}>
                    <tr className="border-b-2 border-gray-200">
                      <td className="p-2 ">
                        <span>
                          <img
                            alt={"product"}
                            src={product.data.imageSrc}
                            className="w-16 inline rounded-md"
                          ></img>
                          <span className="pl-4">{product.data.name}</span>
                        </span>
                      </td>
                      <td>&#8377;{product.data.price}</td>
                      <td>
                        <div>
                          <button
                            className="bg-lime-600 hover:bg-lime-700 rounded-md text-white font-bold py-1 px-3"
                            onClick={() => removeItemHandler(product)}
                          >
                            -
                          </button>
                          <label className="w-8 h-8 p-2">{product.count}</label>

                          <button
                            className="bg-lime-600 rounded-md hover:bg-lime-700 text-white font-bold py-1 px-2"
                            onClick={() => addItemHandler(product)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>&#8377;{product.data.price * product.count}</td>
                      <td>
                        <button
                          onClick={() => {
                            removeRowHandler(product);
                          }}
                          className="font-bold text-black hover:text-red-500"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </table>
        </div>
        {products.length !== 0 ? (
          <div>
            <button
              onClick={() => {
                emptyBasketHandler();
              }}
              className=" l-0 absolute items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-600  mt-6 p-2 text-x font-bold  text-white shadow-sm hover:bg-red-700 hover:shadow-md hover:shadow-red-500"
            >
              Empty Basket
            </button>
            <div className="bg-gray-100 p-4  h-auto shadow-lg shadow-gray-200 absolute m-10 right-0 w-96">
              <div className="  text-black text-2xl">
                <span className="mr-48 font-bold">Total</span>
                <span>
                  &#8377;
                  {products.reduce(
                    (total, product) =>
                      total + product.data.price * product.count,
                    0
                  )}
                </span>
                <button
                  className=" items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-600 px-6 py-2 mt-6 font-bold text-xl  text-white shadow-sm hover:bg-lime-700 hover:shadow-md hover:shadow-lime-500"
                  onClick={() =>
                    navigate("/cart/address", {
                      state: { length: cartItems.length },
                    })
                  }
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className=" mx-8 relative px-6">
        <NavLink
          to={"/"}
          className="hover:text-lime-600 left-6 top-10 font-bold text-2xl absolute "
        >
          Continue Shopping
        </NavLink>
      </div>
    </div>
  );
}

import Navbar from "../mainPages/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddNewDeliveryAddress from "./AddNewAddress";
import UpdateAddress from "./UpdateAddress";
import {ToastContainer, toast} from "react-toastify"
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
  injectStyle();
}

export default function Address() {
  const [addresslength, setAddressLength] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const location = useLocation();
  const UserId = localStorage.getItem("userId");

  const [form, setForm] = useState(false);
  // const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    try {
      axios.get(`/address-details/${UserId}`).then((response) => {
        console.log(response.data.length, "response.data.length");
        setAddressLength(response.data.length);
        setAddresses(response.data);
        console.log(response.data, "data");
      });
    } catch (error) {
      console.log(error);
    }
  }, [UserId, setAddressLength, setAddresses]);

  // incomplete edit form
  const editHandler = (address) => {
    return (
      <div>
        {console.log(address, "address")}
        <UpdateAddress addressDetails={address} />
      </div>
    );
  };
  // incomplete edit form
  const showForm = () => {
    return (
      <div>
        <AddNewDeliveryAddress />
      </div>
    );
  };

  const deliveryAddressHandler = (addressId) => {
    console.log(addressId, "address");
    localStorage.setItem("addressId", JSON.stringify(addressId));
    toast.success("Address Selected Successfully.",{position: toast.POSITION.TOP_CENTER});
  };

  const placeOrderHandler = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const itemdetail = [];
    const count=[] 
    let totalCount = 0;

    for (let i = 0; i < cartItems.length; i++) {
      itemdetail.push({itemdetail:cartItems[i].productId});
      count.push(cartItems[i].count)
      totalCount += cartItems[i].count;
    }
console.log(itemdetail,"itemdetail");
console.log(count,"count");
    try {
      const res = await fetch("/placeOrder", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          Products : itemdetail,
          productQuantity: totalCount,
          count: count,
          orderAmount: JSON.parse(localStorage.getItem("totalAmount")),
          DeliveryAddress: JSON.parse(localStorage.getItem("addressId")),
        }),
      });

      if (res.status === 201) {
        console.log("order placed successfully");
        toast.success("Thank you for your order.",{position: toast.POSITION.TOP_CENTER});
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar length={location.state.length} />
      <div className="m-6 p-6">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid grid-cols-4  md:gap-6">
            <div className="md:col-span-1">
            <div className="px-4 mt-4 sm:px-0">
                <a className="text-lg font-medium leading-6 text-gray-400 hover:text-gray-700" href="/">
                 Home
                </a>
              </div>
              <div className="px-4 mt-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-700">
                  Delivery Addresses
                </h3>
              </div>
              <div className="px-4 mt-4 sm:px-0">
                <a className="text-lg font-medium leading-6 text-gray-400 hover:text-gray-700"
                href="/product/cart">
                 Cart
                </a>
              </div>
              <div className="px-4 mt-4 sm:px-0">
                <a className="text-lg font-medium leading-6 text-gray-400 hover:text-gray-700" href="/my-orders">
                 My Orders
                </a>
              </div>
            </div>
            <div className="mt-5 md:col-span-3 md:mt-0">
              {addresslength !== 0 ? (
                <div className="border-solid border-l-2 border-gray-300 p-4 ">
                  {addresses.map((address) => {
                    return (
                      <div
                        key={address._id}
                        className="  inline-block w-64 grid-cols-3 text-sm  text-gray-600 "
                      >
                        <div className="bg-gray-100 hover:shadow-md hover:shadow-lime-400 p-4 rounded-md border-solid border-2 border-lime-500 m-1 ">
                          <div className="text-lime-600 text-xl">Address</div>
                          <div className="h-28 overflow-y-auto ">
                            <div>{address.name}</div>
                            <div>
                              {address.address}, {address.pinCode}
                            </div>
                            <div>
                              {address.city}-{address.pinCode}
                            </div>
                            <div>ph: {address.mobileNo}</div>
                          </div>
                          <span className="inline-flex">
                            <button
                              className="border-solid hover:shadow-lg hover:shadow-gray-400 border-2 border-gray-300 p-2 rounded-md"
                              onClick={() => {
                                deliveryAddressHandler(address._id);
                              }}
                            >
                              Deliver Here
                            </button>
                            <button
                              className="mx-4"
                              onClick={() => {
                                editHandler(address);
                                // setEditForm(true);
                              }}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                ></path>
                              </svg>
                            </button>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <div className="font-semibold mx-8">
                    Nothing to show. Start Adding Address !{" "}
                  </div>
                </div>
              )}
              <div className="my-8 border-solid border-t-2 border-gray-300 grid grid-cols-4 gap-4 content-center">
                <div></div>
                <button
                  className="bg-lime-600 mt-4 p-2 text-white rounded-md hover:bg-lime-700 font-semibold"
                  onClick={() => {
                    setForm(true);
                  }}
                >
                  Add New Address
                </button>
                <button
                  className="bg-red-600 mt-4 p-2 text-white rounded-md hover:bg-red-700 font-semibold"
                  onClick={() => placeOrderHandler()}
                >
                  Place Order
                </button>
                <ToastContainer/>
              </div>
              {form ? showForm() : <div></div>}
              {/* {editForm ? editHandler() : <div></div>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

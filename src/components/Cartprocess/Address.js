import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../mainPages/Navbar";
import EditAddressForm from "./updateAddress";
import DeliveryAddressForm from "./addAddress";
import { AddressId, GetAddress } from "../../redux/address/addressActions";

export default function Address() {
  const dispatch = useDispatch();
  const addressId = useSelector((state) => state.address.addressId);
  const [addresses, setAddresses] = useState([]);

  const [done, setDone] = useState(false);

  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("/address-details", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userId"),
          },
        })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            setAddresses(response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [addresses.length]);

  const deliveryAddressHandler = (addressId) => {
    dispatch(AddressId(addressId));
    setDone(!done);
  };

  const deleteHandler = async (addressId) => {
    try {
      axios.patch(`/deleteAddress/${addressId}`).then((response) => {
        console.log(response.data, "response");
      });

      const filteredAddress = addresses.filter((e) => {
        return e._id !== addressId;
      });
      setAddresses(filteredAddress);

      for (let i = 0; i < addresses.length; i++) {
        if (addressId === addresses[i]._id) dispatch(AddressId(""));
        break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster/>
      <div className="m-6 p-6">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid grid-cols-4  md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 mt-4 sm:px-0">
                <button
                  className="text-lg font-medium leading-6 text-gray-400 hover:text-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Home
                </button>
              </div>
              <div className="px-4 mt-4 sm:px-0">
                <button
                  className="text-lg font-medium leading-6 text-gray-400 hover:text-gray-700"
                  href="/product/cart"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/product/cart");
                  }}
                >
                  Cart
                </button>
              </div>

              <div className="px-4 mt-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-700">
                  Delivery Addresses
                </h3>
              </div>

              <div className="px-4 mt-4 sm:px-0">
                <button
                  className="text-lg font-medium leading-6 text-gray-400 hover:text-gray-700"
                  href="/my-orders"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/active-orders");
                  }}
                >
                  My Orders
                </button>
              </div>
            </div>

            <div className="mt-5 md:col-span-3 md:mt-0">
              {addForm ? (
                <DeliveryAddressForm
                  addresses={addresses}
                  setAddresses={setAddresses}
                  setAddForm={setAddForm}
                />
              ) : editForm ? (
                <EditAddressForm
                  addresses={addresses}
                  setEditForm={setEditForm}
                />
              ) : (
                <div>
                  <div>
                    {addresses?.length !== 0 ? (
                      <div className="border-solid border-l-2 border-gray-300 p-4 ">
                        {addresses?.map((address) => {
                          return (
                            <div
                              key={address._id}
                              className="  inline-block w-64 grid-cols-3 text-sm  text-gray-600 "
                            >
                              <div className="bg-gray-100 hover:shadow-md hover:shadow-lime-400 p-4 rounded-md border-solid border-2 border-lime-500 m-1 ">
                                <div className="text-lime-600 text-xl">
                                  Address
                                </div>
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
                                    className="mx-2 hover:text-indigo-600"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "editAddressId",
                                        address._id
                                      );

                                      setAddForm(false);
                                      setEditForm(true);
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

                                  <button
                                    className="hover:text-red-600"
                                    onClick={() => deleteHandler(address._id)}
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
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      ></path>
                                    </svg>
                                  </button>
                                  {address._id === addressId ? (
                                    <button className="pl-2 ">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="3.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 text-lime-600  "
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M4.5 12.75l6 6 9-13.5"
                                        />
                                      </svg>
                                    </button>
                                  ) : (
                                    <></>
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold mx-8">
                          Add Delivery Address !{" "}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="my-8 border-solid border-t-2 border-gray-300 grid grid-cols-4 gap-4 content-center">
                    <div></div>
                    <button
                      className="bg-lime-600 mt-4 p-2 text-white rounded-md hover:bg-lime-700 font-semibold"
                      onClick={() => {
                        setAddForm(true);
                        setEditForm(false);
                      }}
                    >
                      Add New Address
                    </button>
                    <button
                      className="bg-red-600 mt-4 p-2 text-white rounded-md hover:bg-red-700 font-semibold"
                      onClick={() => {
                        if (!addressId) {
                          toast.error("Address Not Selected.");
                        } else {
                          dispatch(GetAddress(addresses));
                          console.log(addresses, "addresses");
                          navigate("/cart/address/checkout");
                        }
                      }}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

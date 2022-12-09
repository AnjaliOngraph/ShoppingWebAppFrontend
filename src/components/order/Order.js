import axios from "axios";
import Navbar from "../mainPages/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    }

    axios
      .get("/orders", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("userId"),
        },
      })
      .then((a) => {
        setOrders(a.data);
      })
      .catch((b) => {
        console.log(Error);
      });
  }, [userId]);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  console.log(orders, "orders");
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  return (
    <div>
      <Navbar length={cartItems?.length} />
      <div className=" relative m-8 p-6">
        <div className="col-span-2 font-bold pb-4 text-2xl ">My Orders</div>
        {console.log(orders.length)}
        {orders.length === 0 ? (
          <div>No item Ordered yet</div>
        ) : (
          <div>
            <div className="mt-4 ">
              <table className="table-auto w-full  bg-white bg-gradient-to-b from-slate-100 via-white to-slate-100 ">
                <thead className="bg-lime-600 text-white">
                  <tr className="border-b-2 ">
                    <th className="text-center">Order Placed</th>
                    <th className="p-3 pl-8  text-center ">Order Id</th>
                    <th className="text-center">Total Quanity</th>
                    <th className="text-center">Total Amount</th>
                  </tr>
                </thead>

                {orders.map((order) => {
                  return (
                    <tbody
                      key={order._id}
                      className="text-center hover:bg-gray-100
                   
                      hover:shadow-gray-200 hover:border-solid "
                    >
                      <tr className="border-b-2 border-gray-200 h-20 cursor-pointer " onClick={()=>navigate("/myOrder/orderDetails",{state:{orderDetails: order}})}>
                        <td className="  w-52 text-center  ">
                          {formatter.format(Date.parse(order.createdAt))}
                        </td>

                        <td className="text-center font-semibold">
                          <div>{order._id}</div>
                        </td>

                        <td className="text-center">{order.productQuantity}</td>

                        <td className="text-center font-semibold">
                          {" "}
                          &#8377;{order.orderAmount}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        )}

        <div className="m-10 mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className=" items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-600  mt-6 p-2 text-x font-bold  text-white shadow-sm hover:bg-lime-700 hover:shadow-md hover:shadow-lime-400"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}

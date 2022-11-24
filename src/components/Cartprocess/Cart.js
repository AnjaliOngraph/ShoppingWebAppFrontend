import React from "react";
import Navbar from "../Mainpage/Navbar";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../Mainpage/Navbar";
// import { NavLink } from "react-router-dom";

// const cartFromLocalStorage= JSON.parse(localStorage.getItem('cart')) || []
// export default function Cart() {
//   const [items, setItems] = useState("");

//   useEffect(() => {
//     const item = JSON.parse(localStorage.getItem("cart"));
//     console.log(item);
//     if (item) {
//       item.map((i) => setItems(i));
//     }
//   }, []);
//   console.log(items, "i");
//   const id = items;
//   const [product, setProduct] = useState([]);

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`/product-details/${id}`)
//         .then((a) => {
//           setProduct(a.data);
//         })
//         .catch((b) => {
//           console.log(Error);
//         });
//     }
//   }, [id]);

//   console.log(product, "pro");

//   return (
//     <div className="bg-white">
//       <Navbar />
//        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 ">
//         {/* <h2 className="sr-only">Products</h2> */}

//         <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6   ">

//             <div key={"div" + product._id}>
//               <a
//                 key={product._id}
//                 href={`/product-details/${product._id}`}
//                 className="group"
//               >
//                 <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ">
//                   <img
//                     src={product.imageSrc}
//                     alt={product.imageAlt}
//                     className="h-full w-full object-cover object-center group-hover:opacity-75"
//                   />
//                 </div>
//                 <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>

//                 <p className="mt-1 text-lg font-medium text-gray-900">
//                   &#x20B9;
//                   {product.price}
//                 </p>
//               </a>
//               <button
//                 type="submit"
//                 className="flex items-center justify-center rounded-md border border-transparent bg-lime-600  px-4 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
//               >
//                 remove from Cart
//               </button>
//             </div>

//         </div>
//       </div> : <p className="my-6 mx-4" > There are no items in your basket.</p>}

//       <div>
//         <NavLink to="/" className="px-6">
//             Continue Shopping
//         </NavLink>
//       </div>
//     </div>
//   );
// }

import IncDec from "./IncDec";

export default function Cart() {
  const items = JSON.parse(localStorage.getItem("cart"));

  console.log(items);

  return (
    <div>
      <Navbar length={items.length} />
      <div className=" m-8 p-6">
        <div className="col-span-2 font-bold pb-4 text-2xl">Shopping Cart</div>
        <div className="pt-3">
          <table className="table-auto w-full bg-gray-100 ">
            <thead className="">
              <tr className="border-b-2 border-gray-400">
                <th className="p-3">ITEM DESCRIPTION</th>
                <th>UNIT PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            {items.map((item) => (
              <tbody>
                <tr className="border-b-2 border-gray-200">
                  <td className="p-6">{item.name}</td>
                  <td>{item.price}</td>
                  <td><IncDec id={item._id}/></td>
                  <td>{}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

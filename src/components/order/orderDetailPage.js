import Navbar from "../mainPages/Navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import{ useSelector} from "react-redux"

export function OrderDetailPage() {
  const location = useLocation();

  const details = useSelector(state=>state.order.getOrder)
  console.log(details);
const navigate = useNavigate();
  let productList = [];

  for (let i = 0; i < details?.Products?.length; i++) {
    productList[i] = {
      itemdetail: details.Products[i].itemdetail,
      count: details.count[i],
    };
  }

  console.log(productList, "plist");

  return (
    <>
      <Navbar />
      <div className="flex h-full bg-gray-200 ">
        <div className="w-3/4 mx-auto bg-white pt-10 ">
          <div className="gap-1 mx-10 p-4 bg-gradient-to-b from-slate-100 via-white to-slate-100 grid grid-rows-1 rounded-md grid-cols-3 border shadow-inner shadow-gray-300 pl-6 pb-6 ">
            <div className=" p-1 row-span-1 col-span-1 border-r-2 border-gray-300 ">
              <div className="text-xl font-semibold text-gray-700 mb-2  ">
                Your delivery address{" "}
              </div>
              <div className="text-base">{details.DeliveryAddress.name}</div>
              <div className="text-base">{details.DeliveryAddress.address}</div>
              <div className="text-base">
                {details.DeliveryAddress.city} -{" "}
                {details.DeliveryAddress.pinCode}
              </div>
              <div className="text-base">
                Phone: {details.DeliveryAddress.mobileNo}
              </div>
            </div>

            <div className="p-1 row-span-1  col-span-1 border-r-2 border-gray-300 pl-2">
              <div className="text-xl font-semibold text-gray-700 mb-2  ">
                Your delivery slot{" "}
              </div>
              <div className="text-base ">
                {" "}
                Tue 03 May 2022 between 07:00 AM and 10:00 AM
              </div>
            </div>

            <div className="p-1 row-span-1  col-span-1 pl-2">
              <div className="text-xl font-semibold text-gray-700 mb-2  ">
                Amount to Pay
              </div>
              <div className="text-base">Rs.{details.orderAmount} </div>
            </div>
          </div>

          <div className="m-10 ">
            <table className="table-auto w-full bg-gradient-to-b from-slate-100 via-white to-slate-100">
              <thead className="bg-lime-600">
                <tr className="border-b-2 text-white border-gray-400">
                  <th className="p-3 pl-12 text-left w-auto">
                    ITEM DESCRIPTION
                  </th>
                  <th className="text-center w-40 ">UNIT PRICE</th>
                  <th className="text-center w-auto">QUANTITY</th>
                  <th className="text-center w-32">SUBTOTAL</th>
                </tr>
              </thead>

              <tbody>
                {productList.map((product) => {
                  return (
                    <tr key={product.itemdetail._id} className="border-b-2 cursor-pointer  hover:bg-gray-100
                   
                    hover:shadow-gray-200 hover:border-solid "
                    onClick={()=>{navigate(`/product/${product.itemdetail._id}`)}}
                    >
                      <td className="pl-12 ">
                        <div className="flex py-2">
                          <img
                            alt="product"
                            src={product.itemdetail.imageSrc}
                            className="w-14 rounded-md"
                          ></img>
                          <div className="pl-4 font-semibold">
                            {product.itemdetail.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          &#8377;{product.itemdetail.price}
                        </div>
                      </td>
                      <td>
                        <div className="text-center">{product.count}</div>
                      </td>
                      <td>
                        <div className="text-center">
                          &#8377;{product.itemdetail.price * product.count}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

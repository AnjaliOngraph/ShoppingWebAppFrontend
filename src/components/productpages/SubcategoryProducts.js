import Navbar from "../Mainpage/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SubcategoryProducts(props) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // const [item, setItem]= useState([]);

  useEffect(() => {
    axios
      .get(`/subcategory-products/${id}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((b) => {
        console.log(Error);
      });
  }, [id]);

  // const [itemList, setItemList]=useState([])

  //   const handleCart = (product) => {
  //     let tempItemList = itemList;
  //     // console.log(tempItemList);
  //     // console.log(products);
  //    let test = products.find((m) => m._id === product._id);

  //    tempItemList.push(test);
  //    console.log(tempItemList,"tempItemList");
  //     setItemList(tempItemList);
  //   };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="bg-white">
      <Navbar length={cart.length} />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 ">
        {/* <h2 className="sr-only">Products</h2> */}

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6   ">
          {products.map((product) => (
            <div key={"div" + product._id}>
              <a
                key={product._id}
                href={`/product-details/${product._id}`}
                className="group"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>

                <p className="mt-1 text-lg font-medium text-gray-900">
                  &#x20B9;
                  {product.price}
                </p>
              </a>
              <button
                type="submit"
                className="flex items-center justify-center rounded-md border border-transparent bg-lime-600  px-4 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

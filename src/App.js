import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";

import Header from "./components/Mainpage/Header";
import Productdetails from "./components/productpages/ProductDetails";
import Signup from "./components/accountPage/signupPage";
import Signin from "./components/accountPage/SigninPage";
import SubcategoryProducts from "./components/productpages/SubcategoryProducts";
import Cart from "./components/Cartprocess/Cart";
import Address from "./components/Cartprocess/Address";

function App() {

  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/subcategory-products/:id"
          element={<SubcategoryProducts />}
        />
        <Route path="/product-details/:id" element={<Productdetails />} />

        <Route path="/product/cart" element={<Cart />}></Route>
        <Route path="/cart/address" element={<Address />}></Route>
        
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;

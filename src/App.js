import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

import Header from "./components/mainPages/Header";
import Productdetails from "./components/productPages/ProductDetails";
import Signup from "./components/accountPage/signupPage";
import Signin from "./components/accountPage/signinPage";
import SubcategoryProducts from "./components/productPages/SubcategoryProducts";
import Cart from "./components/cartProcess/cart";
import Address from "./components/cartProcess/address";
import Orders from "./components/order/order";
import PaymentPage from "./components/cartProcess/paymentPage";
import ForgotPassword from "./components/accountPage/forgotPassword";
import ResetPassword from "./components/accountPage/resetPassword";
import PageNotFound from "./components/mainPages/pageNotFound";
import { OrderDetailPage } from "./components/order/orderDetailPage";

import { saveState } from "./redux/localStorage";

store.subscribe(() => {
  saveState({
    address: store.getState().address ,
    cart: store.getState().cart,
    order:store.getState().order
  });
});

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/subcategory/products/:id" element={<SubcategoryProducts />}/>
        <Route path="/product/:id" element={<Productdetails />} />

        <Route path="/product/cart" element={<Cart />}></Route>
        <Route path="/cart/address" element={<Address />}></Route>

        <Route path="/active-orders" element={<Orders />}></Route>
        <Route path="/cart/address/checkout" element={<PaymentPage />}></Route>
        <Route path="/myOrder/orderDetails" element={<OrderDetailPage/>}></Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

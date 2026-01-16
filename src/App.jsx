import React from "react";
import SignIn from "./component/SignIN";
import "./app.css";
import { ToastContainer } from "react-toastify";
import Payment from "./component/Payment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Redux/Reducers/userSlice";
import Cart from "./component/Cart";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  // console.log(user);
  return (
    <>
      <SignIn />
      <Payment />
      <Cart />
      <ToastContainer theme="dark" position="top-center" />
    </>
  );
};

export default App;

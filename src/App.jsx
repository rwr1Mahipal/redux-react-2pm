import React from "react";
import SignIn from "./component/SignIN";
import "./app.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <SignIn />

      <ToastContainer theme="dark" position="top-center" />
    </>
  );
};

export default App;

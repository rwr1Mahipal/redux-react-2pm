import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Reducers/userSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const { error, isAuth, message } = useSelector((state) => state.user);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);
  return (
    <form onSubmit={loginHandler}>
      <div>
        <label>Email</label>
        <input
          placeholder="Email"
          name="text"
          type={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          placeholder="Email"
          name="password"
          type={password}
          onChange={(e) => setPassowrd(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default SignIn;

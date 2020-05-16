import React, { useState } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [logState, setLogState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogState({ ...logState, [e.target.name]: e.target.value });
  };

  const open = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", logState)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => {
        console.log("Err is:", err);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={open}>
          <input
            type="text"
            placeholder="Login"
            name="username"
            value={logState.username}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={logState.password}
            onChange={handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import baseUrl from "../baseUrl";
import {redirect, useNavigate} from "react-router-dom"
import "./Login.css";

function Login({ login, setUser }) {
  const email = useRef();
  const pass = useRef();
  const emailErr = useRef();
  const passErr = useRef();
  const navigate = useNavigate();

  function emailCheck() {
    if (
      email.current.value.includes("@") &&
      email.current.value.includes(".com")
    ) {
      emailErr.current.innerText = "";
      return true;
    } else {
      emailErr.current.innerText = "Invalid email address";
      return false;
    }
  }
  function passCheck() {
    if (pass.current.value.length >= 8) {
      passErr.current.innerText = "";
      return true;
    } else {
      passErr.current.innerText = "Password too short";
      return false;
    }
  }

  function submitHandler() {
    if (passCheck() && emailCheck()) {
      try {
        fetch(`${baseUrl}/user/${login ? "login" : "register"}`, {
          method: "POST",
          body: JSON.stringify({username:email.current.value, password:pass.current.value}),
          headers: {"Content-Type": "application/json"}
        }).then(res => res.json()).then(data => {
          
            setUser(data)
            navigate("/")
        });
      } catch (err) {
        console.log(err);
      }
    } else return;
  }
  return (
    <div className="login">
        <div className="branding">
            <h2>Get Started With <span>1MW</span></h2>
            <p>Real Estate Marketing</p>
        </div>
      <div className="login-main">
        <div className="login-inp">
          <input ref={email} type="email" name="" id="" placeholder="email" />
          <p ref={emailErr}></p>
          <EmailOutlinedIcon />
        </div>
        <div className="login-inp" >
          <input
            ref={pass}
            type="password"
            name=""
            id=""
            placeholder="password"
          />
          <p ref={passErr}></p>
          <LockOutlinedIcon />
        </div>
        <button onClick={submitHandler}>{login ? "Login" : "Register"}</button>
        {login && (
          <p>
            New user? <Link to="/register">register</Link>
          </p>
        )}
        {!login && (
          <p>
            Have an account already? <Link to="/login">login</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginCard from "../assets/login.jpg";
const Swal = require("sweetalert2");
function Login() {
  const emailInput = useRef(null);
  const passWordInput = useRef(null);
  const navigate = useNavigate();
  // Sign up function
  var requestData = {};
  const login = (event) => {
    event.preventDefault();

    if (passWordInput.current.value === "" || emailInput.current.value === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check your inputs!"
      });
    } else {
      requestData = {
        email: emailInput.current.value,
        password: passWordInput.current.value
      };
      console.log(requestData);
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result == "no") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User not exists!"
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Sign up successfully"
          });
          navigate("/index");
        }
      });
  };
  // redirect to home if logged in
  useEffect(() => {
    fetch("/get_username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.username !== "") {
          navigate("/index");
        }
      });
  }, []);
  const headerStyle = {
    fontFamily: "Poppins",
    fontSize: "31px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "72px",
    letterSpacing: "0.245em",
    textAlign: "left"
  };
  return (
    <>
      <div className="container" style={{ backgroundColor: "#BDC7D0" }}>
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img
              src={loginCard}
              className="img-fluid"
              style={{ minHeight: "100%", width: "auto" }}
              alt=""
            />
          </div>
          <div className="col-md-6  p-5" style={{ backgroundColor: "#CE9338" }}>
            <span className="pb-3" style={headerStyle}>
              THE TECHY TUTOR
            </span>
            <div className="form-style">
              <form onSubmit={login}>
                <div className="form-group pb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    ref={emailInput}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    ref={passWordInput}
                  />
                </div>

                <div className="pb-2">
                  <button
                    onClick={loginCard}
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Get Matched!
                  </button>
                </div>
              </form>
              <div>
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;

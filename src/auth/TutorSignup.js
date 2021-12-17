import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import data from "./data";
import { useNavigate, Link } from "react-router-dom";
import { Form, FloatingLabel } from "react-bootstrap";
import tutorCard from "../assets/tutorCard.jpg";
const Swal = require("sweetalert2");
function TutorSignup() {
  const emailInput = useRef(null);
  const userNameInput = useRef(null);
  const passWordInput = useRef(null);
  //const language = useRef(null);
  const navigate = useNavigate();
  const [language, setLanguageOptions] = useState([]);
  const [languageSelect, setLanguageSelect] = useState([]);

  useEffect(() => {
    const languageOptions = [];
    for (var i = 0; i < data.length; i++) {
      languageOptions.push({
        value: data[i],
        label: data[i]
      });
    }
    setLanguageOptions(languageOptions);
  }, [languageSelect]);

  const [bestDescribe, setBestDescribe] = useState("High School Student");

  const handleChange = (e) => {
    setBestDescribe(e.target.value);
  };
  // Sign up function
  var requestData = {};
  const signup = (event) => {
    event.preventDefault();
    const param = [];
    if (languageSelect != null) {
      for (let i = 0; i < languageSelect.length; i++) {
        param.push(languageSelect[i].label);
      }
    }
    if (
      userNameInput.current.value === "" ||
      passWordInput.current.value === "" ||
      emailInput.current.value === "" ||
      languageSelect.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check your inputs!"
      });
    } else {
      requestData = {
        email: emailInput.current.value,
        username: userNameInput.current.value,
        password: passWordInput.current.value,
        language: param,
        bestDescribe: bestDescribe
      };
      console.log(requestData);
    }
    fetch("/tutorSignup", {
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
            text: "User exists or please double check info"
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Good",
            text: "Sign up success"
          });
          navigate("/index");
        }
      });
  };
  return (
    <>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img
              src={tutorCard}
              className="img-fluid"
              style={{ minHeight: "100%" }}
              alt=""
            />
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Tutor Sign Up</h3>
            <div className="form-style">
              <form onSubmit={signup}>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    ref={userNameInput}
                  />
                </div>
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
                <Select
                  isMulti
                  onChange={setLanguageSelect}
                  aria-placeholder="List your languages"
                  options={language}
                />
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="What best describes you?"
                >
                  <Form.Select aria-label="Pick here" onChange={handleChange}>
                    <option value="High School Student">
                      High School Student
                    </option>
                    <option value="College Student">College Student</option>
                    <option value="Professional">Professional</option>
                    <option value="Self-taught">Self-taught</option>
                  </Form.Select>
                </FloatingLabel>

                <div className="pb-2">
                  <button
                    onClick={signup}
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Get Matched!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TutorSignup;

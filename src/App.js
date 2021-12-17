import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import data from "../src/auth/data";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState(null);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    fetch("/get_username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.username);
        setRole(data.role);
        if (data.username === "") {
          setFlag(false);
        }
      });
  }, []);
  const args = JSON.parse(document.getElementById("data").text);
  const [language, setLanguage] = useState(null);
  const [tutor, filterTutor] = useState(null);

  useEffect(() => {
    fetch("/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ language: language })
    })
      .then((response) => response.json())
      .then((data) => {
        filterTutor(data.tutor);
      });
  }, [language]);
  return (
    <div style={{ backgroundColor: "#BDC7D0" }}>
      {flag === false ? (
        <div>Please login</div>
      ) : role === "tutor" ? (
        <div>
          Welcome, <span style={{ color: "purple" }}> {name}</span> with role:{" "}
          {role}
        </div>
      ) : (
        <div style={{ backgroundColor: "#BDC7D0" }}>
          <div className="pt-8 pb-2 mb-3 border-bottom">
            <div className="row">
              <h1>Select Programming Language</h1>
            </div>
            <div className="classic">
              <select onChange={(event) => setLanguage(event.target.value)}>
                {data
                  ? data.map((item) => <option value={item}>{item}</option>)
                  : ""}
              </select>
            </div>
            <div className="row">
              {tutor
                ? tutor.map((item) => (
                    <div
                      className="card"
                      style={{
                        width: "18rem",
                        margin: "20px",
                        padding: "0px",
                        backgroundColor: "#CE9338"
                      }}
                    >
                      <img
                        className="card-img-top"
                        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80"
                        alt="pic"
                      />
                      <div className="card-body">
                        <h4 className="card-title">{item.username}</h4>

                        <div className="containerCard">
                          <div className="row">
                            <span>Skills: {item.language}</span>
                          </div>
                        </div>

                        <p className="card-text">{item.bio}</p>

                        <Button as={Link} to="/index" variant="dark">
                          LET'S CHAT
                        </Button>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

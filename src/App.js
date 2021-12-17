import React, { useState, useEffect } from "react";

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
  return (
    <div className="App">
      {flag ? (
        <div>
          Welcome, <span style={{ color: "purple" }}> {name}</span> with role:{" "}
          {role}
        </div>
      ) : (
        <div>Please login</div>
      )}
    </div>
  );
}

export default App;

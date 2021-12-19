import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import reportWebVitals from "./reportWebVitals";
import ChatRoom from "./components/ChatRoom";

const routing = (
  <Router>
    <div style={{ backgroundColor: "#BDC7D0" }}>
      <Routes>
        <Route exact path="/index" element={<App />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/chatroom/:roomID" element={<ChatRoom />} />
      </Routes>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

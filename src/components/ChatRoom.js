import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

function ChatRoom() {
  return (
    <>
      <div>Welcome </div>
      <iframe
        marginTop="60px"
        src="https://boiling-sands-23438.herokuapp.com"
        title="chat"
        frameborder="0"
        style={{ width: "100%", height: "100vh" }}
      ></iframe>
    </>
  );
}
export default ChatRoom;

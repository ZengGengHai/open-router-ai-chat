import React from "react";
import logo from "./logo.svg";
import Button from "@mui/material/Button";
import "./App.css";
import { ChatPage } from "./layouts";

function App() {
  return (
    <div className="w-full h-[100vh] flex-row-cente">
      <div className="max-w-6xl mx-auto h-full">
        <ChatPage />
      </div>
    </div>
  );
}

export default App;

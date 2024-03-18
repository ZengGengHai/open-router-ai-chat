import React from "react";
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

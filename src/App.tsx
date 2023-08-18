import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Username from "./components/Username";
import Mode from "./components/Mode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/username" element={<Username />} />
        <Route path="/mode" element={<Mode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

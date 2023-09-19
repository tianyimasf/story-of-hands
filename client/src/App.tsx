import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Username from "./components/Username";
import Mode from "./components/Mode";
import CreateDrawingSeries from "./components/CreateDrawingSeries";
import WriteAStory from "./components/WriteAStory";
import HandSeries from "./components/HandSeries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/username" element={<Username />} />
        <Route path="/mode" element={<Mode />} />
        <Route
          path="/createdrawingseries"
          element={<CreateDrawingSeries></CreateDrawingSeries>}
        />
        <Route
          path="/writeastory"
          element={<WriteAStory></WriteAStory>}
        ></Route>
        <Route path="/handseries" element={<HandSeries></HandSeries>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

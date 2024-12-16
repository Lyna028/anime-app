import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Popular from "./Components/Popular";
import Home from './Components/Home';
import Anime from './Components/Anime';
import { useScroll } from './Components/Scroll';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/anime/:id" element={<Anime/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

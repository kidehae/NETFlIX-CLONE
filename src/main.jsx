import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Pages/Home/Home.jsx";
import TvShows from "./Pages/TvShows.jsx";
import Movies from "./Pages/Movies.jsx";
import NewPopular from "./Pages/NewPopular.jsx";
import MyList from "./Pages/MyList.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="tv-shows" element={<TvShows />} />
        <Route path="movies" element={<Movies />} />
        <Route path="new-popular" element={<NewPopular />} />
        <Route path="my-list" element={<MyList />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

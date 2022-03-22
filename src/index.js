import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";
import ParseDemo from "./pages/parse-demo";
import Gym from "./pages/gym";
import Shadertoy from "./pages/shadertoy";
import NotFound from "./pages/not-found";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parse-demo" element={<ParseDemo />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/shadertoy" element={<Shadertoy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

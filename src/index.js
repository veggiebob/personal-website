import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";
import ParseDemo from "./pages/parse-demo";
import Gym from "./pages/gym";
import Shadertoy from "./pages/shadertoy";
import NotFound from "./pages/not-found";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SecretSanta from "./pages/secret-santa";
import LoginGptClient from "./pages/gpt-client";
import ThreeFun from "./pages/three-fun";
import AboutMe from "./pages/about-me-llm";

const App = () => (
  <HashRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/parse-demo" element={<ParseDemo />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/shadertoy" element={<Shadertoy />} />
        <Route path="/secret-santa" element={<SecretSanta />} />
        <Route path="/gpt-client" element={<LoginGptClient />} />
        <Route path="/three-demo" element={<ThreeFun />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

// import react libraries
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./home-page";
import ParseDemoPage from "./parse-demo";
import Gym from "./gym";
import SProjects from "./shadertoy";
import NotFound from "./not-found";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const FloatingGithubLink = (props) => (
  <a
    id="github-link"
    href="https://github.com/veggiebob"
    title="link to github profile"
    className="absolute right-2 top-2 border-zinc-500 border-2 transition-all rounded-full hover:scale-[112.5%] hover:border-transparent"
  >
    <img
      src="https://avatars2.githubusercontent.com/u/42460693?s=50&v=4"
      id="pfp"
      className="rounded-full p-1"
    />
  </a>
);

const App = (props) => (
  <div>
    <FloatingGithubLink />
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/parse-demo" element={<ParseDemoPage />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="/shadertoy" element={<SProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

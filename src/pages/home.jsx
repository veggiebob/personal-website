import React from "react";
import Projects from "../components/Projects";

const MainPage = () => (
  <>
    <h1 className="text-5xl leading-none font-thin ">Hi, I'm Andrew!</h1>
    <h2 className="text-xl">
      I'm an undergraduate Computer Science student at RIT, with an interest in
      Rust Haskell, and JavaScript.
      <div className="h-2" />
      Here are some of my favorite projects I am and have been working on:
    </h2>
    <Projects />
  </>
);

export default MainPage;

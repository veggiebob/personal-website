import "./styles/index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load all page components
const Home = React.lazy(() => import("./pages/home"));
const ParseDemo = React.lazy(() => import("./pages/parse-demo"));
const Gym = React.lazy(() => import("./pages/gym"));
const Shadertoy = React.lazy(() => import("./pages/shadertoy"));
const NotFound = React.lazy(() => import("./pages/not-found"));
const SecretSanta = React.lazy(() => import("./pages/secret-santa"));
const LoginGptClient = React.lazy(() => import("./pages/gpt-client"));
const ThreeFun = React.lazy(() => import("./pages/three-fun"));
const AboutMe = React.lazy(() => import("./pages/about-me-llm"));

const App = () => (
  <HashRouter>
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </Layout>
  </HashRouter>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

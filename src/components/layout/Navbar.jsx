import React from "react";
import { Link } from "react-router-dom";

const FloatingGithubLink = () => (
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

const NavLink = ({ children, href }) => (
  <Link to={href} className={"hover:decoration-white capitalize"}>
    {children}
  </Link>
);

const Navbar = () => {
  return (
    <nav className="sticky gap-x-8 flex bg-orange-600 top-0 py-4 px-8 text-white">
      <NavLink href="/">Home</NavLink>
      <a href="https://github.com/veggiebob">Github</a>
      <NavLink href="/">Resume</NavLink>
    </nav>
  );
};

export default Navbar;

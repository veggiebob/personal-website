import React from "react";
import { Link } from "react-router-dom";
import EmailIcon from "../icons/EmailIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import ResumeIcon from "../icons/ResumeIcon";
import { BetterLink } from "../BetterLink";

const Navbar = () => {
  const linkStyling =
    "decoration-transparent hover:decoration-content-primary hover:text-content-primary transition-all ";

  return (
    <nav className="sticky flex bg-primary top-0 py-4 px-7 text-content-inverse justify-center shadow-primary-dark-lg">
      <div className="flex max-w-5xl items-center justify-between w-full">
        <Link to="/" className={linkStyling + "text-xl font-bold text-content-inverse"}>
          Jacob Andrew Bowman
        </Link>
        <div className="flex gap-x-8 text-sm">
          <BetterLink
            to="mailto:101jacobbowman@gmail.com"
            external={"true"}
            className={linkStyling}
          >
            <EmailIcon className="w-5 fill-content-inverse hover:fill-content-primary transition-all" />
          </BetterLink>
          <BetterLink
            to="https://github.com/veggiebob"
            external="true"
            className={linkStyling}
          >
            <GithubIcon className="w-5 fill-content-inverse hover:fill-content-primary transition-all" />
          </BetterLink>
          <BetterLink
            to="https://linkedin.com/in/jacob-a-bowman"
            external="true"
            className={linkStyling}
          >
            <LinkedInIcon className="w-5 fill-content-inverse hover:fill-content-primary transition-all" />
          </BetterLink>
          {/* <BetterLink
            to="https://github.com/veggiebob"
            external
            className={linkStyling}
          >
            <ResumeIcon className="w-5 fill-white" />
          </BetterLink> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

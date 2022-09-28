import React from "react";
import { Link } from "react-router-dom";
import BetterLink from "../BetterLink";
import EmailIcon from "../icons/EmailIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import ResumeIcon from "../icons/ResumeIcon";

const Navbar = () => {
  const linkStyling =
    "decoration-transparent hover:decoration-white transition-all ";

  return (
    <nav className="sticky flex bg-orange-600 top-0 py-4 px-7 text-white justify-center">
      <div className="flex max-w-5xl items-center justify-between w-full">
        <Link to="/" className={linkStyling + "text-xl font-thin"}>
          Andrew Bowman
        </Link>
        <div className="flex gap-x-8 text-sm">
          <BetterLink
            to="mailto:jb6248@g.rit.edu"
            external="true"
            className={linkStyling}
          >
            <EmailIcon className="w-5 fill-white" />
          </BetterLink>
          <BetterLink
            to="https://github.com/veggiebob"
            external="true"
            className={linkStyling}
          >
            <GithubIcon className="w-5 fill-white" />
          </BetterLink>
          <BetterLink
            to="https://linkedin.com/in/jacob-a-bowman"
            external="true"
            className={linkStyling}
          >
            <LinkedInIcon className="w-5 fill-white" />
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

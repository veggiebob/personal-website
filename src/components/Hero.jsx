import React from "react";
import BetterLink from "./BetterLink";
import EmailIcon from "./icons/EmailIcon";
import GithubIcon from "./icons/GithubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import ResumeIcon from "./icons/ResumeIcon";

const Hero = () => {
  return (
    <section
      id="hero"
      className="flex -mt-8 min-h-[70vh] justify-center items-center bg-cover bg-no-repeat text-white w-full h-full"
      style={{ backgroundImage: "url('/assets/blurry-gradient.svg')" }}
    >
      <div className="flex flex-col gap-y-8 items-start text-left">
        <h1 className="text-8xl text-left w-fit font-raleway">
          Hello, <br />
          I'm Andrew!
        </h1>
        <h2 className="text-3xl font-thin max-w-xl">
          I'm an undergraduate Computer Science student at RIT with an interest
          in Rust, Haskell, and JavaScript.
        </h2>
        <div className="flex justify-end w-full pr-16 gap-x-6">
          <BetterLink to="mailto:jb6248@g.rit.edu" external>
            <EmailIcon className="w-9 fill-white" />
          </BetterLink>
          <BetterLink to="https://github.com/veggiebob" external>
            <GithubIcon className="w-8 fill-white" />
          </BetterLink>
          <BetterLink to="https://github.com/veggiebob" external>
            <LinkedInIcon className="w-8 fill-white" />
          </BetterLink>
          <BetterLink to="https://github.com/veggiebob" external>
            <ResumeIcon className="w-8 fill-white" />
          </BetterLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;

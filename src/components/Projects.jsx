import React from "react";
import ShaderIcon from "./icons/ShaderIcon";
import TerminalIcon from "./icons/TerminalIcon";
import ChartIcon from "./icons/ChartIcon";
import ServerIcon from "./icons/ServerIcon";
import { BetterLink, ExternalLinkIcon } from "./BetterLink";

const ProjectTile = ({ icon, href, title, description, external = false }) => {
  return (
    <BetterLink
      className="flex transition-shadow flex-col items-center gap-y-4 max-w-sm p-6
                border-[1px] border-medium rounded-lg hover:shadow-lg no-underline bg-bg-secondary"
      to={href}
      external={external}
    >
      {icon}
      <h2 className="font-bold underline decoration-2 text-xl decoration-primary">
        {title} {external ? (<ExternalLinkIcon className="inline w-4 h-4 ml-1" />) : null}
      </h2>
      <p className="text-content-secondary">{description}</p>
    </BetterLink>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-16 w-full flex flex-col justify-center items-center"
    >
      <header className="text-2xl font-thin mb-16 border-l-4 pl-4 border-primary">
        <h1 className="text-left block">Projects</h1>
        Here are some of my favorite projects I am and have been working on:
      </header>
      <div className="flex gap-8 items-center flex-wrap justify-center max-w-4xl">
        <ProjectTile
          icon={<ServerIcon className="fill-content-primary" />}
          href="https://github.com/veggiebob/personal-webserver"
          title="Web Server"
          description="Custom web server that used to host this website. Built with Rust."
          external={true}
        />
        <ProjectTile
          icon={<ChartIcon className="fill-content-primary" />}
          href="/gym"
          title="Gym Population Tracker"
          description="Data visualization tool to see what times the gym is crowded. Uses Python to scrape the official RIT occupancy count website."
        />
        <ProjectTile
          icon={<TerminalIcon className="fill-content-primary" />}
          href="/parse-demo"
          title="BF to SPL Translator"
          description="Interactive demo! Converts brainf*ck code to Shakespeare Programming Language."
        />
        <ProjectTile
          icon={<ShaderIcon className="fill-content-primary" />}
          href="/shadertoy"
          title="Fragment Shaders"
          description="Collection of fragment shaders I have built throughout the years. Written and visualized using Shadertoy."
        />
      </div>
    </section>
  );
};

export default Projects;

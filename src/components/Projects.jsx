import React from "react";
import ShaderIcon from "./icons/ShaderIcon";
import TerminalIcon from "./icons/TerminalIcon";
import ChartIcon from "./icons/ChartIcon";
import ServerIcon from "./icons/ServerIcon";
import BetterLink from "./BetterLink";

const ProjectTile = ({ icon, href, title, description, external = false }) => {
  return (
    <BetterLink
      className="flex transition-shadow flex-col items-center gap-y-4 max-w-sm p-6 
                border-[1px] border-neutral-300 rounded-lg hover:shadow-lg no-underline"
      to={href}
      external={external}
    >
      {icon}
      <h2 className="font-bold underline decoration-2 text-xl decoration-orange-600">
        {title}
      </h2>
      <p className="text-neutral-600">{description}</p>
    </BetterLink>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-16 w-full flex flex-col justify-center items-center"
    >
      <header className="text-2xl font-thin mb-16 border-l-4 pl-4 border-orange-600">
        <h1 className="text-left block">Projects</h1>
        Here are some of my favorite projects I am and have been working on:
      </header>
      <div className="flex gap-8 items-center flex-wrap justify-center max-w-4xl">
        <ProjectTile
          icon={<ServerIcon />}
          href="https://github.com/veggiebob/personal-webserver"
          title="Web Server"
          description="Custom web server that hosts this website. Built with Rust, and running on my personal RaspberryPi."
          external
        />
        <ProjectTile
          icon={<ChartIcon />}
          href="/gym"
          title="Gym Population Tracker"
          description="Data visualization tool to see what times the gym is crowded. Uses Python to scrape the official RIT occupancy count website."
        />
        <ProjectTile
          icon={<TerminalIcon />}
          href="/parse-demo"
          title="BF to SPL Translator"
          description="Interactive demo! Converts brainf*ck code to Shakespeare Programming Language."
        />
        <ProjectTile
          icon={<ShaderIcon />}
          href="/shadertoy"
          title="Fragment Shaders"
          description="Collection of fragment shaders I have built throughout the years. Written and visualized using Shadertoy."
        />
      </div>
    </section>
  );
};

export default Projects;

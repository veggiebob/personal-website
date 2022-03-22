import React from "react";
import ShaderIcon from "./icons/ShaderIcon";
import TerminalIcon from "./icons/TerminalIcon";
import ChartIcon from "./icons/ChartIcon";
import ServerIcon from "./icons/ServerIcon";
import { Link } from "react-router-dom";
import BetterLink from "../util/AnyLink";

const ProjectTile = ({ icon, href, title, description }) => {
  return (
    <BetterLink
      className="flex transition-shadow flex-col items-center gap-y-4 max-w-sm p-6 
                border-[1px] border-neutral-300 rounded-lg hover:shadow-lg no-underline"
      href={href}
    >
      {icon}
      <h2 className="font-bold underline decoration-2 text-xl decoration-orange-600">
        {title}
      </h2>
      <p className="">{description}</p>
    </BetterLink>
  )
}

const Projects = () => {
  return (
    <div className="flex gap-8 items-center flex-wrap justify-center max-w-4xl">
      <ProjectTile
        icon={<ServerIcon />}
        href="https://github.com/veggiebob/personal-webserver"
        title="Web Server"
        description="Custom web server that hosts this website and its interactive features. Built with Rust and running on my Raspberry Pi."
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
        title="Text Parser"
        description="Left-to-right, non-tokenizing text parser that can parse simple programs into AST. Programmed in Rust."
      />
      <ProjectTile
        icon={<ShaderIcon />}
        href="/shadertoy"
        title="Fragment Shaders"
        description="Collection of fragment shaders I have built throughout the years. Written and visualized using Shadertoy."
      />
    </div>
  );
};

export default Projects;

import GithubIcon from "../components/icons/GithubIcon";
import ParseDemoBody from "../components/ParseDemoBody";

const parseDemo = () => {
  return (
    <>
      <h1>
        Text Parser
        <a
          target="_blank"
          href="https://github.com/veggiebob/left-right-parsing"
        >
          <GithubIcon className="w-8" />
        </a>
      </h1>
      <ParseDemoBody />
    </>
  );
};

export default parseDemo;

import GithubIcon from "../components/icons/GithubIcon";
import ParseDemoBody from "../components/ParseDemoBody";

const parseDemo = () => {
  return (
    <>
      <h1>
        BF to SPL Translator
        <a
          target="_blank"
          href="https://github.com/veggiebob/bf2spl"
        >
          <GithubIcon className="w-8" />
        </a>
      </h1>
      <ParseDemoBody />
    </>
  );
};

export default parseDemo;

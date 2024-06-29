import { useState } from "react";
import JsonToHTML from "../util/jsonToPrettyHTML";
import { translateInput } from "../util/parseInput";

const ParseOutput = (props) => {
  return <div
      className="text-white"
      dangerouslySetInnerHTML={{ __html: props.parsed }}
    />
};

const ParseDemoBody = () => {
  const [timer, setTimer] = useState();
  const [input, setInput] = useState(".[.,]");
  const [parsed, setParsed] = useState(""); 
  const [mode, setMode] = useState("default"); // or "ai"

  /**
   * Begin a 2 sec timeout, after which the current form data will be parsed and shown
   */
  const onSubmit = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        setParsed("Loading...");
        setParsed(await translateInput(input, mode));
      }, 0)
    );
  };

  return (
    <div className="flex rounded-md border-2 bg-white border-neutral-800 max-w-5xl w-full">
      <form
        className="flex flex-col w-[30%] p-8 gap-y-4"
        // onKeyUp={onSubmit}
      >
        <div>
          Convert <a href='https://esolangs.org/wiki/Brainfuck'>brainf*ck</a> 
          to <a href='https://esolangs.org/wiki/Shakespeare'>Shakespeare Programming Language</a>
          <div className="code-block"></div>
        </div>
        <label htmlFor="parse-input">
          Input
          <textarea
            id="parse-input"
            rows={9}
            type="text"
            placeholder="ex. reverse string >[>,]<[.<]"
            onChange={(e) => setInput(e.target.value)}
            className="font-mono"
          ></textarea>
          <select
            onChange={(e) => setMode(e.target.value)}
            value={mode}
            className="bg-neutral-500 text-white p-2 rounded-md"
          >
            <option value="default">Default</option>
            <option value="ai">AI</option>
          </select>
          <button
            onClick={onSubmit}
            className="bg-orange-500 text-white p-2 rounded-md"
          >Translate</button>
        </label>
      </form>
      <div className="text-left font-mono bg-neutral-800 p-8 w-[70%]">
        <ParseOutput parsed={parsed} />
      </div>
    </div>
  );
};

export default ParseDemoBody;

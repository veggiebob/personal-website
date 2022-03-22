import { useState } from "react";
import JsonToHTML from "../util/jsonToPrettyHTML";
import { parseInput } from "../util/parseInput";

const ParseDemoBody = () => {
  const [timer, setTimer] = useState();
  const [input, setInput] = useState("");
  const [parseMode, setParseMode] = useState("stmt");
  const [outputMode, setOutputMode] = useState("json");
  const [parsed, setParsed] = useState({
    name: "add_one",
    args: [
      {
        identifier: "x",
        type: "nat",
      },
    ],
    expr: {
      left: "x",
      infix: "+",
      right: "y",
    },
    defs: [
      {
        identifier: "y",
        expr: 1,
      },
    ],
  });

  /**
   * Begin a 2 sec timeout, after which the current form data will be parsed and shown
   */
  const onFormChange = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        setParsed(await parseInput(input, parseMode, outputMode));
      }, 2000)
    );
  };

  return (
    <div className="flex rounded-md border-2 bg-white border-neutral-800 max-w-5xl w-full">
      <form
        className="flex flex-col w-[60%] p-8 gap-y-4"
        onChange={onFormChange}
      >
        <div>
          Observe the JSON output of your input. Example:
          <div className="code-block">
            add_one[x: nat] =&gt; x + y where {"{"} let y = 1 {"}"}
          </div>
        </div>
        <label htmlFor="parse-mode">
          Parse Mode
          <select
            id="parse-mode"
            onChange={(e) => setParseMode(e.target.value)}
          >
            <option value="stmt">Statement</option>
            <option value="expr">Expression</option>
            <option value="prgm">Program</option>
          </select>
        </label>
        <label htmlFor="output-mode">
          Output Mode
          <select
            id="output-mode"
            onChange={(e) => setOutputMode(e.target.value)}
          >
            <option value="json">JSON</option>
            <option value="html">HTML</option>
            <option value="debug">Debug</option>
          </select>
        </label>
        <label htmlFor="parse-input">
          Input
          <textarea
            id="parse-input"
            rows={9}
            type="text"
            placeholder="Enter an expression"
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </label>
      </form>
      <div className="text-left font-mono bg-neutral-800 p-8 w-[40%]">
        <JsonToHTML json={parsed} />
      </div>
    </div>
  );
};

export default ParseDemoBody;

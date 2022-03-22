import { useState } from "react";
import { Link } from "react-router-dom";
import JsonToHTML from "../util/jsonToPrettyHTML";

const ParseDemoHeader = (props) => (
  <div>
    <h1>Text Parser</h1>
    <a target="_blank" href="https://github.com/veggiebob/left-right-parsing">
      Source
    </a>
    <br />
    <div>
      Observe the JSON output of your input. Example:
      <div className="code-block">
        add_one[x: nat] =&gt; x + y where {"{"} let y = 1 {"}"}
      </div>
      In <strong>Statement Mode</strong> will produce:
      <div className="text-left bg-slate-800 p-5 rounded-md">
        <JsonToHTML
          className="font-bold"
          json={{
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
          }}
        />
      </div>
    </div>
  </div>
);

const parseDemo = () => {
  const [output, setOutput] = useState(<p>No data</p>);

  const processInput = () => {
    let input = document.getElementById("parse-input").value;
    let mode = document.getElementById("parse-mode").value;
    let outputMode = document.getElementById("output-mode").value;
    fetch("/parse", {
      method: "POST",
      body: input,
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": input.length,
        "Parse-Mode": mode,
        "Output-Mode": outputMode,
      },
    })
      .then((res) => {
        res.text().then((text) => {
          let parsed = {};
          let is_json = false;
          try {
            parsed = JSON.parse(text);
            is_json = true;
          } catch (e) {
          }
          setOutput(
            is_json ? 
              (<div className="text-left bg-slate-800 p-5 rounded-md"><JsonToHTML json={parsed} /></div>)
              :
              (<p className="text-red-600 font-bold">{text}</p>)
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ParseDemoHeader />
      <p style={{ fontSize: 15 }}>
        Choose a parse mode. <br />
        <select id="parse-mode" onChange={() => processInput()}>
          <option value="stmt">Statement</option>
          <option value="expr">Expression</option>
          <option value="prgm">Program</option>
        </select>
        <br />
        Choose an output mode.
        <br />
        <select id="output-mode" onChange={() => processInput()}>
          <option value="json">JSON</option>
          <option value="html">HTML</option>
          <option value="debug">Debug</option>
        </select>
      </p>
      <textarea
        id="parse-input"
        type="text"
        placeholder="Enter an expression"
        onChange={() => processInput()}
      ></textarea>
      <div id="parse-output">{output}</div>
    </div>
  );
};

export default parseDemo;

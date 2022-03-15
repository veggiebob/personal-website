import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const ParseDemoHeader = props => (
    <div>
        <h1>Parse Demo!</h1>
        <a target="_blank" href="https://github.com/veggiebob/left-right-parsing">Source</a>
        <br />
        <Link to="/">Homepage</Link>
        <div>
            Observe the JSON output of your input.
            Example:
            <div className="code-block">
                add_one[x: nat] =&gt; x + y where {"{"} let y = 1 {"}"}
            </div>
            In <strong>Statement Mode</strong> will produce:
            <div className="code-block">
                {"{"}
                    "name": "add_one",
                    "args": [
                        {"{"}
                        "identifier": "x",
                        "type": "nat"
                        {"}"}
                    ],
                    "expr": {"{"}
                        "left": "x",
                        "infix": "+",
                        "right": "y"
                    {"}"},
                    "defs": [
                        {"{"}
                        "identifier": "y",
                        "expr": 1
                        {"}"}
                    ]
                    {"}"} 
            </div>
        </div>
    </div>
);

class ParseDemoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ""
        }
    }

    processInput() {
        let input = document.getElementById("parse-input").value;
        let mode = document.getElementById("parse-mode").value;
        let outputMode = document.getElementById("output-mode").value;
        // console.log("processing input!");
        // console.log(input);
        // console.log(mode);
        // console.log(outputMode);
        fetch('/parse', {
            method: 'POST',
            body: input,
            headers: {
                'Content-Type': 'text/plain',
                'Content-Length': input.length,
                'Parse-Mode': mode,
                'Output-Mode': outputMode
            }
        }).then(res => {
            res.text().then(text => {
                this.setState({
                    response: text
                })
                document.getElementById("parse-output").innerHTML = text;
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <ParseDemoHeader />
                <p style={{fontSize: 15}}>
                    Choose a parse mode. <br />
                    <select id="parse-mode" onChange={() => this.processInput()}>
                        <option value="stmt">Statement</option>
                        <option value="expr">Expression</option>
                        <option value="prgm">Program</option>
                    </select>
                    <br />
                    Choose an output mode.
                    <br />
                    <select id="output-mode" onChange={() => this.processInput()}>
                        <option value="json">JSON</option>
                        <option value="html">HTML</option>
                        <option value="debug">Debug</option>
                    </select>
                </p>
                
                <span id="terminal-prefix">$ </span>
                <textarea id="parse-input" type="text" placeholder="Enter an expression" onChange={() => this.processInput()}></textarea>
                <button id="parse-button">Parse!</button>
                <p id="parse-output"></p>
                
                <script src="parse-demo.js"></script>
            </div>
        );
    }
}

export default ParseDemoPage; 
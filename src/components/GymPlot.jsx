import React, { useState } from "react";
import Plot from "react-plotly.js";

export let GymPlot = (props) => {
    // const deepCopy = (e) => JSON.parse(JSON.stringify(e));

    // let defaultArray = (e) => {
    //     return e ? deepCopy(e) : [];
    // }
    // let defaultObject = (e) => {
    //     return e ? deepCopy(e) : {};
    // }
    // const [data, setData] = useState(defaultArray(props.data)); 
    // const [layout, setLayout] = useState(defaultObject(props.layout)); 
    // const [frames, setFrames] = useState(defaultArray(props.frames));
    // const [config, setConfig] = useState(defaultObject(props.config));
    
    // const setState = (figure) => {
    //     setData(figure.data);
    //     setLayout(figure.layout);
    //     setFrames(figure.frames);
    //     setConfig(figure.config);
    // }

    // brother????

    return <div className="p-0">
        <Plot
        data={props.data}
        layout={props.layout}
        frames={props.frames}
        config={props.config}
        onInitialized={(figure) => setState(figure)}
        onUpdate={(figure) => setState(figure)}
    /></div>

    
}
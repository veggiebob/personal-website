import React, { useState } from "react";
import Plot from "react-plotly.js";

export let GymPlot = (props) => {
    
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
import React, { useState, useEffect } from "react";
import { loadPlotlyComponents } from "./LazyPlotlyComponents";
import LoadingSpinner from "./LoadingSpinner";

export let GymPlot = (props) => {
    const [Plot, setPlot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPlotly = async () => {
            try {
                const { Plot: PlotComponent } = await loadPlotlyComponents();
                setPlot(() => PlotComponent);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load Plotly:', error);
                setIsLoading(false);
            }
        };

        loadPlotly();
    }, []);

    if (isLoading || !Plot) {
        return (
            <div className="flex items-center justify-center p-8">
                <LoadingSpinner />
                <span className="ml-4">Loading chart...</span>
            </div>
        );
    }
    
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
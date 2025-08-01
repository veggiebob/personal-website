// Lazy load Plotly components only when needed
export const loadPlotlyComponents = async () => {
  const [
    { default: Plot }
  ] = await Promise.all([
    import('react-plotly.js')
  ]);

  return { Plot };
};

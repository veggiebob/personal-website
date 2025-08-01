// Lazy load Material-UI components only when needed
export const loadMUIComponents = async () => {
  const [
    { default: CircularProgress }
  ] = await Promise.all([
    import('@mui/material/CircularProgress')
  ]);

  return { CircularProgress };
};

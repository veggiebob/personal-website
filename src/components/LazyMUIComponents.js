// Lazy load Material-UI components only when needed
export const loadMUIComponents = async () => {
  const [
    { default: CircularProgress },
    { default: Select },
    { default: MenuItem },
    { default: FormControl },
    { default: InputLabel }
  ] = await Promise.all([
    import('@mui/material/CircularProgress'),
    import('@mui/material/Select'),
    import('@mui/material/MenuItem'),
    import('@mui/material/FormControl'),
    import('@mui/material/InputLabel')
  ]);

  return { CircularProgress, Select, MenuItem, FormControl, InputLabel };
};

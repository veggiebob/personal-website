// Lazy load Material-UI components only when needed
export const loadMUIComponents = async () => {
  const [
    { default: CircularProgress },
    { default: Select },
    { default: MenuItem },
    { default: FormControl },
    { default: InputLabel },
    { default: Skeleton }
  ] = await Promise.all([
    import('@mui/material/CircularProgress'),
    import('@mui/material/Select'),
    import('@mui/material/MenuItem'),
    import('@mui/material/FormControl'),
    import('@mui/material/InputLabel'),
    import('@mui/material/Skeleton')
  ]);

  return { CircularProgress, Select, MenuItem, FormControl, InputLabel, Skeleton };
};

/**
 * Shared Material UI theme configurations for consistent styling
 * across components using the centralized theme system.
 */

// Common FormControl styling for Select components
export const getFormControlSx = (options = {}) => ({
  maxWidth: options.maxWidth || '300px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text-primary)',
    '& fieldset': {
      borderColor: 'var(--color-border-medium)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-border-dark)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-primary)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--color-text-secondary)',
    '&.Mui-focused': {
      color: 'var(--color-primary)',
    },
  },
  ...options.sx,
});

// Common MenuProps for Select dropdowns
export const getSelectMenuProps = () => ({
  PaperProps: {
    sx: {
      backgroundColor: 'var(--color-bg-muted)',
      '& .MuiMenuItem-root': {
        color: 'var(--color-text-primary)',
        '&:hover': {
          backgroundColor: 'var(--color-bg-secondary)',
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-inverse)',
          '&:hover': {
            backgroundColor: 'var(--color-primary-dark)',
          },
        },
      },
    },
  },
});

// Textarea styling for consistency
export const getTextareaSx = () => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-mono)',
    '& fieldset': {
      borderColor: 'var(--color-border-medium)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-border-dark)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-primary)',
    },
  },
});

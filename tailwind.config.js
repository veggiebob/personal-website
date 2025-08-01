module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Ubuntu", "sans-serif"],
      },
      colors: {
        // Brand colors
        'primary': 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        'secondary': 'var(--color-secondary)',
        'secondary-light': 'var(--color-secondary-light)',
        'secondary-dark': 'var(--color-secondary-dark)',
        
        // UI colors
        'accent': 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'accent-dark': 'var(--color-accent-dark)',
        
        // Status colors
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        'info': 'var(--color-info)',
        
        // Content colors
        'content': {
          'primary': 'var(--color-text-primary)',
          'secondary': 'var(--color-text-secondary)',
          'muted': 'var(--color-text-muted)',
          'inverse': 'var(--color-text-inverse)',
        },
        
        // Background colors
        'bg': {
          'primary': 'var(--color-bg-primary)',
          'secondary': 'var(--color-bg-secondary)',
          'muted': 'var(--color-bg-muted)',
          'dark': 'var(--color-bg-dark)',
        },
        
        // Border colors
        'border': {
          'light': 'var(--color-border-light)',
          'medium': 'var(--color-border-medium)',
          'dark': 'var(--color-border-dark)',
        }
      }
    },
  },
  plugins: [],
};

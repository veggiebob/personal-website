/**
 * CENTRALIZED THEME CONFIGURATION
 * 
 * This file documents the centralized color system used throughout the application.
 * All colors are defined as CSS custom properties in src/styles/index.css
 * and available as utility classes for easy theming.
 */

export const THEME_CONFIG = {
  // Brand Colors - Primary orange theme
  brand: {
    primary: 'var(--color-primary)',      // #e8ad42 - Main brand color
    primaryLight: 'var(--color-primary-light)', // #f4c764 - Lighter variant
    primaryDark: 'var(--color-primary-dark)',   // #d49a2e - Darker variant
    secondary: 'var(--color-secondary)',    // #ab2e03 - Secondary brand color
    secondaryLight: 'var(--color-secondary-light)', // #c83a0a
    secondaryDark: 'var(--color-secondary-dark)',   // #8a2402
  },
  
  // UI Colors - For accents and interactive elements
  ui: {
    accent: 'var(--color-accent)',        // #3b82f6 - Blue accent
    accentLight: 'var(--color-accent-light)', // #60a5fa
    accentDark: 'var(--color-accent-dark)',   // #2563eb
  },
  
  // Status Colors - For feedback and states
  status: {
    success: 'var(--color-success)',     // #10b981 - Green
    warning: 'var(--color-warning)',     // #f59e0b - Yellow
    error: 'var(--color-error)',         // #ef4444 - Red
    info: 'var(--color-info)',           // #06b6d4 - Cyan
  },
  
  // Text Colors - Semantic text colors
  text: {
    primary: 'var(--color-text-primary)',     // #1f2937 - Main text
    secondary: 'var(--color-text-secondary)', // #6b7280 - Secondary text
    muted: 'var(--color-text-muted)',         // #9ca3af - Muted text
    inverse: 'var(--color-text-inverse)',     // #ffffff - White text
  },
  
  // Background Colors
  background: {
    primary: 'var(--color-bg-primary)',     // #ffffff - White
    secondary: 'var(--color-bg-secondary)', // #f9fafb - Light gray
    muted: 'var(--color-bg-muted)',         // #f3f4f6 - Muted gray
    dark: 'var(--color-bg-dark)',           // #111827 - Dark
  },
  
  // Border Colors
  border: {
    light: 'var(--color-border-light)',     // #e5e7eb
    medium: 'var(--color-border-medium)',   // #d1d5db
    dark: 'var(--color-border-dark)',       // #6b7280
  }
};

/**
 * UTILITY CLASSES REFERENCE
 * 
 * Background Colors:
 * - .bg-primary, .bg-primary-light, .bg-primary-dark
 * - .bg-secondary, .bg-secondary-light, .bg-secondary-dark
 * - .bg-accent, .bg-accent-light, .bg-accent-dark
 * - .bg-success, .bg-warning, .bg-error, .bg-info
 * 
 * Text Colors:
 * - .text-primary, .text-primary-light, .text-primary-dark
 * - .text-secondary, .text-secondary-light, .text-secondary-dark
 * - .text-accent, .text-accent-light, .text-accent-dark
 * - .text-content-primary, .text-content-secondary, .text-content-muted, .text-content-inverse
 * - .text-success, .text-warning, .text-error, .text-info
 * 
 * Border Colors:
 * - .border-primary, .border-secondary, .border-accent
 * - .border-light, .border-medium, .border-dark
 * 
 * Button Variants:
 * - .btn-primary (with hover state)
 * - .btn-secondary (with hover state)
 * - .btn-accent (with hover state)
 * 
 * Gradients:
 * - .gradient-primary
 * - .gradient-secondary
 * - .gradient-accent
 * 
 * JSON Syntax:
 * - .json-string, .json-number, .json-key, .json-bracket
 */

/**
 * USAGE EXAMPLES
 * 
 * Button with primary color:
 * <button className="btn-primary px-4 py-2 rounded">Click me</button>
 * 
 * Card with themed colors:
 * <div className="bg-primary text-content-inverse p-4">
 *   <h3 className="text-primary-light">Title</h3>
 * </div>
 * 
 * Text with semantic colors:
 * <p className="text-content-secondary">Secondary text</p>
 * <span className="text-error">Error message</span>
 * 
 * Custom CSS with theme variables:
 * .custom-element {
 *   background: var(--color-primary);
 *   border: 1px solid var(--color-border-light);
 * }
 */

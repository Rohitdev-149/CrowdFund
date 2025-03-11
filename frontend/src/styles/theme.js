// Theme colors
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    light: '#dcfce7',
    main: '#22c55e',
    dark: '#15803d',
  },
  warning: {
    light: '#fef9c3',
    main: '#eab308',
    dark: '#a16207',
  },
  error: {
    light: '#fee2e2',
    main: '#ef4444',
    dark: '#b91c1c',
  },
};

// Typography
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

// Common component styles
export const components = {
  button: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-2.5 text-lg',
    },
    variants: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow',
      secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
      danger: 'bg-error-main text-white hover:bg-error-dark shadow-sm hover:shadow',
    },
  },
  card: {
    base: 'bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200',
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  input: {
    base: 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-2.5 text-lg',
    },
  },
  badge: {
    base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    variants: {
      success: 'bg-success-light text-success-dark',
      warning: 'bg-warning-light text-warning-dark',
      error: 'bg-error-light text-error-dark',
      info: 'bg-primary-100 text-primary-800',
    },
  },
};

// Layout
export const layout = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  container: {
    padding: {
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
  },
};

// Animations
export const animations = {
  transition: {
    DEFAULT: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
    fast: 'all 0.1s ease-in-out',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
  },
};

// Common utility classes
export const utilities = {
  textGradient: 'bg-clip-text text-transparent bg-gradient-to-r',
  glassmorphism: 'backdrop-filter backdrop-blur-lg bg-opacity-30',
  containerPadding: 'px-4 sm:px-6 lg:px-8',
};

// Export default theme object
export default {
  colors,
  typography,
  shadows,
  components,
  layout,
  animations,
  utilities,
}; 
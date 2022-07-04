export const theme = {
  colors: {
    primary: '#A169E9',
    white: '#fff',
    black: '#111',
    lightGray: '#ebecf0',
    darkGray: '#777',
    glass: {
      regular: '#091e420a',
      dimmed: '#091e4214',
    },
  },
  rounding: {
    sm: 3,
    lg: 12,
  },
} as const;

export type Theme = typeof theme;

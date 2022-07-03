export const theme = {
  colors: {
    primary: '#A169E9',
    white: '#fff',
    lightGray: '#ebecf0',
  },
  rounding: {
    sm: 3,
    lg: 12,
  },
} as const;

export type Theme = typeof theme;

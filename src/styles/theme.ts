export const theme = {
  colors: {
    primary: '#A169E9',
    white: '#fff',
  },
  rounding: {
    sm: 3,
  },
} as const;

export type Theme = typeof theme;

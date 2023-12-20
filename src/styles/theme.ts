import { mapValues } from 'lodash';

const breakpoints = {
  xs: '(max-width: 480px)',
  sm: '(max-width: 576px)',
  md: '(max-width: 768px)',
  lg: '(max-width: 992px)',
  xl: '(max-width: 1200px)',
  xxl: '(max-width: 1400px)',
} as const;

export const theme = {
  colors: {
    primary: '#A169E9',
    white: '#fff',
    black: '#111',
    lightGray: '#ebecf0',
    gray: '#bbb',
    darkGray: '#666',
    glass: {
      regular: '#091e420a',
      dimmed: '#091e4214',
    },
  },
  rounding: {
    sm: 3,
    md: 8,
    lg: 12,
  },
  breakpoints,
  media: mapValues(breakpoints, value => `@media ${value}`),
} as const;

export type Theme = typeof theme;

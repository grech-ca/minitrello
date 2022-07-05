import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface CardWrapperProps {
  isDivider: boolean;
}

export const CardWrapper = styled(Link)<CardWrapperProps>(({ theme, isDivider }) => ({
  boxShadow: '0 1px 0 #091e4240',
  borderRadius: theme.rounding.sm,
  resize: 'none',
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: 14,
  padding: '6px 8px',
  background: theme.colors.white,
  cursor: 'pointer !important',
  minHeight: 32,
  display: 'flex',
  alignItems: 'center',
  transition: '.05s ease',
  color: '#000',
  textDecoration: 'none',

  ':hover': {
    background: '#f5f5fa',
  },

  ...(isDivider
    ? {
        paddingInline: 16,

        ':after': {
          content: "''",
          display: 'inline-block',
          height: 2,
          width: '100%',
          background: '#ccc',
        },
      }
    : {}),
}));

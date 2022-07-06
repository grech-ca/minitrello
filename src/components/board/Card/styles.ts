import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface CardWrapperProps {
  $isDivider: boolean;
}

export const CardWrapper = styled(Link)<CardWrapperProps>(({ theme, $isDivider }) => ({
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
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  transition: '.05s ease',
  color: '#000',
  textDecoration: 'none',

  ':hover': {
    background: '#f5f5fa',
  },

  ...($isDivider
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

export const CardHeader = styled.div({
  display: 'flex',
});

export const ShortLabels = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
});

interface ShortLabelProps {
  $color: string;
}

export const ShortLabel = styled.div<ShortLabelProps>(({ theme, $color }) => ({
  display: 'inline-block',
  borderRadius: theme.rounding.lg,
  height: 8,
  width: 40,
  background: $color,
}));

export const CardFooter = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexWrap: 'wrap',
  fontSize: 14,
  color: theme.colors.darkGray,
}));

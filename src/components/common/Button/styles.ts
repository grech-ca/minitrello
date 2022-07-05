import styled, { CSSObject } from '@emotion/styled';
import Color from 'color';

import { Theme } from 'styles';

import { ButtonVariant } from './Button';

interface ButtonWrapperProps {
  $variant: ButtonVariant;
  $icon: boolean;
  $fullWidth: boolean;
}

const getVariant = (variant: ButtonVariant, theme: Theme): CSSObject => {
  const variants: Record<ButtonVariant, CSSObject> = {
    primary: {
      color: theme.colors.white,
      background: theme.colors.primary,

      ':hover': {
        background: Color(theme.colors.primary).darken(0.2).toString(),
      },
    },
    secondary: {
      color: theme.colors.black,
      background: theme.colors.glass.regular,

      ':hover': {
        background: theme.colors.glass.dimmed,
      },
    },
    default: {
      color: theme.colors.black,
      background: 'transparent',

      ':hover': {
        background: theme.colors.glass.dimmed,
      },
    },
  };

  return variants[variant];
};

export const ButtonWrapper = styled.button<ButtonWrapperProps>(({ theme, $variant, $icon, $fullWidth }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: $icon ? 'flex-start' : 'center',
  gap: 6,
  borderRadius: theme.rounding.sm,
  border: 'none',
  padding: '4px 12px',
  cursor: 'pointer',
  height: 32,
  transition: 'background .1s ease',
  fontSize: 14,
  flex: $fullWidth ? 1 : undefined,
  ...getVariant($variant, theme),
}));

export const ButtonIcon = styled.svg({
  fontSize: 16,
});

import { ComponentProps, FC, ReactNode, forwardRef } from 'react';

import { ButtonIcon, ButtonWrapper } from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'default';

export interface ButtonProps extends ComponentProps<'button'> {
  children?: null | ReactNode | ReactNode[];
  variant?: ButtonVariant;
  icon?: FC<ComponentProps<'svg'>>;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', children, icon, fullWidth = false, ...props }, ref) => {
    return (
      <ButtonWrapper {...props} $variant={variant} $icon={!!icon} $fullWidth={fullWidth} ref={ref}>
        {icon && <ButtonIcon as={icon} />}
        {children}
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';

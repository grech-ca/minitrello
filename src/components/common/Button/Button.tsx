import { ComponentProps, FC, ReactNode } from 'react';

import { ButtonIcon, ButtonWrapper } from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'default';

export interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode | ReactNode[];
  variant?: ButtonVariant;
  icon?: FC<ComponentProps<'svg'>>;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({ variant = 'default', children, icon, fullWidth = false, ...props }) => {
  return (
    <ButtonWrapper {...props} $variant={variant} $icon={!!icon} $fullWidth={fullWidth}>
      {icon && <ButtonIcon as={icon} />}
      {children}
    </ButtonWrapper>
  );
};

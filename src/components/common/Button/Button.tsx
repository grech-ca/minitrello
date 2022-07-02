import { ComponentProps, FC, ReactNode } from 'react';

import { ButtonWrapper } from './styles';

export interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode | ReactNode[];
}

export const Button: FC<ButtonProps> = ({ ...props }) => {
  return <ButtonWrapper {...props} />;
};

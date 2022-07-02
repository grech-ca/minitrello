import { ComponentProps, FC } from 'react';

import { CloseButtonWrapper, CloseIcon } from './styles';

export type CloseButtonProps = Omit<ComponentProps<'button'>, 'children'>;

export const CloseButton: FC<CloseButtonProps> = props => {
  return (
    <CloseButtonWrapper type="button" {...props}>
      <CloseIcon />
    </CloseButtonWrapper>
  );
};

import styled from '@emotion/styled';

import { Button, Editable } from 'components/common';

export const InputWrapper = styled.div({});

export const TitleInput = styled(Editable)(({ theme }) => ({
  border: '2px solid',
  borderColor: theme.colors.gray,
  transition: 'border .15s ease',
  padding: '8px 12px',
  width: '100%',

  ':focus, :focus-visible': {
    boxShadow: 'none',
    borderColor: theme.colors.primary,
  },
}));

export const Field = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const AddButton = styled(Button)({
  width: 74,
});

import styled from '@emotion/styled';

import { Editable } from 'components/common';

export const DescriptionWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const DescriptionActions = styled.div({
  display: 'flex',
  gap: 4,
});

interface DescriptionTextareaProps {
  $isFocused: boolean;
}

export const DescriptionTextarea = styled(Editable)<DescriptionTextareaProps>(({ theme, $isFocused }) => ({
  borderRadius: theme.rounding.sm,
  padding: '8px 12px',
  cursor: 'pointer',
  fontSize: 14,
  width: '100%',

  ...($isFocused
    ? {
        background: theme.colors.white,

        '::placeholder': {
          color: theme.colors.darkGray,
        },
      }
    : {
        background: theme.colors.glass.regular,

        '::placeholder': {
          color: theme.colors.black,
        },

        ':hover': {
          background: theme.colors.glass.dimmed,
        },
      }),
}));

export const MarkdownWrapper = styled.div({
  cursor: 'pointer',
  fontSize: 14,

  '& h1': {
    margin: 0,
  },
});

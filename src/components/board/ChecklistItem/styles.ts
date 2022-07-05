import styled from '@emotion/styled';

import { Editable } from 'components/common';

export const ChecklistItemWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  borderRadius: theme.rounding.sm,
  gap: 6,
  padding: 6,

  ':hover': {
    background: theme.colors.glass.dimmed,
  },
}));

export const Checkbox = styled.svg(({ theme }) => ({
  opacity: 1,
  transition: 'opacity .2s ease',
  cursor: 'pointer',
  color: theme.colors.primary,
  fontSize: 20,

  ':hover': {
    opacity: 0.7,
  },
}));

export const CheckboxWrapper = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 0 0 6px',
});

interface ItemTitleProps {
  $completed: boolean;
}

export const ItemTitle = styled(Editable)<ItemTitleProps>(({ $completed }) => ({
  transition: 'opacity .15s ease',

  ...($completed
    ? {
        ':not(:focus)': {
          textDecoration: $completed ? 'line-through' : undefined,
          opacity: 0.6,
        },
      }
    : {}),
}));

import styled from '@emotion/styled';

import { Button } from 'components/common';

export const CreateItemWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const TextareaWrapper = styled.div({
  display: 'flex',
});

export const Actions = styled.div({
  display: 'flex',
  gap: 4,
});

export const AddButton = styled(Button)({
  alignSelf: 'flex-start',
  marginLeft: 40,
});

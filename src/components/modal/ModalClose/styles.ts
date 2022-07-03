import styled from '@emotion/styled';

import { CloseButton } from 'components/common';

export const ModalCloseWrapper = styled(CloseButton)({
  border: 'none',
  background: 'none',
  borderRadius: '100%',
  padding: 2,

  ':hover': {
    background: '#ccc5',
  },
});

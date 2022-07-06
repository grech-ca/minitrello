import styled from '@emotion/styled';

export const ModalHeader = styled.div({
  padding: 10,
  display: 'flex',
});

export const ModalBody = styled.div(({ theme: { media } }) => ({
  display: 'flex',
  gap: 16,
  padding: 10,

  [media.sm]: {
    flexDirection: 'column',
  },
}));

export const ModalContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden',
  padding: 5,
  gap: 8,
});

export const ModalSidebar = styled.div(({ theme: { media } }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 192,
  gap: 8,

  [media.sm]: {
    width: '100%',
  },
}));

export const ModalSidebarHeading = styled.h3(({ theme }) => ({
  fontWeight: 700,
  fontSize: 12,
  color: theme.colors.darkGray,
  margin: 0,
}));

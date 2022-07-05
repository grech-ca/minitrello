import styled from '@emotion/styled';

export const ModalHeader = styled.div({
  padding: 10,
  display: 'flex',
});

export const ModalBody = styled.div({
  display: 'flex',
  gap: 16,
  padding: 10,
});

export const ModalContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const ModalSidebar = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: 192,
  gap: 8,
});

export const ModalSidebarHeading = styled.h3(({ theme }) => ({
  fontWeight: 700,
  fontSize: 12,
  color: theme.colors.darkGray,
  margin: 0,
}));

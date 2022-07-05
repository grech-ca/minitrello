import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'safe center',
  background: '#0009',
  minHeight: '100%',
  height: 'auto',
  width: '100%',
  zIndex: 100,
  overflowY: 'auto',
  padding: '5%',
});

export const ModalWrapper = styled.div(({ theme: { media, colors, rounding } }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: colors.lightGray,
  borderRadius: rounding.sm,
  margin: 'auto',
  width: 768,
  maxWidth: 768,
  minHeight: 300,

  [media.xs]: {
    width: '95%',
  },
}));

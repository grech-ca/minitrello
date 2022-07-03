import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)({
  position: 'fixed',
  left: 0,
  top: 0,
  height: '100%',
  width: '100%',
  background: '#0009',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
});

export const ModalWrapper = styled(motion.div)(({ theme }) => ({
  borderRadius: theme.rounding.sm,
  background: theme.colors.lightGray,
  padding: 8,
  minWidth: 768,
  position: 'relative',
  minHeight: 300,
}));

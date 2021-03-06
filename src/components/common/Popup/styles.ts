import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface PopupWrapperProps {
  $anchor: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

export const PopupWrapper = styled(motion.div)<PopupWrapperProps>(({ theme, $anchor: { x, y } }) => ({
  position: 'fixed',
  top: y,
  left: x,
  width: 300,
  borderRadius: theme.rounding.sm,
  padding: 10,
  gap: 10,
  border: '1px solid',
  background: theme.colors.white,
  borderColor: theme.colors.gray,
  zIndex: 200,
  display: 'flex',
  flexDirection: 'column',

  [theme.media.sm]: {
    margin: '0 auto',
    left: 10,
    right: 10,
    bottom: 10,
    top: 'unset',
  },
}));

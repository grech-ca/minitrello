import styled from '@emotion/styled';
import Color from 'color';

import { Button, Editable } from 'components/common';

interface LabelProps {
  $color: string | null;
}

export const LabelContainer = styled.div({
  display: 'flex',
  gap: 4,
});

export const Label = styled.div<LabelProps>(({ theme, $color }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minHeight: 32,
  height: 32,
  minWidth: 70,
  padding: '4px 8px',
  background: $color ?? theme.colors.gray,
  borderRadius: theme.rounding.sm,
  transition: 'box-shadow .15s ease, padding .15s ease',
  cursor: 'pointer',
  color: theme.colors.white,
  fontWeight: 700,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  ':hover': {
    paddingLeft: 20,
    boxShadow: `inset 10px 0 0 0 ${Color($color ?? theme.colors.gray)
      .darken(0.2)
      .toString()}`,
  },
}));

export const LabelList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const LabelEditButton = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 32,
  padding: 0,
  color: theme.colors.darkGray,
}));

export const Palette = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
});

interface PaletteItemProps {
  $color: string;
}

export const PaletteItem = styled.button<PaletteItemProps>(({ theme, $color }) => ({
  display: 'inline-flex',
  border: 'none',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 48,
  borderRadius: theme.rounding.sm,
  background: $color,
  color: theme.colors.white,
  transition: 'background .15s ease',

  ':hover': {
    background: Color($color).lighten(0.1).toString(),
  },
}));

export const NoColorMessage = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  flex: 1,

  '& p': {
    fontSize: 14,
    margin: 0,
  },
});

export const LabelNameInput = styled(Editable)(({ theme }) => ({
  padding: '8px 12px',
  width: '100%',
  borderColor: theme.colors.glass.dimmed,
  wordWrap: 'initial',
  wordBreak: 'initial',

  ':hover': {
    background: theme.colors.glass.regular,
  },
}));

export const LabelEditor = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

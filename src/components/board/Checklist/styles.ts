import styled from '@emotion/styled';

export const ChecklistWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const ChecklistHeader = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 6,
});

export const ChecklistBody = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const ChecklistItems = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 2,
});

export const Progress = styled.div({
  display: 'flex',
  gap: 6,
  alignItems: 'center',
});

export const ProgressValue = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  color: theme.colors.darkGray,
  width: 30,
}));

interface ProgressBarProps {
  $value: number;
  $max: number;
}

export const ProgressBar = styled.div<ProgressBarProps>(({ theme, $value, $max }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.primary,
  height: 8,
  flex: 1,
  borderRadius: theme.rounding.lg,
  background: theme.colors.glass.dimmed,

  ':after': {
    content: "''",
    display: 'inline-block',
    height: '100%',
    width: `${($value / $max) * 100}%`,
    borderRadius: theme.rounding.lg,
    background: theme.colors.primary,
    transition: 'width .2s ease',
  },
}));

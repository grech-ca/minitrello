import styled from '@emotion/styled'
import Color from 'color'

import { Editable } from 'components/common'

import { LabelColor } from 'store/slices'

export const CardTitle = styled(Editable)({
  fontSize: 20,
  fontWeight: 700,
})

export const LabelsList = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
})

interface LabelProps {
  $color: string | null
}

export const Label = styled.button<LabelProps>(({ theme, $color }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  border: 'none',
  background: $color ?? LabelColor.Hidden,
  height: 32,
  minWidth: 40,
  borderRadius: theme.rounding.sm,
  cursor: 'pointer',
  color: theme.colors.white,
  padding: '0 12px',

  ':hover': {
    background: Color($color ?? LabelColor.Hidden)
      .lighten(0.2)
      .toString(),
  },
}))

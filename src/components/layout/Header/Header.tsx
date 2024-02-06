import { FC } from 'react'

import { AppDrawer } from 'components/board/AppDrawer'

import { StyledHeader, Logo, LogoIcon } from './styles'

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Logo>
        <LogoIcon />
        Minitrello
      </Logo>
      <div className="flex-1" />
      <AppDrawer />
    </StyledHeader>
  )
}

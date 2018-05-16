import React from 'react'
import styled from 'styled-components'
import UserMenu from './UserMenu'
import { blue, white } from '../colors'
import BaseLink from '../StyledComponents/BaseLink'

type Props = {
  children: React.ComponentType<{}>
}

const NavBar = ({ children }: Props) => (
  <Nav>
    <HomeLink to="/">Average</HomeLink>
    <ItemAlignRight>{children}</ItemAlignRight>
    <ItemAlignRight>
      <UserMenu />
    </ItemAlignRight>
  </Nav>
)

export default NavBar

const HomeLink = styled(BaseLink)`
  font-weight: bolder;
  font-size: 1.2rem;
  color: ${blue};
`

const Nav = styled.nav`
  box-sizing: border-box;
  background-color: ${white};
  padding: 15px;
  box-shadow: 0 2px 1px #ddd;
  width: 100%;
  height: 60px;
  display: inline-grid;
  grid-template-columns: 100px auto min-content;
  align-items: center;
`

const ItemAlignRight = styled.div`
  text-align: right;
`

import React from 'react'
import styled from 'styled-components'
import UserMenu from './UserMenu'
import { grey, blue, white } from '../colors'
import BaseLink from '../StyledComponents/BaseLink'
import { AuthContext } from '../AuthComponent'

type Props = {
  children: React.ComponentType<{}>
}

const NavBar = ({ children, authenticated }: Props) => {
  return (
    <Nav>
      <HomeLink to="/">Average</HomeLink>
      <ItemAlignRight>{children}</ItemAlignRight>
      <ItemAlignRight>
        <UserMenu authenticated={authenticated} />
      </ItemAlignRight>
    </Nav>
  )
}

export default ({ children }) => (
  <AuthContext.Consumer>
    {({ authenticated }) => (
      <NavBar authenticated={authenticated}>{children}</NavBar>
    )}
  </AuthContext.Consumer>
)

const HomeLink = styled(BaseLink)`
  font-weight: bolder;
  font-size: 1.3rem;
  text-align: center;
  color: ${blue};

  &:hover {
    color: ${grey}
    border-radius: 2px;
  }
`

const Nav = styled.nav`
  box-sizing: border-box;
  background-color: ${white};
  padding: 15px;
  box-shadow: 0 2px 1px #ddd;
  width: 100%;
  height: 60px;
  display: inline-grid;
  grid-template-columns: 100px auto 50px;
  align-items: center;
`

const ItemAlignRight = styled.div`
  text-align: right;
`

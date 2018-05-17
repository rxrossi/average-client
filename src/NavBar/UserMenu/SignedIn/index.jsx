// @flow
import React from 'react'
import styled from 'styled-components'
import { white, softBlue } from '../../../colors'
import Wrapper from '../../../UtilityComponents/HandleClickOutside'
import DropDownBase from '../../../StyledComponents/DropDownOfMenu'
import BaseLink from '../../../StyledComponents/BaseLink'
import { AuthContext } from '../../../AuthComponent'

type Props = {
  removeUserAndToken: Function
}

type State = {
  open: boolean
}

class UserMenu extends React.Component<Props, State> {
  state = {
    open: false
  }

  close = () => {
    this.setState({ open: false })
  }

  toggleOpen = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    return (
      <Wrapper handleClickOutside={this.close} handleClickInside={() => {}}>
        <MainBtn onClick={this.toggleOpen}>U</MainBtn>
        {this.state.open && (
          <DropDown>
            <ul>
              <li>
                <Link to="/profile">Edit Profile</Link>
              </li>
              <li>
                <button onClick={this.props.removeUserAndToken}>
                  Sign out
                </button>
              </li>
            </ul>
          </DropDown>
        )}
      </Wrapper>
    )
  }
}

export default () => (
  <AuthContext.Consumer>
    {({ removeUserAndToken }) => (
      <UserMenu removeUserAndToken={removeUserAndToken} />
    )}
  </AuthContext.Consumer>
)

const DropDown = styled(DropDownBase)`
  & > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & > ul > li {
    margin: 10px 0;
  }
`

const MainBtn = styled.button`
  border-radius: 50%;
  border: 0;
  width: 32px;
  height: 32px;
  box-shadow: 0 0 2px #999;
  &:focus {
    outline: 0;
    box-shadow: 0 0 4px #777;
  }
`

const Link = styled(BaseLink)`
  color: ${white};
  &:hover {
    color: ${softBlue};
  }
`
